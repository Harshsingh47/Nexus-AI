import { create } from 'zustand';
import { SUBSCRIPTION_TIERS_CONFIG, SubscriptionPlanTier, AgentConfig, RAGDocument } from '@nexusmind/shared';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

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

  // Selected Active Model
  selectedModel: string;
  setSelectedModel: (model: string) => void;

  // Credits & Subscriptions
  credits: number;
  activePlan: SubscriptionPlanTier;
  dailyFreeCredit: number;
  fetchBilling: () => Promise<void>;
  deductCredits: (amount: number) => void;
  setPlan: (plan: SubscriptionPlanTier) => void;

  // Executions telemetry
  totalExecutions: number;

  // Agents
  agents: AgentConfig[];
  fetchAgents: () => Promise<void>;
  addAgent: (agent: AgentConfig) => void;
  deleteAgent: (id: string) => void;

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

const DEFAULT_AGENTS: AgentConfig[] = [
  {
    id: 'agent-101',
    name: 'Orchestrator Manager Agent',
    role: 'ORCHESTRATOR' as any,
    description: 'Decomposes complex natural language prompts into sub-tasks and delegates to specialist workers.',
    systemPrompt: 'You are the Master Orchestrator. Analyze incoming user goals and dispatch tasks.',
    provider: 'OPENAI' as any,
    model: 'gpt-4o',
    temperature: 0.7,
    tools: ['CANVAS_BUILDER', 'DELEGATION'],
    maxIterations: 10,
    memoryEnabled: true,
    humanApprovalRequired: false
  },
  {
    id: 'agent-102',
    name: 'Playwright Browser Scraper Agent',
    role: 'RESEARCHER' as any,
    description: 'Autonomous headless browser worker powered by Playwright to crawl DOM elements and extract web content.',
    systemPrompt: 'Execute web research. Extract structured tabular data from target URLs.',
    provider: 'ANTHROPIC' as any,
    model: 'claude-3-5-sonnet-20240620',
    temperature: 0.3,
    tools: ['PLAYWRIGHT_BROWSER', 'DOM_PARSER'],
    maxIterations: 15,
    memoryEnabled: true,
    humanApprovalRequired: false
  },
  {
    id: 'agent-103',
    name: 'Python Code Sandbox Specialist',
    role: 'DEVELOPER' as any,
    description: 'Executes Python data analysis, transformations, CSV parsing, and mathematical modeling safely in an isolated sandbox.',
    systemPrompt: 'Write clean Python code to execute data analysis.',
    provider: 'GROQ' as any,
    model: 'llama-3.1-70b-versatile',
    temperature: 0.2,
    tools: ['CODE_SANDBOX', 'PYTHON_INTERPRETER'],
    maxIterations: 10,
    memoryEnabled: true,
    humanApprovalRequired: false
  },
  {
    id: 'agent-104',
    name: 'DevSecOps & Compliance Auditor',
    role: 'SECURITY_AUDITOR' as any,
    description: 'Scans workflow step outputs for secret leaks, PII compliance, and cryptographic integrity.',
    systemPrompt: 'Audit code and data outputs for security vulnerabilities and secret leaks.',
    provider: 'OPENAI' as any,
    model: 'gpt-4o',
    temperature: 0.1,
    tools: ['VAULT_CHECKER', 'AUDIT_LOG'],
    maxIterations: 5,
    memoryEnabled: true,
    humanApprovalRequired: false
  }
];

function getStoredItem<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    return fallback;
  }
}

function setStoredItem<T>(key: string, value: T) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {}
}

export const useAppStore = create<AppState>((set, get) => ({
  user: getStoredItem('nexusmind_user', null),
  token: getStoredItem('nexusmind_token', null),

  setUser: (user, token) => {
    set({ user, token: token || null });
    setStoredItem('nexusmind_user', user);
    setStoredItem('nexusmind_token', token || null);
  },

  logout: () => {
    set({ user: null, token: null });
    if (typeof window !== 'undefined') {
      localStorage.removeItem('nexusmind_user');
      localStorage.removeItem('nexusmind_token');
    }
  },

  selectedModel: 'gpt-4o',
  setSelectedModel: (model) => set({ selectedModel: model }),

  credits: getStoredItem('nexusmind_credits', 50),
  activePlan: getStoredItem('nexusmind_plan', SubscriptionPlanTier.FREE),
  dailyFreeCredit: 50,
  totalExecutions: getStoredItem('nexusmind_total_executions', 14),

  fetchBilling: async () => {
    // Retain persisted local credit balance across page refreshes
    const localCredits = getStoredItem('nexusmind_credits', 50);
    const localPlan = getStoredItem('nexusmind_plan', SubscriptionPlanTier.FREE);
    set({ credits: localCredits, activePlan: localPlan });
  },

  deductCredits: (amount: number) => {
    set(state => {
      const newCredits = Math.max(0, state.credits - amount);
      const newExecutions = state.totalExecutions + 1;
      setStoredItem('nexusmind_credits', newCredits);
      setStoredItem('nexusmind_total_executions', newExecutions);
      return { credits: newCredits, totalExecutions: newExecutions };
    });
  },

  setPlan: (plan: SubscriptionPlanTier) => {
    const config = SUBSCRIPTION_TIERS_CONFIG[plan];
    set(state => {
      const newCredits = state.credits + (config ? config.creditsAllocated : 0);
      setStoredItem('nexusmind_credits', newCredits);
      setStoredItem('nexusmind_plan', plan);
      return { activePlan: plan, credits: newCredits };
    });
  },

  agents: getStoredItem('nexusmind_agents', DEFAULT_AGENTS),
  fetchAgents: async () => {
    const localAgents = getStoredItem('nexusmind_agents', DEFAULT_AGENTS);
    set({ agents: localAgents });
  },

  addAgent: (agent: AgentConfig) => {
    set(state => {
      const updated = [...state.agents, agent];
      setStoredItem('nexusmind_agents', updated);
      return { agents: updated };
    });
  },

  deleteAgent: (id: string) => {
    set(state => {
      const updated = state.agents.filter(a => a.id !== id);
      setStoredItem('nexusmind_agents', updated);
      return { agents: updated };
    });
  },

  documents: getStoredItem('nexusmind_documents', []),
  fetchDocuments: async () => {
    const localDocs = getStoredItem('nexusmind_documents', []);
    set({ documents: localDocs });
  },

  addDocument: (doc: RAGDocument) => {
    set(state => {
      const updated = [doc, ...state.documents];
      setStoredItem('nexusmind_documents', updated);
      return { documents: updated };
    });
  },

  logs: [
    {
      stepId: 'step-init-1',
      agentName: 'Playwright Web Scraper',
      action: 'Navigated to target URL',
      reasoning: 'Loaded DOM tree and extracted news items from news.ycombinator.com',
      status: 'SUCCESS',
      tokensUsed: 180,
      durationMs: 240,
      timestamp: new Date(Date.now() - 60000).toLocaleTimeString()
    },
    {
      stepId: 'step-init-2',
      agentName: 'Orchestrator Agent',
      action: 'Vector RAG Chunk Search',
      reasoning: 'Indexed 42 chunks into vector store with 98.4% similarity match score',
      status: 'SUCCESS',
      tokensUsed: 310,
      durationMs: 140,
      timestamp: new Date(Date.now() - 30000).toLocaleTimeString()
    }
  ],
  addLogStep: (step: any) => {
    set(state => {
      const newExecutions = state.totalExecutions + 1;
      setStoredItem('nexusmind_total_executions', newExecutions);
      return { 
        logs: [step, ...state.logs],
        totalExecutions: newExecutions
      };
    });
  },

  searchQuery: '',
  setSearchQuery: (query: string) => set({ searchQuery: query })
}));
