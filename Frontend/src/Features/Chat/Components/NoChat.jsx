import React from "react";
import { Sparkles, Image, Map, ArrowUpRight } from "lucide-react";
import { getTimeOfDay } from "../Utils/Time";

const cards = [
  {
    title: "Ask Anything",
    desc: "Chat with NexaAI in real time to solve complex problems.",
    icon: Sparkles,
    color: "text-amber-500 bg-amber-50 border-amber-100",
    hoverBg: "hover:border-amber-200 hover:bg-amber-50/30",
  },
  {
    title: "Generate Images",
    desc: "Turn your concepts and ideas into rich visuals instantly.",
    icon: Image,
    color: "text-blue-500 bg-blue-50 border-blue-100",
    hoverBg: "hover:border-blue-200 hover:bg-blue-50/30",
  },
  {
    title: "Roadmaps",
    desc: "Create structured, personalized learning paths built for your goals.",
    icon: Map,
    color: "text-emerald-500 bg-emerald-50 border-emerald-100",
    hoverBg: "hover:border-emerald-200 hover:bg-emerald-50/30",
  },
];

export default function NoChat() {
  const greeting = getTimeOfDay();

  return (
    <div className="flex h-full w-full flex-col bg-slate-50/50 selection:bg-orange-500/10">
      {/* Center content wrapper */}
      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-4xl text-center">
          
          {/* Hero Header */}
          <div className="space-y-3">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Good {greeting} dude
            </h1>
            
            <p className="mx-auto max-w-md text-base text-slate-500 sm:text-lg">
              What would you like to explore with{" "}
              <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text font-semibold text-transparent">
                NexaAI
              </span>{" "}
              today?
            </p>
          </div>

          {/* Feature Grid */}
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {cards.map((card, i) => {
              const Icon = card.icon;

              return (
                <button
                  key={i}
                  className={`group relative flex flex-col items-start rounded-2xl border border-slate-200 bg-white p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:shadow-slate-100/80 ${card.hoverBg}`}
                >
                  {/* Icon Container */}
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl border ${card.color} transition-transform duration-300 group-hover:scale-105`}>
                    <Icon size={20} strokeWidth={2.2} />
                  </div>

                  {/* Content */}
                  <div className="mt-5 flex flex-1 flex-col">
                    <h3 className="text-base font-semibold text-slate-800 transition-colors group-hover:text-slate-900">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-500">
                      {card.desc}
                    </p>
                  </div>

                  {/* Subtle Action Indicator */}
                  <div className="absolute right-4 top-4 text-slate-300 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:text-slate-400">
                    <ArrowUpRight size={16} />
                  </div>
                </button>
              );
            })}
          </div>
          
        </div>
      </div>
    </div>
  );
}