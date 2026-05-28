import React, { useEffect } from "react";
import { Sparkles } from "lucide-react";
import ChatBubble from "./MessageBubble";
import { useSelector } from "react-redux";
import { useChat } from "../Hooks/useChat";

export default function Chat() {
  const { activeConversationId, messages, loading } = useSelector(
    (state) => state.chat
  );

  const { getAllChats } = useChat();

  // Only fetch from backend if we don't already have messages (e.g. loading from history)
  useEffect(() => {
    if (activeConversationId && messages[activeConversationId] === undefined) {
      getAllChats({ conversationId: activeConversationId });
    }
  }, [activeConversationId]);

  // Only show messages for the active conversation
  const currentMessages = (messages && messages[activeConversationId]) || [];

  return (
    <div className="flex h-screen flex-col bg-white text-slate-900 font-sans">
      {/* Header - Minimal and distraction free */}
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md">
        <div className="flex w-full items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 shadow-sm">
              <Sparkles className="h-4 w-4 text-white" />
            </div>

            <h1 className="text-base font-semibold tracking-tight text-slate-900 leading-none">
              NexaAI
            </h1>
          </div>
        </div>
      </header>

      {/* Messages Feed - hidden scrollbar */}
      <main className="flex w-full flex-1 justify-center overflow-y-auto scrollbar-hide px-4 py-6">
        <div className="flex w-full max-w-4xl flex-col gap-6 pb-20">
          {currentMessages.map((msg, index) => (
            <ChatBubble
              key={index}
              role={msg.role}
              message={msg.message}
            />
          ))}

          {loading && (
            <div className="flex w-full justify-start">
              <div className="flex max-w-3xl items-start gap-3">
                <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 shadow-sm">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <div className="rounded-2xl rounded-tl-sm border border-slate-100 bg-slate-50 px-5 py-4 text-sm shadow-sm transition-all flex items-center gap-1.5 h-[44px]">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: '0ms' }} />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: '150ms' }} />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      {/* Add custom global CSS for scrollbar hiding if needed */}
      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}} />
    </div>
  );
}