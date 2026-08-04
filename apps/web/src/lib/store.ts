import { create } from 'zustand';
import { SUBSCRIPTION_TIERS_CONFIG, SubscriptionPlanTier, AgentConfig, RAGDocument } from '@nexusmind/shared';

interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  role: string;
  organizationId?: string;
}

interface AppState {
  // User Authentication
  user: UserProfile | null;
  token: string | null;
  setUser: (user: UserProfile | null, token?: string | null) => void;
  logout: () => void;

  // Credits & Subscriptions
  credits: number;
  activePlan: SubscriptionPlanTier;
  dailyFreeCredit: number;
  fetchBilling: () => Promise<void>;
  deductCredits: (amount: number) => void;
  setPlan: (plan: SubscriptionPlanTier) => void;

  // Agents
  agents: AgentConfig[];
  fetchAgents: () => Promise<void>;
  addAgent: (agent: AgentConfig) => void;

  // RAG Documents
  documents: RAGDocument[];
  fetchDocuments: () => Promise<void>;
  addDocument: (doc: RAGDocument) => void;

  // Observability & Telemetry Logs
  logs: any[];
  addLogStep: (step: any) => void;

  // Search filter
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  user: {
    id: 'usr-demo-admin-01',
    email: 'admin@nexusmind.ai',
    fullName: 'Enterprise Admin',
    role: 'ORG_ADMIN'
  },
  token: 'mock-jwt-token-2026',

  setUser: (user, token) => {
    set({ user, token: token || null });
    if (token) {
      localStorage.setItem('nexusmind_token', token);
    } else {
      localStorage.removeItem('nexusmind_token');
    }
  },

  logout: () => {
    set({ user: null, token: null });
    localStorage.removeItem('nexusmind_token');
  },

  credits: 50,
  activePlan: SubscriptionPlanTier.FREE,
  dailyFreeCredit: 50,

  fetchBilling: async () => {
    try {
      const res = await fetch('http://localhost:4000/api/billing/balance');
      const data = await res.json();
      if (data && typeof data.balance === 'number') {
        set({
          credits: data.balance,
          activePlan: data.activePlan || SubscriptionPlanTier.FREE,
          dailyFreeCredit: data.dailyFreeCredit || 50
        });
      }
    } catch (e) {
      // Standalone client fallback mode when server is starting
    }
  },

  deductCredits: (amount: number) => {
    set(state => ({ credits: Math.max(0, state.credits - amount) }));
  },

  setPlan: (plan: SubscriptionPlanTier) => {
    const config = SUBSCRIPTION_TIERS_CONFIG[plan];
    set(state => ({
      activePlan: plan,
      credits: state.credits + (config ? config.creditsAllocated : 0)
    }));
  },

  agents: [],
  fetchAgents: async () => {
    try {
      const res = await fetch('http://localhost:4000/api/agents');
      const data = await res.json();
      if (Array.isArray(data)) {
        set({ agents: data });
      }
    } catch (e) {
      console.warn('Using default agents list');
    }
  },

  addAgent: (agent: AgentConfig) => {
    set(state => ({ agents: [...state.agents, agent] }));
  },

  documents: [],
  fetchDocuments: async () => {
    try {
      const res = await fetch('http://localhost:4000/api/rag/documents');
      const data = await res.json();
      if (Array.isArray(data)) {
        set({ documents: data });
      }
    } catch (e) {
      console.warn('Using default documents list');
    }
  },

  addDocument: (doc: RAGDocument) => {
    set(state => ({ documents: [...state.documents, doc] }));
  },

  logs: [],
  addLogStep: (step: any) => {
    set(state => ({ logs: [step, ...state.logs] }));
  },

  searchQuery: '',
  setSearchQuery: (query: string) => set({ searchQuery: query })
}));
