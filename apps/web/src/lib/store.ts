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

  selectedModel: 'gpt-4o',
  setSelectedModel: (model) => set({ selectedModel: model }),

  credits: 50,
  activePlan: SubscriptionPlanTier.FREE,
  dailyFreeCredit: 50,
  totalExecutions: 14,

  fetchBilling: async () => {
    try {
      const res = await fetch(`${API_BASE}/billing/balance`);
      const data = await res.json();
      if (data && typeof data.balance === 'number') {
        set({
          credits: data.balance,
          activePlan: data.activePlan || SubscriptionPlanTier.FREE,
          dailyFreeCredit: data.dailyFreeCredit || 50
        });
      }
    } catch (e) {
      // Standalone mode fallback
    }
  },

  deductCredits: (amount: number) => {
    set(state => ({ 
      credits: Math.max(0, state.credits - amount),
      totalExecutions: state.totalExecutions + 1
    }));
  },

  setPlan: (plan: SubscriptionPlanTier) => {
    const config = SUBSCRIPTION_TIERS_CONFIG[plan];
    set(state => ({
      activePlan: plan,
      credits: state.credits + (config ? config.creditsAllocated : 0)
    }));
  },

  agents: DEFAULT_AGENTS,
  fetchAgents: async () => {
    try {
      const res = await fetch(`${API_BASE}/agents`);
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        set({ agents: data });
      }
    } catch (e) {
      // Use default agents
    }
  },

  addAgent: (agent: AgentConfig) => {
    set(state => ({ agents: [...state.agents, agent] }));
  },

  deleteAgent: (id: string) => {
    set(state => ({ agents: state.agents.filter(a => a.id !== id) }));
  },

  documents: [],
  fetchDocuments: async () => {
    try {
      const res = await fetch(`${API_BASE}/rag/documents`);
      const data = await res.json();
      if (Array.isArray(data)) {
        set({ documents: data });
      }
    } catch (e) {
      // Default empty or mock docs
    }
  },

  addDocument: (doc: RAGDocument) => {
    set(state => ({ documents: [...state.documents, doc] }));
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
    set(state => ({ 
      logs: [step, ...state.logs],
      totalExecutions: state.totalExecutions + 1
    }));
  },

  searchQuery: '',
  setSearchQuery: (query: string) => set({ searchQuery: query })
}));
