// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');
const authRoutes = require('./routes/auth');
const messageRoutes = require('./routes/messages');
const handleAIChat = require('./ai');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
        credentials: true,
    },
});

// Middleware
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(express.json());

// MongoDB Connection
console.log('Connecting to MongoDB with URI:', process.env.MONGO_URI);
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

// Socket.io Setup
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Join a room based on user ID
    socket.on('join', (userId) => {
        if (!userId) {
            console.error('Join event received with invalid userId:', userId);
            return;
        }
        socket.userId = userId;
        socket.join(userId);
        console.log(`User ${userId} joined room`);
        io.emit('userStatus', { userId, status: 'online' });
    });

    // Handle typing indicator
    socket.on('typing', ({ to }) => {
        if (!socket.userId) {
            console.error('Typing event received but socket.userId is undefined');
            return;
        }
        socket.to(to).emit('typing', { from: socket.userId });
    });

    // Handle message
    socket.on('message', (msg) => {
        console.log('Received message:', msg);
        if (!msg.content || !msg.receiver) {
            console.error('Invalid message format:', msg);
            return;
        }
        if (!socket.userId) {
            console.error('socket.userId is undefined, cannot save message');
            return;
        }

        const message = {
            content: msg.content,
            sender: socket.userId,
            receiver: msg.receiver,
            timestamp: new Date(),
            read: false,
        };

        const Message = mongoose.model('Message');
        new Message(message).save()
            .then((savedMessage) => {
                console.log('Message saved:', savedMessage);
                socket.to(msg.receiver).emit('message', savedMessage);
                socket.emit('message', savedMessage);
            })
            .catch((err) => console.error('Error saving message:', err));

        // If the receiver is the AI, trigger AI response
        if (msg.receiver === 'AI') {
            console.log('Triggering AI chat for message:', msg.content);
            handleAIChat(socket, msg);
        }
    });

    // Handle read receipt
    socket.on('read', ({ messageId, userId }) => {
        if (!socket.userId) {
            console.error('Read event received but socket.userId is undefined');
            return;
        }
        const Message = mongoose.model('Message');
        Message.findByIdAndUpdate(messageId, { read: true }, { new: true })
            .then((updatedMessage) => {
                console.log('Message marked as read:', updatedMessage);
                socket.to(userId).emit('readReceipt', { messageId });
            })
            .catch((err) => console.error('Error updating read receipt:', err));
    });

    // Handle disconnect
    socket.on('disconnect', () => {
        if (socket.userId) {
            io.emit('userStatus', { userId: socket.userId, status: 'offline' });
        }
        console.log('User disconnected:', socket.id);
    });
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});