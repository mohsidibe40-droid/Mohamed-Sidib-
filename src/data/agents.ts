import { AgentInfo } from '../types';

export const AGENTS_LIST: AgentInfo[] = [
  {
    id: 'director',
    name: 'Studio Director AI',
    role: 'Coordinateur & Stratège Produit',
    badge: 'LEADER',
    color: '#8b5cf6', // Violet
    avatarBg: 'bg-violet-600/20 text-violet-400 border-violet-500/30',
    iconName: 'Crown',
    description: 'Chef d\'orchestre du studio. Il analyse votre idée initiale, définit la vision produit, répartit les rôles et coordonne les interventions de tous les agents.',
    responsibilities: [
      'Analyse initiale du besoin et structuration du projet',
      'Harmonisation des propositions des différents agents',
      'Validation de la cohérence globale du projet',
      'Synthèse des livrables et rapport final'
    ],
    capabilities: ['Strategic Vision', 'Task Synthesis', 'Project Briefing', 'Cross-Agent Alignment']
  },
  {
    id: 'architect',
    name: 'Architect AI',
    role: 'Architecte Système & Tech Lead',
    badge: 'ARCHITECT',
    color: '#3b82f6', // Blue
    avatarBg: 'bg-blue-600/20 text-blue-400 border-blue-500/30',
    iconName: 'Cpu',
    description: 'Conçoit la structure globale de l\'application, choisit les meilleures technologies, définit les composants microservices et spécifie les API.',
    responsibilities: [
      'Sélection de la pile technique optimale (Tech Stack)',
      'Diagrammes de flux et topologie réseau/application',
      'Définition des endpoints REST & WebSocket',
      'Planification de la scalabilité et des performances'
    ],
    capabilities: ['System Topography', 'Tech Stack Selection', 'API Design', 'Scalability Blueprinting']
  },
  {
    id: 'designer',
    name: 'Designer AI',
    role: 'UI/UX & Design System Specialist',
    badge: 'DESIGN',
    color: '#ec4899', // Pink
    avatarBg: 'bg-pink-600/20 text-pink-400 border-pink-500/30',
    iconName: 'Palette',
    description: 'Crée l\'identité visuelle, les wireframes, la charte graphique et génère des composants UI interactifs directement prévisualisables.',
    responsibilities: [
      'Élaboration de la palette de couleurs et typographies',
      'Création des wireframes et maquettes d\'écrans',
      'Design des composants réutilisables (Design System)',
      'Optimisation de l\'expérience utilisateur (UX)'
    ],
    capabilities: ['UI Wireframing', 'Tailwind Design System', 'Live HTML/CSS Prototypes', 'Accessibility (a11y)']
  },
  {
    id: 'coder',
    name: 'Coder AI',
    role: 'Développeur Full-Stack Principal',
    badge: 'ENGINEER',
    color: '#10b981', // Emerald
    avatarBg: 'bg-emerald-600/20 text-emerald-400 border-emerald-500/30',
    iconName: 'Code',
    description: 'Traduit l\'architecture et le design en code TypeScript propre, maintenable et immédiatement opérationnel pour le frontend et le backend.',
    responsibilities: [
      'Génération du code source frontend (React, Tailwind)',
      'Développement du code backend (Express, Controllers)',
      'Implémentation de la logique métier et des handlers d\'événements',
      'Respect des bonnes pratiques de typage TypeScript'
    ],
    capabilities: ['React & Express Code', 'Clean Code Practices', 'TypeScript Typing', 'Full-Stack Implementation']
  },
  {
    id: 'database',
    name: 'Database AI',
    role: 'Architecte de Données',
    badge: 'DATABASE',
    color: '#f59e0b', // Amber
    avatarBg: 'bg-amber-600/20 text-amber-400 border-amber-500/30',
    iconName: 'Database',
    description: 'Modélise les données, écrit les schémas SQL/NoSQL, définit les relations (1:N, N:N), crée les index et optimise les requêtes.',
    responsibilities: [
      'Modélisation Entité-Association (ERD)',
      'Écriture du schéma DDL SQL (PostgreSQL/Firestore)',
      'Optimisation des requêtes et stratégie d\'indexation',
      'Gestion des transactions et de l\'intégrité référentielle'
    ],
    capabilities: ['SQL DDL Generation', 'Schema Normalization', 'Relational Models', 'Migration Scripts']
  },
  {
    id: 'security',
    name: 'Security AI',
    role: 'Expert Cybersécurité & Conformité',
    badge: 'SECURITY',
    color: '#ef4444', // Red
    avatarBg: 'bg-red-600/20 text-red-400 border-red-500/30',
    iconName: 'ShieldCheck',
    description: 'Analyse le projet sous l\'angle de la sécurité, implémente les mécanismes d\'authentification JWT/OAuth, CORS et prévient les failles OWASP.',
    responsibilities: [
      'Audit de sécurité des endpoints et du code',
      'Configuration de l\'authentification & des autorisations RBAC',
      'Règles de chiffrement et protection des données sensibles',
      'Politiques CORS, Rate Limiting et sanitisation'
    ],
    capabilities: ['OWASP Audit', 'RBAC & Auth Policy', 'Data Encryption', 'Rate Limiting']
  },
  {
    id: 'tester',
    name: 'Tester AI',
    role: 'Ingénieur QA & Automatisation',
    badge: 'QA / TEST',
    color: '#06b6d4', // Cyan
    avatarBg: 'bg-cyan-600/20 text-cyan-400 border-cyan-500/30',
    iconName: 'TestTube',
    description: 'Écrit les jeux de tests unitaires, d\'intégration et d\'acceptation. Vérifie les cas limites et s\'assure du comportement irréprochable du logiciel.',
    responsibilities: [
      'Rédaction des suites de tests unitaires (Vitest / Jest)',
      'Scénarios de tests d\'intégration API',
      'Validation des cas limites et gestion des erreurs',
      'Génération de données de simulation (Mock Data)'
    ],
    capabilities: ['Unit Testing', 'Integration Specs', 'Edge-Case Checking', 'Mock Datasets']
  },
  {
    id: 'workflow',
    name: 'Workflow Manager',
    role: 'Gestionnaire de Pipeline & Progrès',
    badge: 'ORCHESTRATOR',
    color: '#6366f1', // Indigo
    avatarBg: 'bg-indigo-600/20 text-indigo-400 border-indigo-500/30',
    iconName: 'Kanban',
    description: 'Supervise le déroulement étape par étape du projet, gère la séquence des tâches, calcule le pourcentage d\'avancement et résout les blocages.',
    responsibilities: [
      'Orchestration séquentielle du pipeline de production',
      'Suivi en temps réel de la progression des tâches',
      'Détection des dépendances et goulots d\'étranglement',
      'Relance dynamique d\'agents en cas de modification'
    ],
    capabilities: ['Pipeline Tracking', 'Task Scheduling', 'Progress Calculation', 'Dependency Management']
  },
  {
    id: 'memory',
    name: 'AI Memory',
    role: 'Base de Connaissances & Contexte',
    badge: 'MEMORY',
    color: '#14b8a6', // Teal
    avatarBg: 'bg-teal-600/20 text-teal-400 border-teal-500/30',
    iconName: 'BrainCircuit',
    description: 'Conserve tout le contexte du projet, enregistre les décisions techniques prises et garantit que chaque agent a accès à l\'historique le plus récent.',
    responsibilities: [
      'Stockage persistant du contexte et des choix techniques',
      'Synchronisation des connaissances entre tous les agents',
      'Indexation de l\'historique des échanges et du code',
      'Rappel rapide des dépendances et variables clés'
    ],
    capabilities: ['Context Retention', 'Knowledge Graph', 'Decision Registry', 'Prompt History']
  }
];
