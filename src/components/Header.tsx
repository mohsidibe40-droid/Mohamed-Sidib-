import React from 'react';
import {
  Sparkles,
  Plus,
  Moon,
  Sun,
  Download,
  FileCode,
  Layers,
  Bot,
  Brain,
  CheckCircle2,
  FolderKanban
} from 'lucide-react';
import { Project } from '../types';

interface HeaderProps {
  currentProject: Project | null;
  onNewProjectClick: () => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onOpenChat: () => void;
  onExportJson: () => void;
  onExportMarkdown: () => void;
  projectsList: Project[];
  onSelectProject: (proj: Project) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentProject,
  onNewProjectClick,
  isDarkMode,
  onToggleTheme,
  onOpenChat,
  onExportJson,
  onExportMarkdown,
  projectsList,
  onSelectProject,
}) => {
  return (
    <header className={`sticky top-0 z-40 border-b backdrop-blur-md transition-colors duration-200 ${
      isDarkMode
        ? 'bg-[#0D0D0F]/90 border-white/5 text-[#E4E4E7]'
        : 'bg-white/90 border-slate-200 text-slate-900 shadow-xs'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand & Studio Logo */}
        <div className="flex items-center gap-3">
          <div className="relative group cursor-pointer" onClick={onNewProjectClick}>
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
              S
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold tracking-tight text-lg text-white">
                SIDIBÉ STUDIO <span className="text-indigo-400 font-bold">AI</span>
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 hidden sm:block">
              Studio de création intelligent • 9 Agents Spécialisés
            </p>
          </div>
        </div>

        {/* Project Switcher & Status */}
        {currentProject ? (
          <div className="hidden lg:flex items-center gap-3 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs">
            <FolderKanban className="w-4 h-4 text-indigo-400" />
            <span className="text-zinc-400">Projet actif :</span>
            <select
              value={currentProject.id}
              onChange={(e) => {
                const found = projectsList.find((p) => p.id === e.target.value);
                if (found) onSelectProject(found);
              }}
              className={`bg-transparent font-medium focus:outline-hidden cursor-pointer ${
                isDarkMode ? 'text-zinc-200' : 'text-slate-800'
              }`}
            >
              {projectsList.map((p) => (
                <option key={p.id} value={p.id} className={isDarkMode ? 'bg-[#0D0D0F] text-white' : 'bg-white text-black'}>
                  {p.title} ({p.progress}%)
                </option>
              ))}
            </select>
            <div className="flex items-center gap-1.5 pl-2 border-l border-white/10 text-emerald-400 font-mono font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{currentProject.progress}%</span>
            </div>
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full border border-white/10">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
            <span className="text-xs font-medium text-zinc-400 uppercase tracking-widest">System Online</span>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Chat with Studio Agent button */}
          {currentProject && (
            <button
              onClick={onOpenChat}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 hover:bg-indigo-500/20 transition-all cursor-pointer"
              title="Discuter avec l'équipe d'agents AI"
            >
              <Bot className="w-4 h-4 text-indigo-400" />
              <span className="hidden sm:inline">Discuter avec les Agents</span>
            </button>
          )}

          {/* Export Actions */}
          {currentProject && (
            <div className="hidden sm:flex items-center gap-1">
              <button
                onClick={onExportMarkdown}
                className={`p-2 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                  isDarkMode
                    ? 'bg-zinc-900 border-white/5 text-zinc-300 hover:bg-zinc-800'
                    : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                }`}
                title="Exporter la documentation Markdown (README)"
              >
                <FileCode className="w-4 h-4" />
              </button>
              <button
                onClick={onExportJson}
                className={`p-2 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                  isDarkMode
                    ? 'bg-zinc-900 border-white/5 text-zinc-300 hover:bg-zinc-800'
                    : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
                }`}
                title="Exporter le projet au format JSON"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className={`p-2 rounded-lg border transition-colors cursor-pointer ${
              isDarkMode
                ? 'bg-zinc-900 border-white/5 text-amber-400 hover:bg-zinc-800'
                : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
            }`}
            title="Changer de thème"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* New Project CTA */}
          <button
            onClick={onNewProjectClick}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Nouveau Projet</span>
          </button>
        </div>
      </div>
    </header>
  );
};
