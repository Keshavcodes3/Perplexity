import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import SuggestionCards from './SuggestionCards.jsx';
import ChatInput from './ChatInput.jsx';
import NoChat from './NoChat.jsx';
import { useSelector } from 'react-redux';
import Chat from './Chat.jsx';


const ChatWindow = () => {
  const bottomRef = useRef(null);
  const {activeConversationId}=useSelector((state)=>state.chat)
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div className="flex-1 flex flex-col h-screen bg-white overflow-hidden relative">

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto">
        {
          activeConversationId==null?<NoChat/>:<Chat/>
        }
      </div>

      {/* Input Area */}
      <div className="sticky bottom-0 bg-gradient-to-t from-white via-white to-transparent pt-4">
        <ChatInput />
      </div>
    </div>
  );
};

export default ChatWindow;

