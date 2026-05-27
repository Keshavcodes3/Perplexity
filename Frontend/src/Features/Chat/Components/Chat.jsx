import React, { useEffect } from "react";
import { Sparkles } from "lucide-react";
import ChatBubble from "./MessageBubble";
import { useSelector } from "react-redux";
import { useChat } from "../Hooks/useChat";

export default function Chat() {
  const { activeConversationId, messages } = useSelector(
    (state) => state.chat
  );

  const { getAllChats } = useChat();

  useEffect(() => {
    getAllChats({ conversationId: activeConversationId });
  }, []);

  return (
    <div className="flex h-screen flex-col bg-white text-slate-900 font-sans items-center">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-4xl items-center justify-between px-6 py-3">
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
          {messages &&
            Object.values(messages)
              .flat()
              .map((msg, index) => (
                <ChatBubble
                  key={index}
                  role={msg.role}
                  message={msg.message}
                />
              ))}
        </div>
      </main>
    </div>
  );
}