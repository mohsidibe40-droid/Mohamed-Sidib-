import React from 'react';
import {
  Home,
  Grid,
  Bot,
  FolderKanban,
  BookOpen,
  Tag,
  Settings,
  Plug,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

interface SidebarProps {
  activeNav: string;
  onSelectNav: (nav: string) => void;
  isDarkMode: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeNav,
  onSelectNav,
  isDarkMode
}) => {
  const mainMenuItems = [
    { id: 'accueil', label: 'Accueil', icon: Home },
    { id: 'studios', label: 'Studios', icon: Grid },
    { id: 'agents', label: 'Agents IA', icon: Bot },
    { id: 'projets', label: 'Projets', icon: FolderKanban },
    { id: 'ressources', label: 'Ressources', icon: BookOpen },
    { id: 'tarifs', label: 'Tarifs', icon: Tag },
  ];

  const systemMenuItems = [
    { id: 'parametres', label: 'Paramètres', icon: Settings },
    { id: 'integrations', label: 'Intégrations', icon: Plug },
    { id: 'securite', label: 'Sécurité', icon: ShieldCheck },
  ];

  return (
    <aside className={`w-64 border-r flex flex-col justify-between p-4 flex-shrink-0 transition-colors duration-200 h-screen sticky top-0 ${
      isDarkMode
        ? 'bg-[#0D0D0F] border-white/5 text-zinc-300'
        : 'bg-white border-slate-200/80 text-slate-700'
    }`}>
      {/* Top Section: Logo & Menu */}
      <div className="space-y-6">
        {/* Logo */}
        <div className="flex items-center gap-3 px-2 py-1 cursor-pointer" onClick={() => onSelectNav('accueil')}>
          <div className="w-9 h-9 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 rounded-xl flex items-center justify-center font-black text-white shadow-md shadow-indigo-500/20">
            S
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold tracking-tight text-base text-slate-900 dark:text-white leading-none">
              SIDIBÉ
            </span>
            <span className="text-[10px] font-bold tracking-widest text-indigo-500 uppercase mt-0.5">
              STUDIO AI
            </span>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="space-y-1">
          {mainMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectNav(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-400 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-white/5'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-zinc-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="border-t border-slate-200/60 dark:border-white/5 my-2" />

        {/* System Navigation */}
        <nav className="space-y-1">
          {systemMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectNav(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-400 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-white/5'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-zinc-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom AI Version Card */}
      <div className={`p-3.5 rounded-2xl border text-xs flex items-center justify-between ${
        isDarkMode
          ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-300'
          : 'bg-indigo-50/70 border-indigo-100 text-indigo-900'
      }`}>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-indigo-500/20 flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-[11px]">SIDIBÉ AI</span>
            <span className="text-[10px] opacity-75 font-mono">v2.6.0 • 2026</span>
          </div>
        </div>
        <span className="text-xs font-mono opacity-50">~</span>
      </div>
    </aside>
  );
};
