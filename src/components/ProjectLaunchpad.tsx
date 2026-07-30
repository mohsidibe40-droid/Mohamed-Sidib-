import React, { useState } from 'react';
import {
  Sparkles,
  Rocket,
  Zap,
  ArrowRight,
  BarChart3,
  Activity,
  ShoppingBag,
  Terminal,
  Bot,
  Layers,
  Cpu,
  CheckCircle2,
  ShieldCheck,
  Code
} from 'lucide-react';
import { QUICK_TEMPLATES } from '../data/templates';
import { QuickTemplate } from '../types';

interface ProjectLaunchpadProps {
  onLaunchProject: (prompt: string, title?: string) => void;
  isOrchestrating: boolean;
  orchestrationStep: string;
  isDarkMode: boolean;
}

const TEMPLATE_ICONS: Record<string, React.FC<{ className?: string }>> = {
  BarChart3,
  Activity,
  ShoppingBag,
  Terminal
};

export const ProjectLaunchpad: React.FC<ProjectLaunchpadProps> = ({
  onLaunchProject,
  isOrchestrating,
  orchestrationStep,
  isDarkMode,
}) => {
  const [promptInput, setPromptInput] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<QuickTemplate | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptInput.trim() || isOrchestrating) return;
    onLaunchProject(promptInput, selectedTemplate?.title);
  };

  const handleSelectTemplate = (tpl: QuickTemplate) => {
    setSelectedTemplate(tpl);
    setPromptInput(tpl.prompt);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12 space-y-10">
      {/* Hero Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-400 text-xs uppercase tracking-widest font-medium">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
          <span>SIDIBÉ STUDIO AI • Studio de Production Intelligente</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-light tracking-tight text-white leading-tight">
          Transformez une simple idée en un{' '}
          <span className="font-semibold text-indigo-400">
            projet logiciel complet
          </span>
        </h1>

        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          Décrivez votre vision. Une équipe de 9 agents IA spécialisés (Architecte, Designer, Coder, Base de données, Sécurité, QA) orchestre votre application en temps réel.
        </p>
      </div>

      {/* Main Prompt Input Launchpad */}
      <div className={`p-6 sm:p-8 rounded-2xl border transition-all duration-300 relative overflow-hidden ${
        isDarkMode
          ? 'bg-[#111113] border-white/5 shadow-2xl shadow-indigo-950/20'
          : 'bg-white border-slate-200 shadow-slate-200'
      }`}>
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

        <form onSubmit={handleSubmit} className="relative z-10 space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-zinc-500 flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-indigo-400" />
              Décrivez votre projet ou votre vision d'application :
            </label>
            {selectedTemplate && (
              <span className="text-xs text-zinc-400">
                Modèle : <strong className="text-indigo-400 font-medium">{selectedTemplate.title}</strong>
              </span>
            )}
          </div>

          <div className="relative">
            <textarea
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
              disabled={isOrchestrating}
              rows={4}
              placeholder="Exemple: 'Je veux créer une plateforme SaaS de gestion de budget d'équipe avec authentification Google, tableaux de bord interactifs en temps réel, recommandations IA et export de rapports PDF...'"
              className={`w-full p-4 rounded-xl border text-sm focus:outline-hidden focus:border-indigo-500 transition-all ${
                isDarkMode
                  ? 'bg-[#0A0A0B] border-white/10 text-white placeholder-zinc-600'
                  : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
              }`}
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono">
              <Bot className="w-4 h-4 text-indigo-400" />
              <span>9 Agents mobilisés en réseau autonome</span>
            </div>

            <button
              type="submit"
              disabled={!promptInput.trim() || isOrchestrating}
              className={`w-full sm:w-auto px-6 py-3 rounded-xl font-medium text-sm text-white flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer ${
                !promptInput.trim() || isOrchestrating
                  ? 'bg-zinc-800 cursor-not-allowed opacity-50'
                  : 'bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-500/25'
              }`}
            >
              {isOrchestrating ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin" />
                  <span>{orchestrationStep || "Orchestration par les Agents AI..."}</span>
                </>
              ) : (
                <>
                  <Rocket className="w-4 h-4" />
                  <span>Lancer le Studio & Générer le Projet</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Quick Templates Selection */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-[10px] uppercase font-bold tracking-[0.2em] text-zinc-500">
            Ou commencez avec un modèle pré-configuré :
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {QUICK_TEMPLATES.map((tpl) => {
            const IconComp = TEMPLATE_ICONS[tpl.icon] || BarChart3;
            const isSelected = selectedTemplate?.id === tpl.id;

            return (
              <div
                key={tpl.id}
                onClick={() => handleSelectTemplate(tpl)}
                className={`p-5 rounded-xl border text-left cursor-pointer transition-all duration-200 flex items-start gap-4 ${
                  isSelected
                    ? 'bg-indigo-500/10 border-indigo-500/40 text-indigo-300'
                    : isDarkMode
                    ? 'bg-[#111113] border-white/5 hover:bg-white/5 text-zinc-300'
                    : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-900'
                }`}
              >
                <div className="p-3 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex-shrink-0">
                  <IconComp className="w-5 h-5" />
                </div>

                <div className="space-y-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm text-white truncate">{tpl.title}</span>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white/5 text-zinc-400">
                      {tpl.category}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 line-clamp-2">{tpl.tagline}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Agents Feature Grid Highlights */}
      <div className="pt-6 border-t border-white/5">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-xl bg-[#111113] border border-white/5 space-y-1">
            <Cpu className="w-5 h-5 text-indigo-400 mx-auto" />
            <h4 className="text-xs font-medium text-white">Architect AI</h4>
            <p className="text-[11px] text-zinc-500">Topologie & Endpoints API</p>
          </div>
          <div className="p-4 rounded-xl bg-[#111113] border border-white/5 space-y-1">
            <Code className="w-5 h-5 text-emerald-400 mx-auto" />
            <h4 className="text-xs font-medium text-white">Coder AI</h4>
            <p className="text-[11px] text-zinc-500">Code TypeScript Production</p>
          </div>
          <div className="p-4 rounded-xl bg-[#111113] border border-white/5 space-y-1">
            <ShieldCheck className="w-5 h-5 text-purple-400 mx-auto" />
            <h4 className="text-xs font-medium text-white">Security AI</h4>
            <p className="text-[11px] text-zinc-500">Audit OWASP & Auth JWT</p>
          </div>
          <div className="p-4 rounded-xl bg-[#111113] border border-white/5 space-y-1">
            <CheckCircle2 className="w-5 h-5 text-cyan-400 mx-auto" />
            <h4 className="text-xs font-medium text-white">Tester AI</h4>
            <p className="text-[11px] text-zinc-500">Suites de tests Vitest</p>
          </div>
        </div>
      </div>
    </div>
  );
};
