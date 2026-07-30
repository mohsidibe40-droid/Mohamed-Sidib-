import React, { useState } from 'react';
import {
  X,
  Send,
  Bot,
  User,
  Sparkles,
  MessageSquare,
  RotateCcw
} from 'lucide-react';
import { AGENTS_LIST } from '../data/agents';
import { AgentId, ChatMessage, Project } from '../types';

interface AgentChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
  onSendMessage: (message: string, agentId: AgentId) => void;
  isSending: boolean;
  isDarkMode: boolean;
  activeAgentId?: AgentId;
}

export const AgentChatDrawer: React.FC<AgentChatDrawerProps> = ({
  isOpen,
  onClose,
  project,
  onSendMessage,
  isSending,
  isDarkMode,
  activeAgentId = 'director',
}) => {
  const [selectedAgentId, setSelectedAgentId] = useState<AgentId>(activeAgentId);
  const [inputMessage, setInputMessage] = useState('');

  if (!isOpen) return null;

  const currentAgent = AGENTS_LIST.find((a) => a.id === selectedAgentId) || AGENTS_LIST[0];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isSending) return;
    onSendMessage(inputMessage, selectedAgentId);
    setInputMessage('');
  };

  const chatHistory = project?.chatHistory || [];

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[450px] bg-[#0D0D0F] border-l border-white/5 text-[#E4E4E7] shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="p-4 border-b border-white/5 flex items-center justify-between bg-[#111113]">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-medium text-sm text-white flex items-center gap-1.5">
              <span>Discussion avec les Agents</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-widest font-mono">
                LIVE
              </span>
            </h3>
            <p className="text-xs text-zinc-500">
              {project ? project.title : 'Discussion libre'}
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Agent Selector Ribbon */}
      <div className="p-2.5 border-b border-white/5 bg-[#0A0A0B] flex items-center gap-1.5 overflow-x-auto scrollbar-none">
        {AGENTS_LIST.map((agent) => {
          const isSelected = selectedAgentId === agent.id;
          return (
            <button
              key={agent.id}
              onClick={() => setSelectedAgentId(agent.id)}
              className={`flex-shrink-0 px-2.5 py-1 rounded-md text-xs font-medium border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-indigo-500/10 border-indigo-500/40 text-indigo-300'
                  : 'bg-[#111113] border-white/5 text-zinc-400 hover:text-white'
              }`}
            >
              {agent.name.replace(' AI', '')}
            </button>
          );
        })}
      </div>

      {/* Selected Agent Banner */}
      <div className="px-4 py-2 bg-indigo-500/5 border-b border-white/5 flex items-center gap-2 text-xs text-indigo-300">
        <Sparkles className="w-4 h-4 text-indigo-400 flex-shrink-0" />
        <span>Vous discutez avec <strong>{currentAgent.name}</strong> ({currentAgent.role})</span>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {chatHistory.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 text-zinc-500 space-y-3">
            <MessageSquare className="w-10 h-10 text-indigo-500/30" />
            <p className="text-xs text-zinc-400">
              Posez une question ou donnez une instruction à <strong className="text-white">{currentAgent.name}</strong>.
            </p>
            <div className="flex flex-col gap-1.5 w-full max-w-xs text-[11px]">
              <button
                onClick={() => setInputMessage(`Peux-tu optimiser la sécurité et l'authentification JWT du projet ?`)}
                className="p-2.5 rounded-lg bg-[#111113] border border-white/5 text-zinc-300 hover:border-indigo-500/40 text-left transition-colors cursor-pointer"
              >
                "Peux-tu optimiser la sécurité et l'auth ?"
              </button>
              <button
                onClick={() => setInputMessage(`Quels sont les endpoints API REST créés par Architect AI ?`)}
                className="p-2.5 rounded-lg bg-[#111113] border border-white/5 text-zinc-300 hover:border-indigo-500/40 text-left transition-colors cursor-pointer"
              >
                "Quels sont les endpoints API REST ?"
              </button>
            </div>
          </div>
        ) : (
          chatHistory.map((msg) => {
            const isUser = msg.sender === 'user';
            const msgAgent = AGENTS_LIST.find((a) => a.id === msg.sender);

            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0 ${
                  isUser
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white/5 text-indigo-300 border border-white/10'
                }`}>
                  {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                </div>

                <div className={`max-w-[80%] p-3 rounded-xl text-xs space-y-1 ${
                  isUser
                    ? 'bg-indigo-600 text-white rounded-tr-none'
                    : 'bg-[#111113] border border-white/5 text-zinc-300 rounded-tl-none'
                }`}>
                  <div className="flex items-center justify-between gap-2 text-[10px] text-zinc-500 border-b border-white/5 pb-1 mb-1 font-mono">
                    <span className="font-semibold text-zinc-400">{isUser ? 'Vous' : msgAgent?.name || 'Studio Agent'}</span>
                    <span>{msg.timestamp}</span>
                  </div>

                  <p className="whitespace-pre-wrap leading-relaxed">{msg.message}</p>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSend} className="p-4 border-t border-white/5 bg-[#111113] space-y-2">
        <div className="relative">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            disabled={isSending}
            placeholder={`Message pour ${currentAgent.name.replace(' AI', '')}...`}
            className="w-full pl-4 pr-10 py-2.5 rounded-lg bg-[#0A0A0B] border border-white/10 text-xs text-white placeholder-zinc-600 focus:outline-hidden focus:border-indigo-500"
          />
          <button
            type="submit"
            disabled={!inputMessage.trim() || isSending}
            className="absolute right-1.5 top-1.5 p-1.5 rounded-md bg-indigo-600 text-white hover:bg-indigo-500 disabled:opacity-50 transition-colors cursor-pointer"
          >
            {isSending ? <Sparkles className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
          </button>
        </div>
      </form>
    </div>
  );
};
