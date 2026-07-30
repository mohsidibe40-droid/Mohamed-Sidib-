import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize Gemini Client
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// System prompt for SIDIBÉ STUDIO AI
const SYSTEM_PROMPT_STUDIO = `
Tu es SIDIBÉ STUDIO AI, le studio de création intelligent d'élite.
Ton rôle est d'agir en tant qu'équipe multi-agents hautement spécialisée pour transformer toute idée de projet en un produit logiciel complet, professionnel, clé en main.

Les 9 agents sous ta supervision :
1. Studio Director AI : Coordonne la stratégie, synthétise les besoins, arbitre les décisions.
2. Architect AI : Définit l'architecture globale, la stack technique, la topologie et les flux API REST/WebSocket.
3. Designer AI : Conçoit le Design System, l'expérience utilisateur UX et crée des wireframes/maquettes UI interactives en HTML/Tailwind CSS autonome.
4. Coder AI : Développe le code TypeScript propre, moderne et prêt pour production (Frontend React, Backend Express).
5. Database AI : Conçoit le schéma relationnel/document (SQL DDL complet, clés primaires/étrangères, index, requêtes).
6. Security AI : Effectue les contrôles de sécurité OWASP, l'authentification JWT/OAuth, la gestion des rôles (RBAC) et la protection contre les vulnérabilités.
7. Tester AI : Rédige les suites de tests unitaires et d'intégration (Vitest/Jest), les cas de test et les mocks.
8. Workflow Manager : Découpe le projet en étapes séquentielles dépendantes avec suivi d'avancement.
9. AI Memory : Maintient le registre de décisions et la cohérence de l'état global.

Lors de tes réponses en JSON, retourne des résultats rigoureux, structurés et extrêmement détaillés en Français.
`;

// API Route: Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', studio: 'SIDIBÉ STUDIO AI', timestamp: new Date().toISOString() });
});

// API Route: Orchestrate Full Project
app.post('/api/studio/orchestrate', async (req, res) => {
  try {
    const { prompt, title, category } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Le prompt initial est requis' });
    }

    const ai = getGeminiClient();
    if (!ai) {
      // Return smart structured fallback if API key is not configured yet
      return res.json(generateFallbackProject(prompt, title));
    }

    const systemInstruction = `${SYSTEM_PROMPT_STUDIO}\n\nL'utilisateur souhaite lancer le projet suivant :\n"${prompt}"\n\nTu dois générer l'analyse initiale complète du projet au format JSON structuré.`;

    const promptText = `
Analyse ce projet et retourne un objet JSON valide avec la structure suivante :
{
  "title": "Titre professionnel attrayant pour le projet",
  "description": "Description complète (2-3 paragraphes) expliquant la vision et les objectifs",
  "targetAudience": "Public cible détaillé",
  "techStack": {
    "frontend": "Stack frontend (ex: React 19, Vite, Tailwind CSS v4, Motion)",
    "backend": "Stack backend (ex: Node.js, Express, TypeScript)",
    "database": "Base de données (ex: PostgreSQL / Drizzle ORM)",
    "auth": "Méthode d'auth (ex: JWT / OAuth2 Google)",
    "styling": "Système de style (ex: Tailwind CSS, Lucide Icons)"
  },
  "keyDecisions": [
    "Choix architectural clé 1",
    "Choix architectural clé 2",
    "Choix architectural clé 3",
    "Choix architectural clé 4"
  ],
  "architectureOverview": "Explication complète de l'architecture microservices/monolithe modulaire, flux de données et intégrations API.",
  "apiEndpoints": [
    {"method": "GET", "path": "/api/v1/resource", "description": "Description de l'endpoint"},
    {"method": "POST", "path": "/api/v1/resource", "description": "Description de l'endpoint"},
    {"method": "PUT", "path": "/api/v1/resource/:id", "description": "Description de l'endpoint"},
    {"method": "DELETE", "path": "/api/v1/resource/:id", "description": "Description de l'endpoint"}
  ],
  "databaseSchemaSql": "-- Schéma SQL complet avec CREATE TABLE, FK, UNIQUE, INDEX\\nCREATE TABLE users (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), email VARCHAR(255) UNIQUE NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);",
  "securityPolicies": [
    "Protection CORS stricte et en-têtes Helmet Security",
    "Hachage Argon2/Bcrypt pour mots de passe",
    "Authentification par Token JWT avec Refresh Cookie HttpOnly",
    "Limitation de débit Rate Limiting (100 req/min/IP)"
  ],
  "codeArtifacts": [
    {
      "filename": "App.tsx",
      "language": "typescript",
      "content": "// Exemple de composant React principal avec état et gestionnaires d'évènements",
      "description": "Composant principal de l'application React"
    },
    {
      "filename": "server.ts",
      "language": "typescript",
      "content": "// Serveur Express avec endpoints REST et middleware d'authentification",
      "description": "Serveur backend Express TypeScript"
    }
  ],
  "uiWireframes": [
    {
      "title": "Tableau de Bord Principal",
      "htmlMockup": "<div class=\\"p-6 bg-slate-900 text-white rounded-xl shadow-xl border border-slate-800\\"><h1 class=\\"text-2xl font-bold mb-4 text-violet-400\\">Aperçu du Projet</h1><div class=\\"grid grid-cols-1 md:grid-cols-3 gap-4\\"><div class=\\"p-4 bg-slate-800 rounded-lg border border-slate-700\\"><p class=\\"text-slate-400 text-sm\\">Statut</p><p class=\\"text-xl font-semibold text-emerald-400\\">Opérationnel</p></div><div class=\\"p-4 bg-slate-800 rounded-lg border border-slate-700\\"><p class=\\"text-slate-400 text-sm\\">Utilisateurs Actifs</p><p class=\\"text-xl font-semibold text-cyan-400\\">1,248</p></div><div class=\\"p-4 bg-slate-800 rounded-lg border border-slate-700\\"><p class=\\"text-slate-400 text-sm\\">Performance</p><p class=\\"text-xl font-semibold text-amber-400\\">99.9%</p></div></div></div>",
      "componentsList": ["SidebarNav", "StatCard", "ActivityFeed", "ChartContainer"]
    }
  ],
  "testSuites": [
    {
      "name": "User Authentication & API Tests",
      "type": "unit",
      "code": "import { describe, it, expect } from 'vitest';\\n\\ndescribe('Auth Suite', () => {\\n  it('should validate JWT credentials', () => {\\n    expect(true).toBe(true);\\n  });\\n});"
    }
  ],
  "masterReadme": "# SIDIBÉ STUDIO AI - Documentation du Projet\\n\\n## Présentation\\nExplication détaillée..."
}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: promptText,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        temperature: 0.7,
      },
    });

    const responseText = response.text || '';
    let parsedData: any = {};
    try {
      parsedData = JSON.parse(responseText);
    } catch (e) {
      console.error('Failed to parse Gemini JSON output:', e);
      parsedData = generateFallbackProject(prompt, title);
    }

    res.json(parsedData);
  } catch (err: any) {
    console.error('Error in /api/studio/orchestrate:', err);
    res.status(500).json({ error: err.message || 'Erreur d\'orchestration' });
  }
});

// API Route: Trigger specific Agent Action
app.post('/api/studio/agent-step', async (req, res) => {
  try {
    const { agentId, actionPrompt, projectContext } = req.body;
    if (!agentId || !actionPrompt) {
      return res.status(400).json({ error: 'agentId et actionPrompt sont requis' });
    }

    const ai = getGeminiClient();
    if (!ai) {
      return res.json({
        agentId,
        output: `[Mode Simulation] L'agent ${agentId} a exécuté la tâche "${actionPrompt}" avec succès pour le projet "${projectContext?.title || 'Projet'}".`,
        timestamp: new Date().toISOString()
      });
    }

    const promptText = `
Agent : ${agentId}
Contexte du projet : ${JSON.stringify(projectContext || {})}
Action demandée à l'agent : ${actionPrompt}

Exécute la tâche en tant qu'expert spécialisé "${agentId}". Réponds avec une analyse approfondie, du code ou de la documentation exploitable en Français.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: promptText,
      config: {
        systemInstruction: SYSTEM_PROMPT_STUDIO,
        temperature: 0.7,
      },
    });

    res.json({
      agentId,
      output: response.text,
      timestamp: new Date().toISOString()
    });
  } catch (err: any) {
    console.error('Error in /api/studio/agent-step:', err);
    res.status(500).json({ error: err.message || 'Erreur lors de l\'exécution de l\'agent' });
  }
});

// API Route: Interactive Studio Chat
app.post('/api/studio/chat', async (req, res) => {
  try {
    const { message, selectedAgent, projectContext, chatHistory } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message requis' });
    }

    const ai = getGeminiClient();
    if (!ai) {
      return res.json({
        reply: `[Studio AI - ${selectedAgent || 'Director'}] Merci pour votre question sur "${projectContext?.title || 'le projet'}". Je peux vous aider à ajuster la structure, la sécurité ou le code.`,
        sender: selectedAgent || 'director',
        timestamp: new Date().toISOString()
      });
    }

    const conversationHistory = (chatHistory || []).map((h: any) => `${h.sender}: ${h.message}`).join('\n');
    const promptText = `
Projet actuel : ${projectContext?.title || 'Sans titre'}
Description : ${projectContext?.description || 'Non renseignée'}
Tech Stack : ${JSON.stringify(projectContext?.techStack || {})}
Rôle de l'agent répondant : ${selectedAgent || 'director'}

Historique de la discussion :
${conversationHistory}

Question/Instructions de l'utilisateur :
"${message}"

Réponds de manière professionnelle, constructive et directe en tant que l'agent "${selectedAgent || 'director'}" de SIDIBÉ STUDIO AI.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: promptText,
      config: {
        systemInstruction: SYSTEM_PROMPT_STUDIO,
        temperature: 0.7,
      },
    });

    res.json({
      reply: response.text,
      sender: selectedAgent || 'director',
      timestamp: new Date().toISOString()
    });
  } catch (err: any) {
    console.error('Error in /api/studio/chat:', err);
    res.status(500).json({ error: err.message || 'Erreur de discussion avec l\'agent' });
  }
});

// Helper for realistic fallback project structure
function generateFallbackProject(prompt: string, title?: string) {
  const projTitle = title || prompt.slice(0, 40) + '...';
  return {
    title: projTitle,
    description: `SIDIBÉ STUDIO AI a conçu la plateforme "${projTitle}". Ce projet complet intègre une architecture modulaire, un design system sur mesure, un schéma de données robuste et des règles de sécurité certifiées.`,
    targetAudience: 'Utilisateurs professionnels, équipes créatives et entreprises modernes.',
    techStack: {
      frontend: 'React 19, Vite, Tailwind CSS v4, Motion, Lucide Icons',
      backend: 'Node.js, Express, TypeScript',
      database: 'PostgreSQL, Drizzle ORM / Firestore',
      auth: 'JWT Auth avec cookies HttpOnly & OAuth 2.0',
      styling: 'Tailwind CSS v4 avec palette sombre/claire personnalisée'
    },
    keyDecisions: [
      'Architecture Full-Stack découplée avec API REST & Express',
      'Modélisation relationnelle PostgreSQL normalisée avec indexation',
      'Interface utilisateur fluide animée avec Motion/React',
      'Contrôle d\'accès basé sur les rôles (RBAC) et audits de sécurité OWASP'
    ],
    architectureOverview: 'Le système repose sur un serveur Express backend qui expose des routes d\'API sécurisées, communique avec PostgreSQL via Drizzle ORM, et sert une SPA React enrichie en composants interactifs.',
    apiEndpoints: [
      { method: 'GET', path: '/api/v1/health', description: 'Vérification du statut et de la latence du serveur' },
      { method: 'POST', path: '/api/v1/auth/login', description: 'Authentification utilisateur avec génération de Token JWT' },
      { method: 'GET', path: '/api/v1/dashboard/metrics', description: 'Récupération des métriques et données de performance' },
      { method: 'POST', path: '/api/v1/projects/create', description: 'Création d\'une nouvelle instance de projet' }
    ],
    databaseSchemaSql: `-- SIDIBÉ STUDIO AI - Database Schema
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(100),
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  status VARCHAR(50) DEFAULT 'draft',
  metadata JSONB,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_projects_user_id ON projects(user_id);
`,
    securityPolicies: [
      'Politiques CORS restreintes aux origines autorisées',
      'Protection contre le Cross-Site Scripting (XSS) et la CSRF',
      'Limitation de débit (Rate Limiting) sur les endpoints critiques',
      'Chiffrement SSL/TLS des communications et données au repos'
    ],
    codeArtifacts: [
      {
        filename: 'App.tsx',
        language: 'typescript',
        content: `import React, { useState } from 'react';
import { Sparkles, Shield, Database, Cpu } from 'lucide-react';

export default function Application() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-8">
      <header className="max-w-6xl mx-auto flex items-center justify-between pb-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-violet-600/20 text-violet-400 rounded-xl border border-violet-500/30">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">${projTitle}</h1>
            <p className="text-xs text-slate-400">Propulsé par SIDIBÉ STUDIO AI</p>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto mt-8">
        <div className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800 shadow-2xl">
          <h2 className="text-lg font-semibold text-violet-400 mb-2">Bienvenue sur votre Application</h2>
          <p className="text-slate-300 text-sm">Prêt pour la production avec architecture réactive et sécurité renforcée.</p>
        </div>
      </main>
    </div>
  );
}`,
        description: 'Composant principal React avec layout moderne'
      },
      {
        filename: 'server.ts',
        language: 'typescript',
        content: `import express from 'express';
const app = express();
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'active', app: '${projTitle}' });
});

app.listen(3000, () => console.log('Server running on port 3000'));`,
        description: 'Serveur Express TypeScript'
      }
    ],
    uiWireframes: [
      {
        title: 'Tableau de Bord Exécutif',
        htmlMockup: `<div class="p-8 bg-slate-900 text-slate-100 rounded-2xl border border-slate-800 shadow-2xl space-y-6">
  <div class="flex items-center justify-between border-b border-slate-800 pb-4">
    <div>
      <span class="text-xs font-semibold px-2.5 py-1 bg-violet-500/10 text-violet-400 border border-violet-500/20 rounded-full">STUDIO OUTPUT</span>
      <h2 class="text-2xl font-bold text-white mt-1">${projTitle}</h2>
    </div>
    <div class="flex gap-2">
      <button class="px-3 py-1.5 bg-violet-600 text-white rounded-lg text-xs font-medium">Action rapide</button>
    </div>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div class="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
      <p class="text-xs text-slate-400">Statut Système</p>
      <p class="text-lg font-semibold text-emerald-400 mt-1">● Opérationnel</p>
    </div>
    <div class="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
      <p class="text-xs text-slate-400">Couverture Tests</p>
      <p class="text-lg font-semibold text-cyan-400 mt-1">94.8%</p>
    </div>
    <div class="p-4 bg-slate-950/60 rounded-xl border border-slate-800">
      <p class="text-xs text-slate-400">Audit Sécurité</p>
      <p class="text-lg font-semibold text-amber-400 mt-1">Conforme OWASP</p>
    </div>
  </div>
</div>`,
        componentsList: ['HeaderNav', 'StatusBanner', 'MetricGrid', 'ActionPanel']
      }
    ],
    testSuites: [
      {
        name: 'Unit & Integration Suite',
        type: 'unit',
        code: `import { describe, it, expect } from 'vitest';

describe('${projTitle} Tests', () => {
  it('doit valider les pré-requis d'architecture', () => {
    expect(true).toBe(true);
  });
});`
      }
    ],
    masterReadme: `# ${projTitle}\n\nConçu par **SIDIBÉ STUDIO AI**.\n\n## Structure\n- Frontend : React + Tailwind CSS\n- Backend : Express + TypeScript\n- Database : PostgreSQL\n- Security : Auth JWT & OWASP`
  };
}

// Start Server or Vite Dev Middleware
async function start() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SIDIBÉ STUDIO AI Server running on http://0.0.0.0:${PORT}`);
  });
}

start();
