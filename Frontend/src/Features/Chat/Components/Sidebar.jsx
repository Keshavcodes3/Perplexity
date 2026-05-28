import { useEffect } from 'react';
import { Sparkles, Plus, BarChart2, LogOut, FolderGit2 } from 'lucide-react';
import ChatHistory from './ChatHistory.jsx';
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { setActiveConversationId } from '../Redux/chat.slice.js';
import { logout } from '../../Authentication/Redux/auth.slice.js';
import { useProject } from '../../Projects/Hooks/useProject.jsx';

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { getAllProjectsHook } = useProject();

  useEffect(() => {
    getAllProjectsHook();
  }, [getAllProjectsHook]);

  const { user } = useSelector((state) => state.auth);
  const userName = user?.username || user?.name || user?.email?.split('@')[0] || 'User';
  const userPlan = user?.plan || 'Free Plan';

  const resetChatId = () => {
    dispatch(setActiveConversationId(null));
    navigate('/chat');
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

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
          onClick={resetChatId}
          className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium py-2.5 px-4 rounded-xl shadow-sm hover:shadow-md transition-all group"
        >
          <Plus className="w-4 h-4 group-hover:scale-110 transition-transform" />
          New Chat
        </button>
      </div>

      {/* Main Nav */}
      <nav className="px-4 space-y-1 mb-3">
        <NavLink
          to="/chat"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              isActive || location.pathname === '/'
                ? 'bg-orange-100 text-orange-600'
                : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
            }`
          }
        >
          <Sparkles className="w-4 h-4" />
          Chat
        </NavLink>

        <NavLink
          to="/projects"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              isActive
                ? 'bg-orange-100 text-orange-600'
                : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
            }`
          }
        >
          <FolderGit2 className="w-4 h-4" />
          Workspace
        </NavLink>

        <NavLink
          to="/analytics"
          className={({ isActive }) =>
            `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              isActive
                ? 'bg-emerald-100 text-emerald-600'
                : 'text-slate-500 hover:bg-emerald-50 hover:text-emerald-600'
            }`
          }
        >
          <BarChart2 className="w-4 h-4" />
          Analytics
        </NavLink>
      </nav>

      {/* Chat History */}
      <ChatHistory />

      {/* User Profile — dynamic from auth state */}
      <div className="p-4 border-t border-slate-200 mt-auto">
        <div className="flex items-center gap-3 hover:bg-slate-100 p-2 rounded-xl cursor-pointer transition-colors group">
          <div className="w-9 h-9 rounded-full bg-orange-100 overflow-hidden shadow-sm shrink-0 flex items-center justify-center">
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=f97316&color=fff&size=36`}
              alt={userName}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-900 truncate">{userName}</p>
            <p className="text-xs text-slate-500 truncate capitalize">{userPlan}</p>
          </div>
          <button
            onClick={handleLogout}
            title="Log out"
            className="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
