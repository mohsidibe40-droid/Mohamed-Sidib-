import React from 'react';
import {
  Crown,
  Cpu,
  Palette,
  Code,
  Database,
  ShieldCheck,
  TestTube,
  Kanban,
  BrainCircuit,
  Info,
  Play
} from 'lucide-react';
import { AGENTS_LIST } from '../data/agents';
import { AgentId, AgentInfo } from '../types';

interface AgentsBarProps {
  selectedAgentId: AgentId | null;
  onSelectAgent: (agentId: AgentId) => void;
  onTriggerAgent: (agentId: AgentId) => void;
  isDarkMode: boolean;
  activePhase?: string;
}

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Crown,
  Cpu,
  Palette,
  Code,
  Database,
  ShieldCheck,
  TestTube,
  Kanban,
  BrainCircuit
};

export const AgentsBar: React.FC<AgentsBarProps> = ({
  selectedAgentId,
  onSelectAgent,
  onTriggerAgent,
  isDarkMode,
  activePhase
}) => {
  return (
    <div className={`border-b transition-colors duration-200 ${
      isDarkMode ? 'bg-[#0D0D0F] border-white/5' : 'bg-slate-50 border-slate-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-zinc-500 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse inline-block" />
              ORCHESTRATION CORE • 9 SPECIALIZED AGENTS
            </span>
          </div>
          <span className="text-[10px] uppercase tracking-widest text-zinc-500 hidden md:inline">
            Cliquez pour inspecter la mémoire & exécuter un agent
          </span>
        </div>

        {/* Horizontal Agent Cards Scroll */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-zinc-800">
          {AGENTS_LIST.map((agent) => {
            const IconComponent = ICON_MAP[agent.iconName] || Crown;
            const isSelected = selectedAgentId === agent.id;

            return (
              <div
                key={agent.id}
                onClick={() => onSelectAgent(agent.id)}
                className={`flex-shrink-0 flex items-center gap-2.5 px-3 py-1.5 rounded-lg border text-xs cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? 'bg-indigo-500/10 border-indigo-500/40 text-indigo-300 shadow-md shadow-indigo-500/10'
                    : isDarkMode
                    ? 'bg-[#111113] border-white/5 hover:bg-white/5 text-zinc-300'
                    : 'bg-white border-slate-200 hover:bg-slate-100/80 text-slate-800'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-md flex items-center justify-center border text-xs font-bold ${
                    isSelected ? 'bg-indigo-500/20 border-indigo-500/30' : 'bg-white/5 border-white/10'
                  }`}
                  style={{ color: agent.color }}
                >
                  <IconComponent className="w-3.5 h-3.5" />
                </div>

                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-medium text-xs truncate max-w-[110px]">{agent.name}</span>
                  </div>
                  <span className="text-[10px] text-zinc-500 truncate max-w-[110px]">{agent.role}</span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onTriggerAgent(agent.id);
                  }}
                  className="p-1 rounded bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 border border-indigo-500/20 ml-1 transition-colors"
                  title={`Exécuter l'action de ${agent.name}`}
                >
                  <Play className="w-2.5 h-2.5 fill-indigo-400" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
