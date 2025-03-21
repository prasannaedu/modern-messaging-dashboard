// backend/routes/messages.js
const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { content, receiver } = req.body;
        const message = new Message({
            content,
            sender: decoded.userId,
            receiver,
            timestamp: new Date(),
        });
        await message.save();
        res.status(201).json(message);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/:userId', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.userId !== req.params.userId) {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        const messages = await Message.find({
            $or: [{ sender: req.params.userId }, { receiver: req.params.userId }],
        });
        res.json(messages);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;