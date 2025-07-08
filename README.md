
# Modern Messaging Dashboard

A real-time messaging application built with the **MERN** stack, featuring **AI chat simulation**, **real-time communication with Socket.io**, and a **modern responsive interface** styled using **Tailwind CSS**. This project demonstrates full-stack development skills including secure authentication, WebSocket integration, and UI/UX design.

##  GitHub Repository
- [messaging-dashboard](https://github.com/prasanna0062/messaging-dashboard)

##  Project Description
The Modern Messaging Dashboard is a full-stack messaging platform that enables users to:
- Register and log in securely
- Engage in real-time messaging with contacts or an AI bot
- Enjoy a modern UI/UX experience with additional features like typing indicators, read receipts, and message search

##  Technologies and Frameworks Used

### Frontend
- React – Component-based frontend UI
- Tailwind CSS – Utility-first CSS framework for responsive design
- Socket.io-client – Enables real-time communication from the frontend

### Backend
- Node.js – JavaScript runtime for the server
- Express.js – RESTful API server
- MongoDB (via Mongoose) – NoSQL database for storing user and message data
- Socket.io – Real-time communication engine for messaging
- jsonwebtoken – JWT-based authentication
- bcryptjs – Secure password hashing
- cors – Enable cross-origin requests
- dotenv – Manage environment variables

### Tools
- Git & Git Bash – Version control
- Visual Studio Code – Code editor
- npm – Node package manager

##  Use Cases
- User Authentication: Register and log in securely with hashed passwords and JWT tokens.
- Real-Time Messaging: Chat live with contacts using WebSocket.
- Contact List: Browse a list of all registered users and initiate chats.
- AI Chat Simulation: Converse with a built-in AI that responds to predefined prompts.
- Typing Indicators & Read Receipts: See when someone is typing or has read your message.
- Search Messages: Filter messages in a conversation.

##  Installation and Setup Instructions

### Prerequisites
Make sure the following tools are installed:
- Node.js: https://nodejs.org/
- MongoDB: https://www.mongodb.com/try/download/community or https://www.mongodb.com/cloud/atlas
- Git: https://git-scm.com/downloads

###  Steps to Run Locally

1. Clone the Repository:
   ```bash
   git clone https://github.com/prasanna0062/messaging-dashboard.git
   cd messaging-dashboard
   ```

2. Install Dependencies:

   **Backend:**
   ```bash
   cd backend
   npm install
   ```

   **Frontend:**
   ```bash
   cd ../frontend
   npm install
   ```

3. Configure Environment Variables:

   Create a `.env` file inside the `backend/` folder with the following content:

   ```ini
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/messaging_dashboard
   JWT_SECRET=your-secret-key
   ```
   Replace `your-secret-key` with a secure random string.

4. Start the Application:

   **Backend:**
   ```bash
   cd backend
   npm start
   ```

   **Frontend:**
   ```bash
   cd ../frontend
   npm start
   ```

##  Usage

- Visit [http://localhost:3000/register](http://localhost:3000/register) to register (e.g., username: prasanna0062, password: 123)
- Log in at [http://localhost:3000/login](http://localhost:3000/login)
- Chat with other users or the AI Chatbot
- Use the search bar to find messages and observe typing/read indicators

##  Features Implemented
- JWT Authentication (Login/Signup)
- Real-time messaging using Socket.io
- AI chatbot simulation
- Contact list with user interaction
- Typing indicators and read receipts
- Message search functionality
- Fully responsive Tailwind CSS interface

##  Future Improvements
- Unread message indicators in the contact list
- Dark mode enhancement
- Smarter AI chatbot responses
- Online/offline user status indicators

##  Updating the README

To update this README in the repo:

```bash
cd messaging-dashboard
git add README.md
git commit -m "Update README with complete project details and setup instructions"
git push origin main
```
