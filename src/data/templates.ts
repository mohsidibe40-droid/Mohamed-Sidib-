import { QuickTemplate } from '../types';

export const QUICK_TEMPLATES: QuickTemplate[] = [
  {
    id: 'saas-analytics',
    title: 'Plateforme AI Analytics SaaS',
    category: 'SaaS / AI',
    tagline: 'Tableau de bord de suivi avec prédictions de vente IA',
    description: 'Une application web complète comprenant authentification, gestion des métriques en temps réel, alertes intelligentes et exports PDF.',
    prompt: 'Crée un projet complet de plateforme SaaS d\'Analytics avec IA. L\'application doit permettre de suivre les revenus mensuels, le taux d\'attrition (churn), le NPS, de prédire le chiffre d\'affaires à 3 mois avec l\'IA, de gérer des comptes utilisateurs et d\'exporter des rapports financiers.',
    icon: 'BarChart3'
  },
  {
    id: 'health-fitness',
    title: 'App de Coaching Santé & Fitness',
    category: 'Santé & Wellness',
    tagline: 'Suivi de nutrition, programmes de sport et recommandations IA',
    description: 'Solution complète pour coachs et athlètes : plans de repas sur mesure, suivi des calories, génération d\'entraînements dynamiques.',
    prompt: 'Développe une application complète de coaching fitness et nutritionnel. Elle doit comprendre un générateur de programmes de musculation sur mesure, un calculateur de macros nutriments, un journal de bord avec photos d\'évolution et un chatbot coach sportif intelligent.',
    icon: 'Activity'
  },
  {
    id: 'marketplace-art',
    title: 'Marketplace E-Commerce d\'Art',
    category: 'E-Commerce / Créateurs',
    tagline: 'Vente d\'œuvres numériques et physiques avec paiements Stripe',
    description: 'Plateforme de vente d\'artisanat et d\'art numérique avec profils artistes, paniers interactifs, enchères en direct et paiement sécurisé.',
    prompt: 'Conçois une marketplace e-commerce moderne dédiée aux artistes indépendants. Fonctionnalités requises : galerie d\'art interactive, système de panier et checkout sécurisé, profil artiste certifié, enchères en temps réel et tableau de bord des commandes.',
    icon: 'ShoppingBag'
  },
  {
    id: 'devops-monitor',
    title: 'Studio DevOps & Incident Manager',
    category: 'DevOps / Cloud',
    tagline: 'Supervision de microservices, logs en direct et alertes Pager',
    description: 'Centre de contrôle pour développeurs et équipes infrastructure avec statuts d\'API, détection d\'anomalies et gestion des astreintes.',
    prompt: 'Crée une application de monitoring DevOps et gestion d\'incidents Cloud. Inclut un tableau de bord de santé des serveurs en direct, la détection automatique d\'anomalies dans les logs, un système d\'escalade des alertes et des métriques de latence.',
    icon: 'Terminal'
  }
];
