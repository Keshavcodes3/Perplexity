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
    if (activeConversationId && !messages[activeConversationId]?.length) {
      getAllChats({ conversationId: activeConversationId });
    }
  }, [activeConversationId]);

  // Only show messages for the active conversation
  const currentMessages = (messages && messages[activeConversationId]) || [];

  return (
    <div className="flex h-screen flex-col bg-white text-slate-900 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md">
        <div className="flex w-full items-center justify-between px-6 py-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-orange-400 to-orange-500 shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-white" />
            </div>

            <div>
              <h1 className="mb-0.5 text-sm font-semibold tracking-tight text-slate-900 leading-none">
                NexaAI
              </h1>
              <p className="text-[11px] font-medium text-slate-400">
                GPT-4o Engine
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-600">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
            Active
          </div>
        </div>
      </header>

      {/* Messages Feed */}
      <main className="flex w-full flex-1 justify-center overflow-y-auto px-4 py-6">
        <div className="flex w-full max-w-4xl flex-col gap-5">
          {currentMessages.map((msg, index) => (
            <ChatBubble
              key={index}
              role={msg.role}
              message={msg.message}
            />
          ))}

          {loading && (
            <div className="flex w-full justify-start">
              <div className="flex max-w-3xl items-start gap-2">
                <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-orange-400 to-orange-500 shadow-sm">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <div className="rounded-3xl rounded-bl-md border border-orange-100 bg-[#fffaf5] px-4 py-4 text-sm shadow-sm transition-all flex items-center gap-1.5 h-[40px]">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-orange-400" style={{ animationDelay: '0ms' }} />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-orange-400" style={{ animationDelay: '150ms' }} />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-orange-400" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}