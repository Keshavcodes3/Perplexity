# ✨ NexaAI

NexaAI is a full-stack AI chat application inspired by modern conversational assistants.

It lets users create conversations, continue previous chats, and interact with an AI assistant through a clean and responsive interface.

Built with React, Redux, Node.js, Express, and MongoDB.

Backend URL : https://nexaai-tahr.onrender.com
Frontend URL : nexa-ai-one-amber.vercel.app

---

## 🚀 Features

- 💬 Real-time AI conversations
- 🧠 Conversation history
- ➕ Start a new chat anytime
- 📂 Load previous conversations
- ⚡ Redux state management
- 🎨 Clean responsive UI with Tailwind CSS
- 🔒 Backend API for chat + conversations
- 🗄 MongoDB database integration

---

## 🛠 Tech Stack

### Frontend

- React.js
- Redux Toolkit
- React Router
- Tailwind CSS
- Lucide React Icons
- Axios

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

### AI

- OpenAI API / AI integration

---

## 📁 Project Structure

```bash
NexaAI/
│
├── client/
│   ├── src/
│   │   ├── Components/
│   │   ├── Hooks/
│   │   ├── Redux/
│   │   ├── Pages/
│   │   └── App.jsx
│   │
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── config/
│   └── server.js
│
└── README.md
```

---

## ⚙️ Installation

Clone the repo:

```bash
git clone <your-repo-link>
cd NexaAI
```

---

### Frontend setup

```bash
cd client
npm install
npm run dev
```

Runs on:

```bash
http://localhost:5173
```

---

### Backend setup

```bash
cd server
npm install
npm run dev
```

Runs on:

```bash
http://localhost:5000
```

---

## 🔑 Environment Variables

Create `.env` inside backend:

```env
PORT=5000
MONGO_URI=your_mongodb_url
OPENAI_API_KEY=your_api_key
```

---

## 📌 Main Functionality

### New Chat

Click **New Chat** from sidebar.

- clears active conversation
- routes to fresh chat page

---

### Chat History

Sidebar stores previous conversations.

Selecting one loads all messages.

---

### AI Messaging

Users send prompt → backend processes → AI response returned.

Messages are stored in database.

---

## 🎨 UI

Minimal modern layout:

- centered chat feed
- sticky header
- sidebar navigation
- responsive design

---

## 🔮 Future Improvements

- authentication
- markdown support
- code highlighting
- file uploads
- streaming AI responses
- themes / dark mode

---

## 👨‍💻 Author

Built by **Keshav Sharma**

---

## 📄 License

MIT License
