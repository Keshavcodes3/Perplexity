import React, { useState } from 'react';
import { Paperclip, Mic, SendHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useChat } from '../Hooks/useChat';
const ChatInput = () => {
  const [query, setQuery] = useState('');
  const { activeConversationId } = useSelector((state) => state.chat)
  const { takeFollowUpHook } = useChat()
  const sendMessage = async () => {
    const data = await takeFollowUpHook({
      conversationId: activeConversationId,
      message:query
    })
    console.log(data)
   }
  return (
    <div className="max-w-3xl mx-auto w-full px-4 pb-6">
      <div className="relative flex items-end gap-2 bg-white rounded-2xl border border-slate-200 shadow-sm focus-within:border-orange-300 focus-within:ring-4 focus-within:ring-orange-100 transition-all p-2">
        
        {/* Attach Button */}
        <button className="p-2 text-slate-400 hover:text-orange-500 hover:bg-orange-50 rounded-xl transition-colors shrink-0">
          <Paperclip className="w-5 h-5" />
        </button>

        {/* Textarea */}
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask NexaAI anything..."
          className="w-full max-h-32 min-h-[44px] bg-transparent resize-none outline-none py-2.5 text-slate-900 placeholder:text-slate-400 text-[15px]"
          rows={1}
        />

        {/* Mic & Send Buttons */}
        <div className="flex items-center gap-1 shrink-0">
          <button className="p-2 text-slate-400 hover:text-orange-500 hover:bg-orange-50 rounded-xl transition-colors">
            <Mic className="w-5 h-5" />
          </button>
          <button 
            onClick={()=>sendMessage()}
            className={`p-2 rounded-xl transition-all ${
              query.trim() 
                ? 'bg-orange-500 text-white hover:bg-orange-600 shadow-sm' 
                : 'bg-slate-100 text-slate-400'
            }`}
          >
            <SendHorizontal className="w-5 h-5" />
          </button>
        </div>

      </div>
      <p className="text-center text-xs text-slate-400 mt-3">
        NexaAI can make mistakes. Consider verifying important information.
      </p>
    </div>
  );
};

export default ChatInput;
