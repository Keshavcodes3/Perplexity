import React from 'react';
import { MessageSquare, MoreHorizontal } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useChat } from '../Hooks/useChat';
import { setActiveConversationId } from '../Redux/chat.slice';

const ChatHistory = () => {
  const {takeFollowUpHook}=useChat()
  const dispatch=useDispatch()
  const { conversations } = useSelector((state) => state.chat);
  const setActiveChat=async({convoId})=>{
    dispatch(setActiveConversationId(convoId))
  }
  return (
    <div className="flex-1 overflow-y-auto px-4 py-2 space-y-1 scrollbar-hide">
      {conversations?.map((item) => (
        <div
          
        key={item.convoId}>
          <button
          onClick={()=>setActiveChat({convoId:item.convoId})}
          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 text-xs font-medium transition-all duration-300 ease-out group text-left relative overflow-hidden">
            
            {/* Chat Icon - subtle rotation/scale on hover */}
            <MessageSquare className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 group-hover:scale-105 transition-all duration-300 ease-out shrink-0" />
            
            {/* History Title with smooth padding shift to clear the menu */}
            <span className="truncate pr-4 flex-1 group-hover:pr-7 transition-all duration-300 ease-out">
              {item.convo || "Untitled Chat"}
            </span>

            {/* Options Button - Fades and slides in smoothly from the right */}
            <span className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out p-1 rounded-lg hover:bg-slate-200/80 text-slate-400 hover:text-slate-600 z-10">
              <MoreHorizontal className="w-3.5 h-3.5" />
            </span>
            
          </button>
        </div>
      ))}
    </div>
  );
};

export default ChatHistory;