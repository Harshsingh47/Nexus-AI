/**
 * NexusMind Shared Type Definitions & Zod Schemas
 */
export declare enum LLMProvider {
    OPENAI = "OPENAI",
    ANTHROPIC = "ANTHROPIC",
    GOOGLE_GEMINI = "GOOGLE_GEMINI",
    GROQ = "GROQ",
    MISTRAL = "MISTRAL",
    COHERE = "COHERE",
    XAI = "XAI",
    AZURE_OPENAI = "AZURE_OPENAI",
    OPENROUTER = "OPENROUTER",
    OLLAMA = "OLLAMA",
    LM_STUDIO = "LM_STUDIO",
    LOCAL = "LOCAL"
}
export declare enum UserRole {
    SUPER_ADMIN = "SUPER_ADMIN",
    ORG_ADMIN = "ORG_ADMIN",
    DEVELOPER = "DEVELOPER",
    MEMBER = "MEMBER",
    VIEWER = "VIEWER"
}
export declare enum SubscriptionPlanTier {
    FREE = "FREE",
    WEEKLY = "WEEKLY",
    MONTHLY = "MONTHLY",
    YEARLY = "YEARLY",
    ENTERPRISE = "ENTERPRISE"
}
export interface SubscriptionConfig {
    tier: SubscriptionPlanTier;
    name: string;
    price: number;
    billingCycle: 'daily' | 'weekly' | 'monthly' | 'yearly';
    creditsAllocated: number;
    dailyFreeCreditRefresh: number;
    features: string[];
}
export declare const SUBSCRIPTION_TIERS_CONFIG: Record<SubscriptionPlanTier, SubscriptionConfig>;
export declare enum WorkflowNodeType {
    TRIGGER = "TRIGGER",
    PROMPT = "PROMPT",
    LLM = "LLM",
    DECISION = "DECISION",
    CONDITION = "CONDITION",
    LOOP = "LOOP",
    SWITCH = "SWITCH",
    PARALLEL = "PARALLEL",
    MERGE = "MERGE",
    MEMORY = "MEMORY",
    API_CALL = "API_CALL",
    DATABASE = "DATABASE",
    BROWSER = "BROWSER",
    COMPUTER_USE = "COMPUTER_USE",
    PYTHON = "PYTHON",
    JAVASCRIPT = "JAVASCRIPT",
    SHELL = "SHELL",
    SQL = "SQL",
    OCR = "OCR",
    VISION = "VISION",
    SPEECH = "SPEECH",
    IMAGE_GEN = "IMAGE_GEN",
    VECTOR_SEARCH = "VECTOR_SEARCH",
    RAG = "RAG",
    WAIT = "WAIT",
    DELAY = "DELAY",
    RETRY = "RETRY",
    ERROR_HANDLER = "ERROR_HANDLER",
    HUMAN_APPROVAL = "HUMAN_APPROVAL",
    NOTIFICATION = "NOTIFICATION",
    SCHEDULER = "SCHEDULER",
    WEBHOOK = "WEBHOOK",
    END = "END"
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
    position: {
        x: number;
        y: number;
    };
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
export declare enum AgentRoleType {
    MANAGER = "MANAGER",
    RESEARCHER = "RESEARCHER",
    DEVELOPER = "DEVELOPER",
    QA = "QA",
    DESIGNER = "DESIGNER",
    MARKETING = "MARKETING",
    SALES = "SALES",
    FINANCE = "FINANCE",
    SUPPORT = "SUPPORT",
    HR = "HR",
    LEGAL = "LEGAL",
    DATA_ANALYST = "DATA_ANALYST",
    SECURITY = "SECURITY",
    DEVOPS = "DEVOPS",
    DOCUMENTATION = "DOCUMENTATION"
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
