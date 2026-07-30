import React, { useState } from 'react';
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
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowUpRight,
  Server,
  Key,
  FileCode,
  Play,
  RefreshCw,
  Copy,
  Check,
  Layers,
  Zap,
  Globe
} from 'lucide-react';
import { Project, ProjectPhase, AgentId } from '../types';
import { LiveHtmlPreview } from './LiveHtmlPreview';
import { CodeViewer } from './CodeViewer';

interface StudioWorkspaceProps {
  project: Project;
  onTriggerAgent: (agentId: AgentId, customPrompt?: string) => void;
  isDarkMode: boolean;
}

export const StudioWorkspace: React.FC<StudioWorkspaceProps> = ({
  project,
  onTriggerAgent,
  isDarkMode,
}) => {
  const [activeTab, setActiveTab] = useState<ProjectPhase>('vision');
  const [copiedSql, setCopiedSql] = useState(false);

  const handleCopySql = () => {
    navigator.clipboard.writeText(project.memory.databaseSchemaSql || '');
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  const navTabs: { id: ProjectPhase; label: string; agentId: AgentId; icon: React.FC<{ className?: string }> }[] = [
    { id: 'vision', label: 'Vision & Synthèse', agentId: 'director', icon: Crown },
    { id: 'architecture', label: 'Architecture', agentId: 'architect', icon: Cpu },
    { id: 'design', label: 'Design & UI/UX', agentId: 'designer', icon: Palette },
    { id: 'code', label: 'Code Source', agentId: 'coder', icon: Code },
    { id: 'database', label: 'Base de Données', agentId: 'database', icon: Database },
    { id: 'security', label: 'Sécurité & Audit', agentId: 'security', icon: ShieldCheck },
    { id: 'testing', label: 'Tests & QA', agentId: 'tester', icon: TestTube },
    { id: 'documentation', label: 'Workflow & Mémoire', agentId: 'workflow', icon: Kanban },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Project Banner */}
      <div className={`p-6 sm:p-8 rounded-2xl border transition-all duration-200 ${
        isDarkMode
          ? 'bg-[#0D0D0F] border-white/5 text-[#E4E4E7]'
          : 'bg-white border-slate-200 text-slate-900 shadow-slate-200/50'
      }`}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 uppercase tracking-widest">
                SIDIBÉ STUDIO PROJET
              </span>
              <span className="text-xs text-zinc-500">
                Créé le {project.createdAt}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-light tracking-tight text-white">{project.title}</h1>
            <p className="text-sm text-zinc-400 leading-relaxed">{project.description}</p>
          </div>

          <div className="flex flex-row md:flex-col items-center md:items-end gap-3 flex-shrink-0">
            <div className="text-center md:text-right">
              <p className="text-[10px] text-indigo-400 uppercase font-bold tracking-widest mb-1">Progression Globale</p>
              <p className="text-3xl font-mono text-white">
                {project.progress}%
              </p>
            </div>

            <div className="w-36 h-1.5 rounded-full bg-zinc-800 overflow-hidden">
              <div
                className="h-full bg-indigo-500 transition-all duration-500"
                style={{ width: `${project.progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className={`border-b overflow-x-auto scrollbar-none transition-colors duration-200 ${
        isDarkMode ? 'border-white/5' : 'border-slate-200'
      }`}>
        <div className="flex items-center gap-2 pb-2">
          {navTabs.map((tab) => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 shadow-md shadow-indigo-500/10'
                    : isDarkMode
                    ? 'text-zinc-400 hover:text-white hover:bg-white/5'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab 1: Vision & Synthèse */}
      {activeTab === 'vision' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Tech Stack Card */}
            <div className={`p-6 rounded-2xl border space-y-4 ${
              isDarkMode ? 'bg-[#111113] border-white/5' : 'bg-white border-slate-200 shadow-xs'
            }`}>
              <h3 className="text-[10px] uppercase font-bold tracking-[0.2em] text-zinc-500 flex items-center gap-2">
                <Server className="w-4 h-4 text-indigo-400" />
                Pile Technologique
              </h3>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                  <p className="text-zinc-500 font-medium mb-0.5">Frontend</p>
                  <p className="font-mono text-zinc-200">{project.techStack.frontend}</p>
                </div>
                <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                  <p className="text-zinc-500 font-medium mb-0.5">Backend</p>
                  <p className="font-mono text-zinc-200">{project.techStack.backend}</p>
                </div>
                <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                  <p className="text-zinc-500 font-medium mb-0.5">Base de Données</p>
                  <p className="font-mono text-zinc-200">{project.techStack.database}</p>
                </div>
                <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                  <p className="text-zinc-500 font-medium mb-0.5">Authentification</p>
                  <p className="font-mono text-zinc-200">{project.techStack.auth}</p>
                </div>
              </div>
            </div>

            {/* Middle Key Decisions Card */}
            <div className={`p-6 rounded-2xl border space-y-4 md:col-span-2 ${
              isDarkMode ? 'bg-[#111113] border-white/5' : 'bg-white border-slate-200 shadow-xs'
            }`}>
              <div className="flex items-center justify-between">
                <h3 className="text-[10px] uppercase font-bold tracking-[0.2em] text-zinc-500 flex items-center gap-2">
                  <Crown className="w-4 h-4 text-indigo-400" />
                  Arbitrages de Studio Director AI
                </h3>
                <button
                  onClick={() => onTriggerAgent('director')}
                  className="px-3 py-1 rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-xs font-medium hover:bg-indigo-500/20 transition-colors"
                >
                  Relancer l'Analyse
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.memory.keyDecisions.map((dec, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-black/40 border border-white/5 text-xs flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed text-zinc-300">{dec}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-white/5">
                <p className="text-xs text-zinc-400">
                  <strong className="text-zinc-300">Public Cible :</strong> {project.targetAudience}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Architecture */}
      {activeTab === 'architecture' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className={`p-6 rounded-2xl border space-y-4 ${
            isDarkMode ? 'bg-[#111113] border-white/5' : 'bg-white border-slate-200'
          }`}>
            <div className="flex items-center justify-between">
              <h3 className="text-[10px] uppercase font-bold tracking-[0.2em] text-zinc-500 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-indigo-400" />
                Topologie & Flux Réseau (Architect AI)
              </h3>
              <button
                onClick={() => onTriggerAgent('architect')}
                className="px-3 py-1 rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-xs font-medium hover:bg-indigo-500/20 transition-colors"
              >
                Actualiser l'Architecture
              </button>
            </div>

            <p className="text-xs leading-relaxed text-zinc-300">{project.memory.architectureOverview}</p>

            {/* API Endpoints Table */}
            <div className="space-y-3 pt-4 border-t border-white/5">
              <h4 className="text-[10px] uppercase font-bold tracking-[0.2em] text-zinc-500">Endpoints API REST Définis</h4>
              <div className="overflow-x-auto rounded-xl border border-white/5 bg-black/30">
                <table className="w-full text-xs text-left">
                  <thead className="bg-black/50 text-zinc-500 uppercase font-mono text-[10px]">
                    <tr>
                      <th className="p-3">Méthode</th>
                      <th className="p-3">Route Endpoint</th>
                      <th className="p-3">Description & Usage</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 bg-[#111113]">
                    {project.memory.apiEndpoints.map((ep, idx) => (
                      <tr key={idx} className="hover:bg-white/5 font-mono">
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded font-mono text-[10px] ${
                            ep.method === 'GET'
                              ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                              : ep.method === 'POST'
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : ep.method === 'PUT'
                              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                              : 'bg-red-500/10 text-red-400 border border-red-500/20'
                          }`}>
                            {ep.method}
                          </span>
                        </td>
                        <td className="p-3 text-indigo-300 font-semibold">{ep.path}</td>
                        <td className="p-3 font-sans text-zinc-300">{ep.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Design & UI/UX */}
      {activeTab === 'design' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <h3 className="text-[10px] uppercase font-bold tracking-[0.2em] text-zinc-500 flex items-center gap-2">
              <Palette className="w-4 h-4 text-indigo-400" />
              Prototypage UI/UX (Designer AI)
            </h3>
            <button
              onClick={() => onTriggerAgent('designer')}
              className="px-3 py-1 rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-xs font-medium hover:bg-indigo-500/20 transition-colors"
            >
              Générer une Nouvelle Maquette
            </button>
          </div>

          {project.memory.uiWireframes.length > 0 ? (
            project.memory.uiWireframes.map((wireframe, idx) => (
              <LiveHtmlPreview key={idx} wireframe={wireframe} isDarkMode={isDarkMode} />
            ))
          ) : (
            <div className="p-8 text-center text-zinc-500 bg-[#111113] rounded-2xl border border-white/5">
              <p>Aucune maquette générée pour le moment.</p>
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Code Source */}
      {activeTab === 'code' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <h3 className="text-[10px] uppercase font-bold tracking-[0.2em] text-zinc-500 flex items-center gap-2">
              <Code className="w-4 h-4 text-indigo-400" />
              Fichiers Source Générés (Coder AI)
            </h3>
            <button
              onClick={() => onTriggerAgent('coder')}
              className="px-3 py-1 rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-xs font-medium hover:bg-indigo-500/20 transition-colors"
            >
              Régénérer le Code
            </button>
          </div>

          <CodeViewer artifacts={project.memory.codeArtifacts} isDarkMode={isDarkMode} />
        </div>
      )}

      {/* Tab 5: Base de Données */}
      {activeTab === 'database' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className={`p-6 rounded-2xl border space-y-4 ${
            isDarkMode ? 'bg-[#111113] border-white/5' : 'bg-white border-slate-200'
          }`}>
            <div className="flex items-center justify-between">
              <h3 className="text-[10px] uppercase font-bold tracking-[0.2em] text-zinc-500 flex items-center gap-2">
                <Database className="w-4 h-4 text-indigo-400" />
                Schéma Relationnel SQL DDL (Database AI)
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopySql}
                  className="px-3 py-1.5 rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-xs font-medium flex items-center gap-1 hover:bg-indigo-500/20 transition-colors"
                >
                  {copiedSql ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSql ? 'SQL Copié' : 'Copier le SQL'}</span>
                </button>
                <button
                  onClick={() => onTriggerAgent('database')}
                  className="px-3 py-1.5 rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-xs font-medium hover:bg-indigo-500/20 transition-colors"
                >
                  Optimiser le Schéma
                </button>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-black/50 font-mono text-xs overflow-x-auto text-indigo-200/90 leading-relaxed max-h-[450px] overflow-y-auto border border-white/5">
              <pre>{project.memory.databaseSchemaSql}</pre>
            </div>
          </div>
        </div>
      )}

      {/* Tab 6: Sécurité & Audit */}
      {activeTab === 'security' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className={`p-6 rounded-2xl border space-y-4 ${
            isDarkMode ? 'bg-[#111113] border-white/5' : 'bg-white border-slate-200'
          }`}>
            <div className="flex items-center justify-between">
              <h3 className="text-[10px] uppercase font-bold tracking-[0.2em] text-zinc-500 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-indigo-400" />
                Politiques & Audit Cybersécurité (Security AI)
              </h3>
              <button
                onClick={() => onTriggerAgent('security')}
                className="px-3 py-1 rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-xs font-medium hover:bg-indigo-500/20 transition-colors"
              >
                Lancer un Scan OWASP
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.memory.securityPolicies.map((pol, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-black/40 border border-white/5 text-xs flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                  <span className="text-zinc-300 leading-relaxed">{pol}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 7: Tests & QA */}
      {activeTab === 'testing' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className={`p-6 rounded-2xl border space-y-4 ${
            isDarkMode ? 'bg-[#111113] border-white/5' : 'bg-white border-slate-200'
          }`}>
            <div className="flex items-center justify-between">
              <h3 className="text-[10px] uppercase font-bold tracking-[0.2em] text-zinc-500 flex items-center gap-2">
                <TestTube className="w-4 h-4 text-indigo-400" />
                Suites de Tests & QA (Tester AI)
              </h3>
              <button
                onClick={() => onTriggerAgent('tester')}
                className="px-3 py-1 rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-xs font-medium hover:bg-indigo-500/20 transition-colors"
              >
                Exécuter les Tests
              </button>
            </div>

            {project.memory.testSuites.map((ts, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-indigo-300">{ts.name}</span>
                  <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[10px] uppercase font-mono">
                    {ts.type}
                  </span>
                </div>
                <pre className="p-3 rounded-lg bg-black/60 font-mono text-xs text-zinc-300 overflow-x-auto">
                  {ts.code}
                </pre>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 8: Workflow & Documentation */}
      {activeTab === 'documentation' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className={`p-6 rounded-2xl border space-y-4 ${
            isDarkMode ? 'bg-[#111113] border-white/5' : 'bg-white border-slate-200'
          }`}>
            <h3 className="text-[10px] uppercase font-bold tracking-[0.2em] text-zinc-500 flex items-center gap-2">
              <BrainCircuit className="w-4 h-4 text-indigo-400" />
              Registre de Connaissances & Master Readme (AI Memory)
            </h3>

            <div className="p-4 rounded-xl bg-black/50 font-mono text-xs overflow-x-auto text-zinc-300 leading-relaxed border border-white/5 max-h-[500px] overflow-y-auto">
              <pre className="whitespace-pre-wrap">{project.memory.masterReadme}</pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
