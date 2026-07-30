import React, { useState } from 'react';
import {
  ArrowRight,
  TrendingUp,
  Layers,
  Bot,
  ShieldCheck,
  MoreHorizontal,
  Code2,
  Globe,
  Gamepad2,
  Palette,
  Compass,
  ArrowUpRight
} from 'lucide-react';
import { Project } from '../types';

interface DashboardHomeProps {
  isDarkMode: boolean;
  onLaunchProject: (prompt: string, templateTitle?: string) => void;
  onSelectProject: (project: Project) => void;
  projectsList: Project[];
  isOrchestrating: boolean;
  orchestrationStep: string;
}

export const DashboardHome: React.FC<DashboardHomeProps> = ({
  isDarkMode,
  onLaunchProject,
  onSelectProject,
  projectsList,
  isOrchestrating,
  orchestrationStep
}) => {
  const [quickPrompt, setQuickPrompt] = useState('');

  const handlePromptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickPrompt.trim() || isOrchestrating) return;
    onLaunchProject(quickPrompt);
  };

  const handleTagClick = (tag: string) => {
    const defaultPrompts: Record<string, string> = {
      'App mobile': 'Crée une application mobile Cross-Platform React Native / Web pour la gestion de livraisons express avec géolocalisation.',
      'Site web': 'Conçois un site web vitrine ultra moderne et réactif avec animations 3D pour une agence de design créatif.',
      'Jeu vidéo': 'Développe un jeu vidéo 2D éducatif et ludique en Canvas/React pour l\'apprentissage des langues.',
      'Outil IA': 'Crée une plateforme d\'analyse prédictive IA avec génération automatique de rapports PDF et graphiques interactifs.',
      'Entreprise': 'Conçois un logiciel ERP SaaS pour petites entreprises avec facturation Stripe, gestion de stock et CRM.'
    };
    onLaunchProject(defaultPrompts[tag] || `Projet ${tag} généré par SIDIBÉ STUDIO AI`);
  };

  // Sample default featured projects matching screenshot
  const featuredProjects = [
    {
      id: 'proj_kanu',
      title: 'KANÜ',
      subtitle: 'Jeu éducatif en bambara',
      status: 'En cours',
      statusColor: 'bg-zinc-900 text-white border-zinc-700 dark:bg-zinc-800',
      bannerBg: 'bg-gradient-to-br from-[#2D1B13] via-[#4A2B1D] to-[#120A06]',
      bannerGraphic: 'kanu',
      collaboratorsCount: 3,
      prompt: 'Jeu éducatif interactif KANÜ pour apprendre le bambara avec quiz audio et niveaux d\'aventure.'
    },
    {
      id: 'proj_pay',
      title: 'SIDIBÉ PAY',
      subtitle: 'Application fintech',
      status: 'En développement',
      statusColor: 'bg-indigo-950 text-indigo-300 border-indigo-800/50',
      bannerBg: 'bg-gradient-to-br from-[#120C24] via-[#241445] to-[#0D071B]',
      bannerGraphic: 'pay',
      collaboratorsCount: 2,
      prompt: 'Application Fintech SIDIBÉ PAY avec portefeuilles multi-devises, transferts d\'argent instantanés et cartes virtuelles.'
    },
    {
      id: 'proj_ai',
      title: 'SIDIBÉ AI',
      subtitle: 'Plateforme d\'intelligence artificielle',
      status: 'En ligne',
      statusColor: 'bg-emerald-950 text-emerald-300 border-emerald-800/50',
      bannerBg: 'bg-gradient-to-br from-[#061826] via-[#0B2C47] to-[#040E19]',
      bannerGraphic: 'ai',
      collaboratorsCount: 4,
      prompt: 'Plateforme SIDIBÉ AI d\'agrégation de modèles LLM avec orchestration d\'agents spécialisés.'
    },
    {
      id: 'proj_barber',
      title: 'SIDIBÉ BARBER',
      subtitle: 'Application de gestion',
      status: 'En cours',
      statusColor: 'bg-zinc-900 text-amber-200 border-amber-500/30 dark:bg-zinc-900',
      bannerBg: 'bg-gradient-to-br from-[#1A1813] via-[#2E2819] to-[#0D0C09]',
      bannerGraphic: 'barber',
      collaboratorsCount: 2,
      prompt: 'Application SIDIBÉ BARBER & BEAUTY pour la prise de rendez-vous en ligne, le suivi des clients et la gestion de caisse.'
    },
  ];

  const studiosList = [
    {
      id: 'director',
      name: 'Studio Director',
      description: 'Planifiez, analysez et dirigez vos projets avec l\'IA.',
      gradient: 'from-purple-500 to-indigo-600',
      bgGlow: 'shadow-purple-500/10',
      iconType: 'star'
    },
    {
      id: 'app_builder',
      name: 'App Builder',
      description: 'Créez des applications mobiles et web.',
      gradient: 'from-emerald-400 to-teal-600',
      bgGlow: 'shadow-emerald-500/10',
      iconType: 'code'
    },
    {
      id: 'website_builder',
      name: 'Website Builder',
      description: 'Concevez des sites web modernes et performants.',
      gradient: 'from-blue-500 to-cyan-500',
      bgGlow: 'shadow-blue-500/10',
      iconType: 'globe'
    },
    {
      id: 'game_studio',
      name: 'Game Studio',
      description: 'Créez des jeux vidéo avec l\'assistance IA.',
      gradient: 'from-indigo-500 to-purple-700',
      bgGlow: 'shadow-indigo-500/10',
      iconType: 'game'
    },
    {
      id: 'ai_agents',
      name: 'AI Agents',
      description: 'Des agents IA spécialisés pour chaque tâche.',
      gradient: 'from-amber-400 to-orange-500',
      bgGlow: 'shadow-amber-500/10',
      iconType: 'bot'
    },
    {
      id: 'design_studio',
      name: 'Design Studio',
      description: 'Créez des designs professionnels.',
      gradient: 'from-pink-500 to-rose-600',
      bgGlow: 'shadow-pink-500/10',
      iconType: 'design'
    }
  ];

  return (
    <div className={`p-4 sm:p-8 space-y-8 max-w-7xl mx-auto transition-colors duration-200 ${
      isDarkMode ? 'bg-[#09090B] text-[#E4E4E7]' : 'bg-[#F8F9FC] text-slate-900'
    }`}>

      {/* Loading Orchestration Overlay */}
      {isOrchestrating && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-200">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-0.5 animate-pulse mb-6 shadow-2xl shadow-indigo-500/40">
            <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center">
              <Bot className="w-10 h-10 text-indigo-400 animate-bounce" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">SIDIBÉ STUDIO AI Orchestration</h2>
          <p className="text-indigo-400 font-mono text-sm max-w-md animate-pulse">
            {orchestrationStep || 'Consultation des 9 agents spécialisés...'}
          </p>
        </div>
      )}

      {/* TOP SECTION: HERO & QUICK LAUNCHER GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

        {/* LEFT HERO CARD (col-span-7) */}
        <div className={`lg:col-span-7 p-6 sm:p-8 rounded-3xl border relative overflow-hidden flex flex-col justify-between shadow-xs ${
          isDarkMode
            ? 'bg-gradient-to-br from-[#121217] via-[#0E0E12] to-[#161622] border-white/5'
            : 'bg-white border-slate-200/80 shadow-slate-200/50'
        }`}>
          {/* Top Pill Badge */}
          <div className="space-y-4 relative z-10 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-bold tracking-wide">
              <span>✨ NOUVELLE GÉNÉRATION 2026</span>
              <span className="text-[10px]">▸</span>
            </div>

            {/* Giant Title */}
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.1] text-slate-900 dark:text-white">
              Créer.<br />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Développer.
              </span><br />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Déployer.
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed font-normal">
              Le premier studio IA capable de concevoir des applications, sites web, jeux vidéo et entreprises complètes.
            </p>
          </div>

          {/* Action Buttons & Social Proof */}
          <div className="mt-8 space-y-6 relative z-10">
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  const el = document.getElementById('quick-prompt-input');
                  if (el) el.focus();
                }}
                className="px-6 py-3 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold text-xs flex items-center gap-2 hover:opacity-90 transition-all cursor-pointer shadow-md"
              >
                <span>Commencer</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  onLaunchProject(featuredProjects[0].prompt, featuredProjects[0].title);
                }}
                className={`px-6 py-3 rounded-full border font-semibold text-xs flex items-center gap-2 transition-all cursor-pointer ${
                  isDarkMode
                    ? 'border-white/10 bg-white/5 text-white hover:bg-white/10'
                    : 'border-slate-200 bg-white text-slate-800 hover:bg-slate-50'
                }`}
              >
                <span>Voir une démo</span>
                <span className="text-xs text-indigo-500">▹</span>
              </button>
            </div>

            {/* Social Proof Avatars */}
            <div className="flex items-center gap-3 pt-2 text-xs text-slate-500 dark:text-zinc-400">
              <div className="flex -space-x-2">
                <img className="w-7 h-7 rounded-full border-2 border-white dark:border-zinc-900 object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80" alt="avatar" />
                <img className="w-7 h-7 rounded-full border-2 border-white dark:border-zinc-900 object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80" alt="avatar" />
                <img className="w-7 h-7 rounded-full border-2 border-white dark:border-zinc-900 object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80" alt="avatar" />
                <img className="w-7 h-7 rounded-full border-2 border-white dark:border-zinc-900 object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80" alt="avatar" />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 text-[11px]">
                <span className="font-medium text-slate-700 dark:text-zinc-300">Rejoint par 12,547+ créateurs</span>
                <span className="hidden sm:inline">•</span>
                <span className="text-emerald-500 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  99.9% satisfaction
                </span>
              </div>
            </div>
          </div>

          {/* Right Floating Abstract Sphere Illustration */}
          <div className="absolute right-[-20px] bottom-[-20px] sm:right-0 sm:top-1/2 sm:-translate-y-1/2 w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-gradient-to-tr from-indigo-500/20 via-purple-500/20 to-blue-400/20 blur-2xl pointer-events-none" />
          <div className="absolute right-6 top-8 hidden md:block opacity-80 pointer-events-none">
            <div className="w-40 h-40 rounded-full bg-gradient-to-br from-indigo-400/30 via-purple-400/20 to-pink-400/10 border border-white/20 backdrop-blur-xl flex items-center justify-center shadow-2xl animate-pulse">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 opacity-40 blur-md" />
            </div>
          </div>
        </div>

        {/* RIGHT QUICK PROMPT & STATS PANEL (col-span-5) */}
        <div className={`lg:col-span-5 p-6 rounded-3xl border flex flex-col justify-between space-y-6 ${
          isDarkMode ? 'bg-[#111113] border-white/5' : 'bg-white border-slate-200/80 shadow-xs'
        }`}>
          {/* Header */}
          <div className="space-y-1">
            <h2 className="text-lg font-bold flex items-center gap-2 text-slate-900 dark:text-white">
              <span>Bonjour, Mohamed</span>
              <span className="animate-bounce">👋</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              Prêt à créer quelque chose d'incroyable aujourd'hui ?
            </p>
          </div>

          {/* Input Box Form */}
          <form onSubmit={handlePromptSubmit} className="relative">
            <input
              id="quick-prompt-input"
              type="text"
              value={quickPrompt}
              onChange={(e) => setQuickPrompt(e.target.value)}
              placeholder="Décrivez votre projet ou idée..."
              className={`w-full pl-4 pr-12 py-3.5 rounded-2xl border text-xs focus:outline-hidden transition-all ${
                isDarkMode
                  ? 'bg-[#09090B] border-white/10 text-white placeholder-zinc-500 focus:border-indigo-500/50'
                  : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:bg-white'
              }`}
            />
            <button
              type="submit"
              disabled={!quickPrompt.trim() || isOrchestrating}
              className="absolute right-2 top-2 w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-500 disabled:opacity-40 transition-colors cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Tag Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            {['App mobile', 'Site web', 'Jeu vidéo', 'Outil IA', 'Entreprise'].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => handleTagClick(tag)}
                className={`px-3 py-1 rounded-full text-[11px] font-medium border transition-colors cursor-pointer ${
                  isDarkMode
                    ? 'bg-[#18181B] border-white/5 text-zinc-300 hover:border-indigo-500/30 hover:text-white'
                    : 'bg-slate-100 border-slate-200 text-slate-600 hover:border-indigo-300 hover:bg-slate-200/60'
                }`}
              >
                + {tag}
              </button>
            ))}
          </div>

          {/* Split Activity / Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-200/60 dark:border-white/5">

            {/* Left: Activité récente */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-bold text-slate-900 dark:text-white">Activité récente</span>
                <span className="text-indigo-500 text-[10px] cursor-pointer hover:underline">Voir tout</span>
              </div>
              <div className="space-y-2 text-[11px]">
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 font-bold text-[9px] flex items-center justify-center flex-shrink-0 mt-0.5">K</div>
                  <div>
                    <p className="font-medium text-slate-800 dark:text-zinc-200 leading-tight">KANÜ a été mis à jour</p>
                    <p className="text-[10px] text-slate-400 dark:text-zinc-500">Il y a 2 heures</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-400 font-bold text-[9px] flex items-center justify-center flex-shrink-0 mt-0.5">P</div>
                  <div>
                    <p className="font-medium text-slate-800 dark:text-zinc-200 leading-tight">Nouveau projet SIDIBÉ PAY</p>
                    <p className="text-[10px] text-slate-400 dark:text-zinc-500">Il y a 9 jours</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[9px] flex items-center justify-center flex-shrink-0 mt-0.5">S</div>
                  <div>
                    <p className="font-medium text-slate-800 dark:text-zinc-200 leading-tight">Déploiement réussi</p>
                    <p className="text-[10px] text-emerald-500 font-mono">sidibe-ai.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Statistiques */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-bold text-slate-900 dark:text-white">Statistiques</span>
                <span className="text-[10px] text-slate-400 dark:text-zinc-500">Cette semaine ▾</span>
              </div>
              <div className="space-y-1.5 text-[11px]">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 dark:text-zinc-400">Projets créés</span>
                  <span className="font-bold font-mono text-slate-900 dark:text-white">12 <span className="text-emerald-500 text-[10px]">↑20%</span></span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 dark:text-zinc-400">Tâches exécutées</span>
                  <span className="font-bold font-mono text-slate-900 dark:text-white">156 <span className="text-emerald-500 text-[10px]">↑16%</span></span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 dark:text-zinc-400">Agents actifs</span>
                  <span className="font-bold font-mono text-slate-900 dark:text-white">18 <span className="text-emerald-500 text-[10px]">↑32%</span></span>
                </div>
                <div className="pt-1 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 dark:text-zinc-500">Disponibilité</span>
                  <span className="font-mono text-indigo-500 font-bold text-[10px]">99.9%</span>
                </div>
                {/* Mini sparkline */}
                <svg className="w-full h-4 text-indigo-500 overflow-visible" viewBox="0 0 100 20">
                  <path d="M0,15 Q25,5 50,12 T100,3" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* SECTION 2: VOS STUDIOS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Vos Studios</h2>
            <span className="text-indigo-500 text-sm">✨</span>
          </div>
          <button className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 hover:underline cursor-pointer">
            <span>Voir tous les studios</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 6 Studio Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          {studiosList.map((studio) => {
            return (
              <div
                key={studio.id}
                onClick={() => {
                  onLaunchProject(`Initié depuis ${studio.name} : Création d'un projet sur mesure.`, studio.name);
                }}
                className={`p-5 rounded-3xl border transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-4 group hover:-translate-y-1 ${
                  isDarkMode
                    ? 'bg-[#111113] border-white/5 hover:border-indigo-500/30 hover:bg-[#141418]'
                    : 'bg-white border-slate-200/80 hover:border-indigo-300 shadow-xs hover:shadow-md'
                }`}
              >
                <div className="space-y-3">
                  {/* 3D Glowing Icon Container */}
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${studio.gradient} flex items-center justify-center text-white shadow-lg ${studio.bgGlow} group-hover:scale-105 transition-transform`}>
                    {studio.iconType === 'star' && <Compass className="w-6 h-6" />}
                    {studio.iconType === 'code' && <Code2 className="w-6 h-6" />}
                    {studio.iconType === 'globe' && <Globe className="w-6 h-6" />}
                    {studio.iconType === 'game' && <Gamepad2 className="w-6 h-6" />}
                    {studio.iconType === 'bot' && <Bot className="w-6 h-6" />}
                    {studio.iconType === 'design' && <Palette className="w-6 h-6" />}
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white">{studio.name}</h3>
                    <p className="text-[11px] text-slate-500 dark:text-zinc-400 leading-snug mt-1">
                      {studio.description}
                    </p>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <div className={`w-7 h-7 rounded-full border flex items-center justify-center transition-colors ${
                    isDarkMode
                      ? 'border-white/10 text-zinc-400 group-hover:border-indigo-500 group-hover:text-indigo-400'
                      : 'border-slate-200 text-slate-400 group-hover:border-indigo-500 group-hover:text-indigo-600'
                  }`}>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 3: PROJETS RÉCENTS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Projets récents</h2>
            <span className="text-indigo-500 text-sm">✨</span>
          </div>
          <button className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 hover:underline cursor-pointer">
            <span>Voir tous les projets</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredProjects.map((p) => {
            // Check if user has an active version in project list
            const matchedProj = projectsList.find((item) => item.title.toLowerCase().includes(p.title.toLowerCase())) || null;

            return (
              <div
                key={p.id}
                onClick={() => {
                  if (matchedProj) {
                    onSelectProject(matchedProj);
                  } else {
                    onLaunchProject(p.prompt, p.title);
                  }
                }}
                className={`rounded-3xl border overflow-hidden flex flex-col justify-between transition-all duration-200 group cursor-pointer hover:-translate-y-1 ${
                  isDarkMode
                    ? 'bg-[#111113] border-white/5 hover:border-indigo-500/30'
                    : 'bg-white border-slate-200/80 hover:border-indigo-300 shadow-xs hover:shadow-md'
                }`}
              >
                {/* Banner Graphic Area */}
                <div className={`h-36 ${p.bannerBg} p-4 relative flex flex-col justify-between overflow-hidden`}>
                  {/* Status Badge */}
                  <div className="flex justify-between items-start z-10">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border backdrop-blur-md ${p.statusColor}`}>
                      • {p.status}
                    </span>
                  </div>

                  {/* Banner Title Artwork */}
                  <div className="z-10 flex items-center justify-center my-auto">
                    {p.bannerGraphic === 'kanu' && (
                      <div className="text-center">
                        <span className="text-3xl font-black text-amber-500 tracking-wider font-mono drop-shadow-md">KANÜ</span>
                        <p className="text-[9px] text-amber-200/80 uppercase tracking-widest font-bold">GAME STUDIO</p>
                      </div>
                    )}
                    {p.bannerGraphic === 'pay' && (
                      <div className="text-center">
                        <span className="text-2xl font-black text-indigo-300 tracking-wider font-mono">SIDIBÉ PAY</span>
                        <div className="w-12 h-1 bg-indigo-500/60 mx-auto rounded-full mt-1" />
                      </div>
                    )}
                    {p.bannerGraphic === 'ai' && (
                      <div className="text-center">
                        <span className="text-2xl font-black text-cyan-300 tracking-widest font-mono">SIDIBÉ AI</span>
                        <p className="text-[8px] text-cyan-200/60 tracking-widest">NEURAL NETWORK</p>
                      </div>
                    )}
                    {p.bannerGraphic === 'barber' && (
                      <div className="text-center">
                        <span className="text-lg font-extrabold text-amber-200 tracking-wider uppercase border-b border-amber-500/30 pb-0.5">
                          SIDIBÉ
                        </span>
                        <p className="text-[8px] text-amber-400 font-bold tracking-widest mt-0.5">BARBER & BEAUTY</p>
                      </div>
                    )}
                  </div>

                  {/* Background Ambient Glow */}
                  <div className="absolute inset-0 bg-radial from-white/10 to-transparent opacity-30 pointer-events-none" />
                </div>

                {/* Card Content Footer */}
                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-500 transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-zinc-400">
                      {p.subtitle}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-white/5">
                    <div className="flex items-center gap-2 text-slate-500 dark:text-zinc-400 text-[11px]">
                      <div className="flex -space-x-1.5">
                        <img className="w-5 h-5 rounded-full ring-1 ring-white dark:ring-zinc-900 object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60" alt="" />
                        <img className="w-5 h-5 rounded-full ring-1 ring-white dark:ring-zinc-900 object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60" alt="" />
                      </div>
                      <span>{p.collaboratorsCount} collaborateurs</span>
                    </div>

                    <button className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 4: BOTTOM STATS METRICS (4 CARDS) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Projets */}
        <div className={`p-5 rounded-3xl border flex items-center gap-4 ${
          isDarkMode ? 'bg-[#111113] border-white/5' : 'bg-white border-slate-200/80 shadow-xs'
        }`}>
          <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-500 flex items-center justify-center flex-shrink-0">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-mono font-black text-slate-900 dark:text-white">42</span>
            <p className="text-xs font-semibold text-slate-800 dark:text-zinc-200">Projets</p>
            <p className="text-[10px] text-emerald-500 font-medium">↑ 12 ce mois-ci</p>
          </div>
        </div>

        {/* Card 2: Agents IA */}
        <div className={`p-5 rounded-3xl border flex items-center gap-4 ${
          isDarkMode ? 'bg-[#111113] border-white/5' : 'bg-white border-slate-200/80 shadow-xs'
        }`}>
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center flex-shrink-0">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-mono font-black text-slate-900 dark:text-white">18</span>
            <p className="text-xs font-semibold text-slate-800 dark:text-zinc-200">Agents IA</p>
            <p className="text-[10px] text-slate-400 dark:text-zinc-400">Actifs et opérationnels</p>
          </div>
        </div>

        {/* Card 3: Tâches exécutées */}
        <div className={`p-5 rounded-3xl border flex items-center gap-4 ${
          isDarkMode ? 'bg-[#111113] border-white/5' : 'bg-white border-slate-200/80 shadow-xs'
        }`}>
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-500 flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-mono font-black text-slate-900 dark:text-white">156</span>
            <p className="text-xs font-semibold text-slate-800 dark:text-zinc-200">Tâches exécutées</p>
            <p className="text-[10px] text-slate-400 dark:text-zinc-400">Cette semaine</p>
          </div>
        </div>

        {/* Card 4: Disponibilité */}
        <div className={`p-5 rounded-3xl border flex items-center gap-4 ${
          isDarkMode ? 'bg-[#111113] border-white/5' : 'bg-white border-slate-200/80 shadow-xs'
        }`}>
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center flex-shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-mono font-black text-slate-900 dark:text-white">99.9%</span>
            <p className="text-xs font-semibold text-slate-800 dark:text-zinc-200">Disponibilité</p>
            <p className="text-[10px] text-slate-400 dark:text-zinc-400">Uptime plateforme</p>
          </div>
        </div>
      </div>

    </div>
  );
};
