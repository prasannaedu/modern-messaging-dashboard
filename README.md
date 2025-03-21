# Modern Messaging Dashboard

A real-time messaging app built with the MERN stack, featuring AI chat simulation, modern UI with Tailwind CSS, and real-time communication with Socket.io.

## GitHub Repository
- [messaging-dashboard](https://github.com/prasannaedu/messaging-dashboard)

## Setup
1. Clone the repo:
   ```bash
   git clone https://github.com/prasanna0062/messaging-dashboard.git
   cd messaging-dashboard

2. Install dependencies:
   • Backend: cd backend && npm install
   • Frontend: cd frontend && npm install
3. Start MongoDB locally or use MongoDB Atlas.
4. Create a .env file in backend/ with:
    PORT=5000
 MONGO_URI=mongodb://localhost:27017/messaging_dashboard
 JWT_SECRET=your-secret-key

## API Endpoints
• POST /api/auth/register: Register a new user
• POST /api/auth/login: Log in a user
• GET /api/auth/users: Get all users for the contact list
• GET /api/messages/:userId: Get messages for a user

## Features
• Login/Signup with JWT authentication
• Real-time messaging with Socket.io
• AI chat simulation with 10+ conversational prompts
• Contact list with online/offline status and unread message indicators
• Message search, typing indicators, and read receipts
• Modern UI with Tailwind CSS and dark mode support


- **Apply the Changes**:
  - Open `messaging-dashboard/README.md` in Visual Studio Code and update it with the content above.
  - Commit and push the changes using Git Bash:
    ```bash
    git add README.md
    git commit -m "Update README with GitHub link and cloning instructions"
    git push origin main

  
