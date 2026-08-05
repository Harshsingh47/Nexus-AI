/**
 * NexusMind Shared Type Definitions & Zod Schemas
 */

export enum LLMProvider {
  OPENAI = 'OPENAI',
  ANTHROPIC = 'ANTHROPIC',
  GOOGLE_GEMINI = 'GOOGLE_GEMINI',
  GROQ = 'GROQ',
  MISTRAL = 'MISTRAL',
  COHERE = 'COHERE',
  XAI = 'XAI',
  AZURE_OPENAI = 'AZURE_OPENAI',
  OPENROUTER = 'OPENROUTER',
  OLLAMA = 'OLLAMA',
  LM_STUDIO = 'LM_STUDIO',
  LOCAL = 'LOCAL'
}

export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ORG_ADMIN = 'ORG_ADMIN',
  DEVELOPER = 'DEVELOPER',
  MEMBER = 'MEMBER',
  VIEWER = 'VIEWER'
}

export enum SubscriptionPlanTier {
  FREE = 'FREE',
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  YEARLY = 'YEARLY',
  ENTERPRISE = 'ENTERPRISE'
}

export interface SubscriptionConfig {
  tier: SubscriptionPlanTier;
  name: string;
  price: number; // in USD
  billingCycle: 'daily' | 'weekly' | 'monthly' | 'yearly';
  creditsAllocated: number;
  dailyFreeCreditRefresh: number;
  features: string[];
}

export const SUBSCRIPTION_TIERS_CONFIG: Record<SubscriptionPlanTier, SubscriptionConfig> = {
  [SubscriptionPlanTier.FREE]: {
    tier: SubscriptionPlanTier.FREE,
    name: 'Free Starter',
    price: 0,
    billingCycle: 'daily',
    creditsAllocated: 50,
    dailyFreeCreditRefresh: 50,
    features: ['50 Daily Refreshed Credits', 'Basic Single Agent Workflows', 'Community Support', 'Shared Memory Storage']
  },
  [SubscriptionPlanTier.WEEKLY]: {
    tier: SubscriptionPlanTier.WEEKLY,
    name: 'Pro Weekly',
    price: 9,
    billingCycle: 'weekly',
    creditsAllocated: 500,
    dailyFreeCreditRefresh: 50,
    features: ['500 Credits/Week', 'Multi-Agent Collaboration', 'Playwright Browser Automation', 'Priority Execution Queue']
  },
  [SubscriptionPlanTier.MONTHLY]: {
    tier: SubscriptionPlanTier.MONTHLY,
    name: 'Pro Monthly',
    price: 29,
    billingCycle: 'monthly',
    creditsAllocated: 2500,
    dailyFreeCreditRefresh: 100,
    features: ['2,500 Credits/Month', 'Full RAG Knowledge Base', 'Code Sandbox Execution', 'Webhooks & Custom API Tools']
  },
  [SubscriptionPlanTier.YEARLY]: {
    tier: SubscriptionPlanTier.YEARLY,
    name: 'Pro Annual',
    price: 249,
    billingCycle: 'yearly',
    creditsAllocated: 35000,
    dailyFreeCreditRefresh: 200,
    features: ['35,000 Credits/Year (~30% Savings)', 'Unlimited Agents & Teams', 'Computer Use Simulation', '24/7 Dedicated Priority Support']
  },
  [SubscriptionPlanTier.ENTERPRISE]: {
    tier: SubscriptionPlanTier.ENTERPRISE,
    name: 'Enterprise Ultra',
    price: 999,
    billingCycle: 'monthly',
    creditsAllocated: 150000,
    dailyFreeCreditRefresh: 1000,
    features: ['Custom Volume Credits', 'Dedicated Worker Nodes', 'SSO / SAML / Custom Vault', 'Dedicated Enterprise Support & 99.9% Uptime']
  }
};

export enum WorkflowNodeType {
  TRIGGER = 'TRIGGER',
  PROMPT = 'PROMPT',
  LLM = 'LLM',
  DECISION = 'DECISION',
  CONDITION = 'CONDITION',
  LOOP = 'LOOP',
  SWITCH = 'SWITCH',
  PARALLEL = 'PARALLEL',
  MERGE = 'MERGE',
  MEMORY = 'MEMORY',
  API_CALL = 'API_CALL',
  DATABASE = 'DATABASE',
  BROWSER = 'BROWSER',
  COMPUTER_USE = 'COMPUTER_USE',
  PYTHON = 'PYTHON',
  JAVASCRIPT = 'JAVASCRIPT',
  SHELL = 'SHELL',
  SQL = 'SQL',
  OCR = 'OCR',
  VISION = 'VISION',
  SPEECH = 'SPEECH',
  IMAGE_GEN = 'IMAGE_GEN',
  VECTOR_SEARCH = 'VECTOR_SEARCH',
  RAG = 'RAG',
  WAIT = 'WAIT',
  DELAY = 'DELAY',
  RETRY = 'RETRY',
  ERROR_HANDLER = 'ERROR_HANDLER',
  HUMAN_APPROVAL = 'HUMAN_APPROVAL',
  NOTIFICATION = 'NOTIFICATION',
  SCHEDULER = 'SCHEDULER',
  WEBHOOK = 'WEBHOOK',
  END = 'END'
}

export interface WorkflowNodeData {
  label: string;
  type: WorkflowNodeType;
  config: Record<string, any>;
  agentId?: string;
  model?: string;
  provider?: LLMProvider;
}

export interface WorkflowNode {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: WorkflowNodeData;
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  condition?: string;
}

export interface WorkflowGraph {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
}

export enum AgentRoleType {
  MANAGER = 'MANAGER',
  RESEARCHER = 'RESEARCHER',
  DEVELOPER = 'DEVELOPER',
  QA = 'QA',
  DESIGNER = 'DESIGNER',
  MARKETING = 'MARKETING',
  SALES = 'SALES',
  FINANCE = 'FINANCE',
  SUPPORT = 'SUPPORT',
  HR = 'HR',
  LEGAL = 'LEGAL',
  DATA_ANALYST = 'DATA_ANALYST',
  SECURITY = 'SECURITY',
  DEVOPS = 'DEVOPS',
  DOCUMENTATION = 'DOCUMENTATION'
}

export interface AgentConfig {
  id: string;
  name: string;
  role: AgentRoleType | string;
  description: string;
  systemPrompt: string;
  provider: LLMProvider;
  model: string;
  temperature: number;
  tools: string[];
  maxIterations: number;
  memoryEnabled: boolean;
  humanApprovalRequired: boolean;
}

export interface AgentExecutionStep {
  stepId: string;
  timestamp: string;
  agentId: string;
  agentName: string;
  nodeId?: string;
  action: string;
  input: any;
  output: any;
  reasoning: string;
  status: 'PENDING' | 'RUNNING' | 'SUCCESS' | 'FAILED' | 'AWAITING_APPROVAL';
  tokensUsed?: number;
  creditsConsumed?: number;
  durationMs?: number;
}

export interface MemoryItem {
  id: string;
  agentId?: string;
  userId?: string;
  orgId?: string;
  type: 'SHORT_TERM' | 'LONG_TERM' | 'SEMANTIC' | 'WORKING' | 'KNOWLEDGE_GRAPH';
  content: string;
  metadata: Record<string, any>;
  embedding?: number[];
  createdAt: string;
  expiresAt?: string;
}

export interface RAGDocument {
  id: string;
  name: string;
  fileType: string;
  sizeBytes: number;
  chunkCount: number;
  vectorDbStatus: 'INDEXING' | 'READY' | 'FAILED';
  createdAt: string;
  metadata: Record<string, any>;
}
