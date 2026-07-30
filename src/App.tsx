import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { NavbarTop } from './components/NavbarTop';
import { DashboardHome } from './components/DashboardHome';
import { StudioWorkspace } from './components/StudioWorkspace';
import { AgentsBar } from './components/AgentsBar';
import { AgentDetailModal } from './components/AgentDetailModal';
import { AgentChatDrawer } from './components/AgentChatDrawer';
import { AGENTS_LIST } from './data/agents';
import { Project, AgentId, ChatMessage } from './types';
import { ArrowLeft, Bot } from 'lucide-react';

const LOCAL_STORAGE_KEY = 'SIDIBE_STUDIO_PROJECTS_V1';

export default function App() {
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);
  const [activeNav, setActiveNav] = useState<string>('accueil');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [selectedAgentId, setSelectedAgentId] = useState<AgentId | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);
  const [isChatDrawerOpen, setIsChatDrawerOpen] = useState<boolean>(false);

  const [isOrchestrating, setIsOrchestrating] = useState<boolean>(false);
  const [orchestrationStep, setOrchestrationStep] = useState<string>('');
  const [isSendingChat, setIsSendingChat] = useState<boolean>(false);

  // Sync projects with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(projects));
    } catch (e) {
      console.error('Error saving projects to localStorage:', e);
    }
  }, [projects]);

  const currentProject = projects.find((p) => p.id === currentProjectId) || null;

  // Handle launching a new project with the 9-agent studio pipeline
  const handleLaunchProject = async (promptInput: string, templateTitle?: string) => {
    setIsOrchestrating(true);
    setOrchestrationStep('Analyse de la vision par Studio Director AI...');

    try {
      // Step 1: Call Express backend orchestration endpoint powered by Gemini
      const res = await fetch('/api/studio/orchestrate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptInput,
          title: templateTitle,
        }),
      });

      setOrchestrationStep('Consultation des 9 agents spécialisés & génération de la stack...');

      if (!res.ok) {
        throw new Error('Erreur lors de l\'orchestration');
      }

      const data = await res.json();

      const newProjId = 'proj_' + Date.now();
      const newProject: Project = {
        id: newProjId,
        title: data.title || templateTitle || promptInput.slice(0, 35) + '...',
        ideaPrompt: promptInput,
        description: data.description || 'Projet créé par SIDIBÉ STUDIO AI.',
        targetAudience: data.targetAudience || 'Utilisateurs grand public et professionnels.',
        techStack: data.techStack || {
          frontend: 'React 19, Vite, Tailwind CSS v4',
          backend: 'Node.js, Express, TypeScript',
          database: 'PostgreSQL, Drizzle ORM',
          auth: 'JWT Auth & Cookies',
          styling: 'Tailwind CSS v4'
        },
        createdAt: new Date().toLocaleDateString('fr-FR'),
        updatedAt: new Date().toLocaleTimeString('fr-FR'),
        progress: 100,
        currentPhase: 'vision',
        tasks: [
          {
            id: 'task_1',
            agentId: 'director',
            phase: 'vision',
            title: 'Analyse de la vision & objectifs',
            description: 'Validation de la faisabilité et cadrage fonctionnel.',
            status: 'completed',
            timestamp: new Date().toLocaleTimeString('fr-FR')
          },
          {
            id: 'task_2',
            agentId: 'architect',
            phase: 'architecture',
            title: 'Architecture microservices & endpoints API',
            description: 'Topologie réseau et routes REST.',
            status: 'completed',
            timestamp: new Date().toLocaleTimeString('fr-FR')
          },
          {
            id: 'task_3',
            agentId: 'designer',
            phase: 'design',
            title: 'Design System & Maquette UI HTML/Tailwind',
            description: 'Création du wireframe interactif.',
            status: 'completed',
            timestamp: new Date().toLocaleTimeString('fr-FR')
          },
          {
            id: 'task_4',
            agentId: 'coder',
            phase: 'code',
            title: 'Génération du code source TypeScript',
            description: 'Développement de App.tsx et server.ts.',
            status: 'completed',
            timestamp: new Date().toLocaleTimeString('fr-FR')
          },
          {
            id: 'task_5',
            agentId: 'database',
            phase: 'database',
            title: 'Schéma SQL DDL & Indexation',
            description: 'Modélisation des entités et clés primaires.',
            status: 'completed',
            timestamp: new Date().toLocaleTimeString('fr-FR')
          },
          {
            id: 'task_6',
            agentId: 'security',
            phase: 'security',
            title: 'Audit OWASP & Auth Policies',
            description: 'Sécurisation des routes et des tokens.',
            status: 'completed',
            timestamp: new Date().toLocaleTimeString('fr-FR')
          },
          {
            id: 'task_7',
            agentId: 'tester',
            phase: 'testing',
            title: 'Suites de tests unitaires Vitest',
            description: 'Écriture des scénarios de validation.',
            status: 'completed',
            timestamp: new Date().toLocaleTimeString('fr-FR')
          }
        ],
        memory: {
          keyDecisions: data.keyDecisions || [
            'Architecture microservices moderne découplée',
            'Composants React fortement typés en TypeScript',
            'Base de données relationnelle sécurisée par index'
          ],
          architectureOverview: data.architectureOverview || 'Architecture full-stack sécurisée.',
          apiEndpoints: data.apiEndpoints || [],
          databaseSchemaSql: data.databaseSchemaSql || '-- SQL Schema',
          securityPolicies: data.securityPolicies || [],
          codeArtifacts: data.codeArtifacts || [],
          uiWireframes: data.uiWireframes || [],
          testSuites: data.testSuites || [],
          masterReadme: data.masterReadme || '# Documentation du Projet',
          logs: [
            { timestamp: new Date().toLocaleTimeString('fr-FR'), agentId: 'director', event: 'Projet initialisé par SIDIBÉ STUDIO AI' }
          ]
        },
        chatHistory: [
          {
            id: 'msg_welcome',
            sender: 'director',
            message: `Bienvenue dans votre nouvel espace de production pour "${data.title || 'votre projet'}". Tous les agents de SIDIBÉ STUDIO AI ont préparé l'architecture, le design, le code et la sécurité. Comment souhaitez-vous poursuivre ?`,
            timestamp: new Date().toLocaleTimeString('fr-FR')
          }
        ]
      };

      setProjects((prev) => [newProject, ...prev]);
      setCurrentProjectId(newProjId);
      setActiveNav('workspace');
    } catch (err: any) {
      console.error('Failed to launch project:', err);
      alert('Erreur lors de la génération par le studio : ' + err.message);
    } finally {
      setIsOrchestrating(false);
      setOrchestrationStep('');
    }
  };

  // Trigger individual agent action
  const handleTriggerAgentAction = async (agentId: string, customPrompt: string) => {
    if (!currentProject) return;

    try {
      const res = await fetch('/api/studio/agent-step', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          agentId,
          actionPrompt: customPrompt,
          projectContext: {
            title: currentProject.title,
            description: currentProject.description,
            techStack: currentProject.techStack
          }
        })
      });

      const data = await res.json();

      // Add feedback message in chat history
      const newMsg: ChatMessage = {
        id: 'msg_' + Date.now(),
        sender: agentId as AgentId,
        message: data.output || `L'agent ${agentId} a exécuté la tâche avec succès.`,
        timestamp: new Date().toLocaleTimeString('fr-FR')
      };

      setProjects((prev) =>
        prev.map((p) => {
          if (p.id === currentProject.id) {
            return {
              ...p,
              chatHistory: [...p.chatHistory, newMsg],
              memory: {
                ...p.memory,
                logs: [
                  ...p.memory.logs,
                  { timestamp: new Date().toLocaleTimeString('fr-FR'), agentId: agentId as AgentId, event: `Action exécutée: ${customPrompt.slice(0, 30)}` }
                ]
              }
            };
          }
          return p;
        })
      );

      setIsChatDrawerOpen(true);
    } catch (err: any) {
      console.error('Error triggering agent action:', err);
    }
  };

  // Handle chat message with agent
  const handleSendMessage = async (messageText: string, targetAgentId: AgentId) => {
    if (!currentProject) return;

    const userMsg: ChatMessage = {
      id: 'msg_user_' + Date.now(),
      sender: 'user',
      message: messageText,
      timestamp: new Date().toLocaleTimeString('fr-FR')
    };

    // Append user message immediately
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === currentProject.id) {
          return {
            ...p,
            chatHistory: [...p.chatHistory, userMsg]
          };
        }
        return p;
      })
    );

    setIsSendingChat(true);

    try {
      const res = await fetch('/api/studio/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageText,
          selectedAgent: targetAgentId,
          projectContext: {
            title: currentProject.title,
            description: currentProject.description,
            techStack: currentProject.techStack
          },
          chatHistory: currentProject.chatHistory
        })
      });

      const data = await res.json();

      const agentReplyMsg: ChatMessage = {
        id: 'msg_agent_' + Date.now(),
        sender: targetAgentId,
        message: data.reply || 'Je prends en compte votre remarque pour le projet.',
        timestamp: new Date().toLocaleTimeString('fr-FR')
      };

      setProjects((prev) =>
        prev.map((p) => {
          if (p.id === currentProject.id) {
            return {
              ...p,
              chatHistory: [...p.chatHistory, agentReplyMsg]
            };
          }
          return p;
        })
      );
    } catch (err: any) {
      console.error('Chat error:', err);
    } finally {
      setIsSendingChat(false);
    }
  };

  // Export handlers
  const handleExportJson = () => {
    if (!currentProject) return;
    const blob = new Blob([JSON.stringify(currentProject, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentProject.title.toLowerCase().replace(/\s+/g, '_')}_sidibe_studio.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportMarkdown = () => {
    if (!currentProject) return;
    const blob = new Blob([currentProject.memory.masterReadme], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `README_${currentProject.title.toLowerCase().replace(/\s+/g, '_')}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const selectedAgentInfo = AGENTS_LIST.find((a) => a.id === selectedAgentId) || null;

  return (
    <div className={`min-h-screen font-sans flex transition-colors duration-200 ${
      isDarkMode ? 'bg-[#09090B] text-[#E4E4E7]' : 'bg-[#F8F9FC] text-slate-900'
    }`}>
      {/* Sidebar Navigation */}
      <Sidebar
        activeNav={activeNav}
        onSelectNav={(nav) => {
          setActiveNav(nav);
          if (nav === 'accueil') {
            setCurrentProjectId(null);
          }
        }}
        isDarkMode={isDarkMode}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <NavbarTop
          isDarkMode={isDarkMode}
          onToggleTheme={() => setIsDarkMode(!isDarkMode)}
          currentProject={currentProject}
          onNewProjectClick={() => {
            setCurrentProjectId(null);
            setActiveNav('accueil');
          }}
        />

        {/* Content Body */}
        <main className="flex-1 overflow-y-auto">
          {activeNav === 'workspace' && currentProject ? (
            <div className="space-y-4">
              {/* Back to Hub Banner */}
              <div className={`px-6 py-3 border-b flex items-center justify-between text-xs ${
                isDarkMode ? 'bg-[#111113] border-white/5 text-zinc-300' : 'bg-white border-slate-200 text-slate-700'
              }`}>
                <button
                  onClick={() => {
                    setActiveNav('accueil');
                  }}
                  className="flex items-center gap-2 font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>← Retour au Tableau de bord</span>
                </button>

                <div className="flex items-center gap-3">
                  <span className="text-zinc-400">Projet : <strong className="text-slate-900 dark:text-white">{currentProject.title}</strong></span>
                  <button
                    onClick={() => setIsChatDrawerOpen(true)}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-500 font-medium hover:bg-indigo-500/20 transition-colors cursor-pointer"
                  >
                    <Bot className="w-3.5 h-3.5" />
                    <span>Chat Agents</span>
                  </button>
                </div>
              </div>

              {/* Agents Bar */}
              <AgentsBar
                selectedAgentId={selectedAgentId}
                onSelectAgent={(agentId) => {
                  setSelectedAgentId(agentId);
                  setIsDetailModalOpen(true);
                }}
                onTriggerAgent={(agentId) => {
                  setSelectedAgentId(agentId);
                  handleTriggerAgentAction(agentId, `Exécute ta tâche principale pour le projet.`);
                }}
                isDarkMode={isDarkMode}
              />

              <StudioWorkspace
                project={currentProject}
                onTriggerAgent={(agentId, prompt) => handleTriggerAgentAction(agentId, prompt || 'Exécute l\'action.')}
                isDarkMode={isDarkMode}
              />
            </div>
          ) : (
            <DashboardHome
              isDarkMode={isDarkMode}
              onLaunchProject={handleLaunchProject}
              onSelectProject={(proj) => {
                setCurrentProjectId(proj.id);
                setActiveNav('workspace');
              }}
              projectsList={projects}
              isOrchestrating={isOrchestrating}
              orchestrationStep={orchestrationStep}
            />
          )}
        </main>
      </div>

      {/* Agent Detail Modal */}
      <AgentDetailModal
        agent={selectedAgentInfo}
        onClose={() => setIsDetailModalOpen(false)}
        onTriggerAction={handleTriggerAgentAction}
        onOpenChatWithAgent={(agentId) => {
          setSelectedAgentId(agentId as AgentId);
          setIsChatDrawerOpen(true);
        }}
        currentProject={currentProject}
        isDarkMode={isDarkMode}
      />

      {/* Agent Chat Drawer */}
      <AgentChatDrawer
        isOpen={isChatDrawerOpen}
        onClose={() => setIsChatDrawerOpen(false)}
        project={currentProject}
        onSendMessage={handleSendMessage}
        isSending={isSendingChat}
        isDarkMode={isDarkMode}
        activeAgentId={selectedAgentId || 'director'}
      />
    </div>
  );
}
