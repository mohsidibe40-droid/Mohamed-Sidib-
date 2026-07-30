import React from 'react';
import { Search, Bell, Sun, Moon, ChevronDown } from 'lucide-react';
import { Project } from '../types';

interface NavbarTopProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
  currentProject: Project | null;
  onNewProjectClick: () => void;
  onSearchClick?: () => void;
}

export const NavbarTop: React.FC<NavbarTopProps> = ({
  isDarkMode,
  onToggleTheme,
  onNewProjectClick,
}) => {
  return (
    <header className={`sticky top-0 z-30 border-b backdrop-blur-md transition-colors duration-200 px-6 py-3.5 flex items-center justify-between ${
      isDarkMode
        ? 'bg-[#0D0D0F]/90 border-white/5 text-white'
        : 'bg-white/90 border-slate-200/80 text-slate-800'
    }`}>
      {/* Left Search Bar */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <div className={`relative w-full flex items-center rounded-full border px-3.5 py-1.5 text-xs transition-all ${
          isDarkMode
            ? 'bg-[#111113] border-white/10 text-zinc-300 focus-within:border-indigo-500/50'
            : 'bg-slate-100/70 border-slate-200 text-slate-600 focus-within:border-indigo-400 focus-within:bg-white'
        }`}>
          <Search className="w-3.5 h-3.5 text-slate-400 mr-2 flex-shrink-0" />
          <input
            type="text"
            placeholder="Rechercher un studio, un agent, un projet..."
            className="w-full bg-transparent focus:outline-hidden text-xs placeholder-slate-400 dark:placeholder-zinc-500"
          />
          <kbd className={`ml-2 px-1.5 py-0.5 text-[10px] font-mono rounded border flex-shrink-0 ${
            isDarkMode ? 'bg-zinc-800 border-zinc-700 text-zinc-400' : 'bg-slate-200 border-slate-300 text-slate-500'
          }`}>
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right User Actions & Profile */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <button
          className={`relative p-2 rounded-full border transition-all cursor-pointer ${
            isDarkMode
              ? 'bg-[#111113] border-white/10 text-zinc-300 hover:bg-white/5'
              : 'bg-slate-100/80 border-slate-200 text-slate-600 hover:bg-slate-200/80'
          }`}
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-indigo-500 ring-2 ring-white dark:ring-slate-900" />
        </button>

        {/* Theme Toggle Button */}
        <button
          onClick={onToggleTheme}
          className={`p-2 rounded-full border transition-all cursor-pointer ${
            isDarkMode
              ? 'bg-[#111113] border-white/10 text-amber-400 hover:bg-white/5'
              : 'bg-slate-100/80 border-slate-200 text-slate-700 hover:bg-slate-200/80'
          }`}
          title="Changer le thème"
        >
          {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>

        {/* User Profile Dropdown Badge */}
        <div className={`flex items-center gap-3 pl-3 pr-2 py-1 rounded-full border cursor-pointer transition-all ${
          isDarkMode
            ? 'bg-[#111113] border-white/10 text-white hover:bg-white/5'
            : 'bg-slate-50 border-slate-200/90 text-slate-800 hover:bg-slate-100'
        }`}>
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120"
            alt="Mohamed Sidibé"
            className="w-7 h-7 rounded-full object-cover ring-1 ring-indigo-500/30"
          />
          <div className="flex flex-col text-left hidden sm:flex">
            <span className="text-xs font-bold leading-tight">Mohamed Sidibé</span>
            <span className="text-[10px] text-slate-400 dark:text-zinc-400 leading-tight">m.sidibe@sidibe.ai</span>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
        </div>
      </div>
    </header>
  );
};
