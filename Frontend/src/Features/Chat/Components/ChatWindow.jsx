import React, { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ChatInput from "./ChatInput.jsx";
import NoChat from "./NoChat.jsx";
import Chat from "./Chat.jsx";
import { Sparkles } from "lucide-react";
import { useChat } from "../Hooks/useChat.jsx";

const ChatWindow = () => {
  const bottomRef = useRef(null);
  const [mode, setMode] = useState('casual')
  const {
    activeConversationId,
    loading,
  } = useSelector((state) => state.chat);
  const { createEmptyChatHook } = useChat();

  const handleCardClick = async (selectedMode) => {
    setMode(selectedMode);
    await createEmptyChatHook({ mode: selectedMode });
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [activeConversationId, loading]);

  return (
    <div className="relative flex h-screen flex-1 flex-col overflow-hidden bg-white">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        {activeConversationId == null ? (
          <NoChat onModeSelect={handleCardClick} />
        ) : (
          <>
            <Chat />



            <div ref={bottomRef} />
          </>
        )}
      </div>

      {/* Input */}
      <div className="sticky bottom-0 bg-gradient-to-t from-white via-white to-transparent pt-4">
        <ChatInput mode={mode} />
      </div>
    </div>
  );
};

export default ChatWindow;