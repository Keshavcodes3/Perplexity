import React, { useEffect } from 'react';
import Sidebar from '../Components/Sidebar.jsx';
import ChatWindow from '../Components/ChatWindow.jsx';
import { useChat } from '../Hooks/useChat.jsx';
const ChatPage = () => {
  const {fetchChatHistory}=useChat()
  useEffect(()=>{
    fetchChatHistory()
  },[])
  return (
    <div className="flex h-screen w-full bg-slate-50 font-sans text-slate-900 overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header would go here */}
        <ChatWindow />
      </main>
    </div>
  );
};

export default ChatPage;
