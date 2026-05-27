import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import ChatInput from "./ChatInput.jsx";
import NoChat from "./NoChat.jsx";
import Chat from "./Chat.jsx";
import { Sparkles } from "lucide-react";

const ChatWindow = () => {
  const bottomRef = useRef(null);

  const {
    activeConversationId,
    loading,
  } = useSelector((state) => state.chat);

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
          <NoChat />
        ) : (
          <>
            <Chat />



            <div ref={bottomRef} />
          </>
        )}
      </div>

      {/* Input */}
      <div className="sticky bottom-0 bg-gradient-to-t from-white via-white to-transparent pt-4">
        <ChatInput />
      </div>
    </div>
  );
};

export default ChatWindow;