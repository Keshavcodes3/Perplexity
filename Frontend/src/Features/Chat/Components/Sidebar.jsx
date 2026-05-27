import React from 'react';
import { Sparkles, Plus, FolderGit2, BarChart2, LogOut } from 'lucide-react';
import ChatHistory from './ChatHistory.jsx';
import { useSelector, useDispatch } from "react-redux";import { useNavigate } from "react-router-dom";
import { setActiveConversationId } from '../Redux/chat.slice.js';
const Sidebar = () => {
  let { activeConversationId } = useSelector((state) => state.chat)
  const Navigate = useNavigate()
  const dispatch = useDispatch();
  const resetChatId = () => {
    dispatch(setActiveConversationId(null))
    Navigate('/chat')
  }
  return (
    <div className="w-[280px] h-screen bg-slate-50 border-r border-slate-200 flex flex-col hidden md:flex shrink-0">
      {/* Header */}
      <div className="p-4 flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-sm">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <span className="font-semibold text-slate-900 text-base tracking-tight">NexaAI</span>
      </div>

      {/* New Chat CTA */}
      <div className="px-4 pb-4">
        <button
        onClick={()=>resetChatId()}
          className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium py-2.5 px-4 rounded-xl shadow-sm hover:shadow transition-all group">
          <Plus className="w-4 h-4 group-hover:scale-110 transition-transform" />
          New Chat
        </button>
      </div>

      {/* Main Nav */}
      <nav className="px-4 space-y-1 mb-4">
        {/* Active Chat Item (Orange) */}
        <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-orange-100 text-orange-600 text-sm font-medium">
          <Sparkles className="w-4 h-4" />
          Chat
        </a>
        
        {/* Projects Item (Blue Hover) */}
        <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-500 hover:bg-blue-50 hover:text-blue-600 text-sm font-medium transition-colors">
          <FolderGit2 className="w-4 h-4" />
          Projects
        </a>
        
        {/* Analytics Item (Green/Emerald Hover) */}
        <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-500 hover:bg-emerald-50 hover:text-emerald-600 text-sm font-medium transition-colors">
          <BarChart2 className="w-4 h-4" />
          Analytics
        </a>
      </nav>

      {/* History */}
      <ChatHistory />

      {/* User Profile */}
      <div className="p-4 border-t border-slate-200">
        <div className="flex items-center gap-3 hover:bg-slate-100 p-2 rounded-xl cursor-pointer transition-colors group">
          <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden shadow-sm">
            <img src="https://ui-avatars.com/api/?name=Keshav+Sharma&background=f97316&color=fff" alt="Keshav" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-900 truncate">Keshav Sharma</p>
            <p className="text-xs text-slate-500 truncate">Pro Plan</p>
          </div>
          <button className="text-slate-400 hover:text-slate-900 opacity-0 group-hover:opacity-100 transition-opacity">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;