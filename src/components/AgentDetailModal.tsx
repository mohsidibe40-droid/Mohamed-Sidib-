import React, { useState } from 'react';
import {
  X,
  Play,
  CheckCircle2,
  Sparkles,
  Bot,
  Brain,
  MessageSquare
} from 'lucide-react';
import { AgentInfo, Project } from '../types';

interface AgentDetailModalProps {
  agent: AgentInfo | null;
  onClose: () => void;
  onTriggerAction: (agentId: string, customPrompt: string) => void;
  onOpenChatWithAgent: (agentId: string) => void;
  currentProject: Project | null;
  isDarkMode: boolean;
}

export const AgentDetailModal: React.FC<AgentDetailModalProps> = ({
  agent,
  onClose,
  onTriggerAction,
  onOpenChatWithAgent,
  currentProject,
  isDarkMode,
}) => {
  if (!agent) return null;

  const [customPrompt, setCustomPrompt] = useState('');

  const handleActionClick = () => {
    const promptToSend = customPrompt.trim() || `Effectue une révision complète et propose des améliorations pour le projet "${currentProject?.title || 'actuel'}".`;
    onTriggerAction(agent.id, promptToSend);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className={`w-full max-w-2xl rounded-2xl border shadow-2xl overflow-hidden transition-all duration-200 ${
        isDarkMode ? 'bg-[#0D0D0F] border-white/5 text-[#E4E4E7]' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        {/* Header */}
        <div className="p-6 border-b border-white/5 flex items-start justify-between bg-[#111113]">
          <div className="flex items-center gap-4">
            <div
              className={`w-11 h-11 rounded-xl flex items-center justify-center border font-bold text-lg bg-white/5 border-white/10`}
            >
              <Bot className="w-5 h-5" style={{ color: agent.color }} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-light text-white">{agent.name}</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 uppercase tracking-wider">
                  {agent.badge}
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-medium mt-0.5">{agent.role}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
          <div>
            <h4 className="text-[10px] uppercase font-bold tracking-[0.2em] text-zinc-500 mb-1">Mission de l'Agent</h4>
            <p className="text-sm leading-relaxed text-zinc-300">{agent.description}</p>
          </div>

          <div>
            <h4 className="text-[10px] uppercase font-bold tracking-[0.2em] text-zinc-500 mb-2">Responsabilités Principales</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {agent.responsibilities.map((resp, i) => (
                <div key={i} className={`p-2.5 rounded-xl border text-xs flex items-start gap-2 ${
                  isDarkMode ? 'bg-black/40 border-white/5 text-zinc-300' : 'bg-slate-50 border-slate-200'
                }`}>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{resp}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[10px] uppercase font-bold tracking-[0.2em] text-zinc-500 mb-2">Capacité & Compétences</h4>
            <div className="flex flex-wrap gap-1.5">
              {agent.capabilities.map((cap, i) => (
                <span
                  key={i}
                  className="text-xs font-medium px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
                >
                  {cap}
                </span>
              ))}
            </div>
          </div>

          {/* Prompt action trigger */}
          {currentProject && (
            <div className={`p-4 rounded-xl border space-y-3 ${
              isDarkMode ? 'bg-black/50 border-white/5' : 'bg-slate-100 border-slate-200'
            }`}>
              <div className="flex items-center justify-between">
                <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-zinc-500 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  Donner une instruction directe à {agent.name}
                </label>
              </div>

              <input
                type="text"
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder={`Ex: "Architect AI: optimise le flux de requêtes API" ou "Designer AI: passe le thème au vert émeraude"`}
                className={`w-full text-xs px-3.5 py-2.5 rounded-lg border focus:outline-hidden focus:border-indigo-500 ${
                  isDarkMode ? 'bg-[#0A0A0B] border-white/10 text-white placeholder-zinc-600' : 'bg-white border-slate-300 text-black'
                }`}
              />

              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  onClick={() => {
                    onOpenChatWithAgent(agent.id);
                    onClose();
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-800 text-zinc-200 hover:bg-zinc-700 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  Ouvrir le Chat
                </button>
                <button
                  onClick={handleActionClick}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-medium bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  Lancer l'Agent
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
