"use strict";
/**
 * NexusMind Shared Type Definitions & Zod Schemas
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentRoleType = exports.WorkflowNodeType = exports.SUBSCRIPTION_TIERS_CONFIG = exports.SubscriptionPlanTier = exports.UserRole = exports.LLMProvider = void 0;
var LLMProvider;
(function (LLMProvider) {
    LLMProvider["OPENAI"] = "OPENAI";
    LLMProvider["ANTHROPIC"] = "ANTHROPIC";
    LLMProvider["GOOGLE_GEMINI"] = "GOOGLE_GEMINI";
    LLMProvider["GROQ"] = "GROQ";
    LLMProvider["MISTRAL"] = "MISTRAL";
    LLMProvider["COHERE"] = "COHERE";
    LLMProvider["XAI"] = "XAI";
    LLMProvider["AZURE_OPENAI"] = "AZURE_OPENAI";
    LLMProvider["OPENROUTER"] = "OPENROUTER";
    LLMProvider["OLLAMA"] = "OLLAMA";
    LLMProvider["LM_STUDIO"] = "LM_STUDIO";
    LLMProvider["LOCAL"] = "LOCAL";
})(LLMProvider || (exports.LLMProvider = LLMProvider = {}));
var UserRole;
(function (UserRole) {
    UserRole["SUPER_ADMIN"] = "SUPER_ADMIN";
    UserRole["ORG_ADMIN"] = "ORG_ADMIN";
    UserRole["DEVELOPER"] = "DEVELOPER";
    UserRole["MEMBER"] = "MEMBER";
    UserRole["VIEWER"] = "VIEWER";
})(UserRole || (exports.UserRole = UserRole = {}));
var SubscriptionPlanTier;
(function (SubscriptionPlanTier) {
    SubscriptionPlanTier["FREE"] = "FREE";
    SubscriptionPlanTier["WEEKLY"] = "WEEKLY";
    SubscriptionPlanTier["MONTHLY"] = "MONTHLY";
    SubscriptionPlanTier["YEARLY"] = "YEARLY";
    SubscriptionPlanTier["ENTERPRISE"] = "ENTERPRISE";
})(SubscriptionPlanTier || (exports.SubscriptionPlanTier = SubscriptionPlanTier = {}));
exports.SUBSCRIPTION_TIERS_CONFIG = {
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
var WorkflowNodeType;
(function (WorkflowNodeType) {
    WorkflowNodeType["TRIGGER"] = "TRIGGER";
    WorkflowNodeType["PROMPT"] = "PROMPT";
    WorkflowNodeType["LLM"] = "LLM";
    WorkflowNodeType["DECISION"] = "DECISION";
    WorkflowNodeType["CONDITION"] = "CONDITION";
    WorkflowNodeType["LOOP"] = "LOOP";
    WorkflowNodeType["SWITCH"] = "SWITCH";
    WorkflowNodeType["PARALLEL"] = "PARALLEL";
    WorkflowNodeType["MERGE"] = "MERGE";
    WorkflowNodeType["MEMORY"] = "MEMORY";
    WorkflowNodeType["API_CALL"] = "API_CALL";
    WorkflowNodeType["DATABASE"] = "DATABASE";
    WorkflowNodeType["BROWSER"] = "BROWSER";
    WorkflowNodeType["COMPUTER_USE"] = "COMPUTER_USE";
    WorkflowNodeType["PYTHON"] = "PYTHON";
    WorkflowNodeType["JAVASCRIPT"] = "JAVASCRIPT";
    WorkflowNodeType["SHELL"] = "SHELL";
    WorkflowNodeType["SQL"] = "SQL";
    WorkflowNodeType["OCR"] = "OCR";
    WorkflowNodeType["VISION"] = "VISION";
    WorkflowNodeType["SPEECH"] = "SPEECH";
    WorkflowNodeType["IMAGE_GEN"] = "IMAGE_GEN";
    WorkflowNodeType["VECTOR_SEARCH"] = "VECTOR_SEARCH";
    WorkflowNodeType["RAG"] = "RAG";
    WorkflowNodeType["WAIT"] = "WAIT";
    WorkflowNodeType["DELAY"] = "DELAY";
    WorkflowNodeType["RETRY"] = "RETRY";
    WorkflowNodeType["ERROR_HANDLER"] = "ERROR_HANDLER";
    WorkflowNodeType["HUMAN_APPROVAL"] = "HUMAN_APPROVAL";
    WorkflowNodeType["NOTIFICATION"] = "NOTIFICATION";
    WorkflowNodeType["SCHEDULER"] = "SCHEDULER";
    WorkflowNodeType["WEBHOOK"] = "WEBHOOK";
    WorkflowNodeType["END"] = "END";
})(WorkflowNodeType || (exports.WorkflowNodeType = WorkflowNodeType = {}));
var AgentRoleType;
(function (AgentRoleType) {
    AgentRoleType["MANAGER"] = "MANAGER";
    AgentRoleType["RESEARCHER"] = "RESEARCHER";
    AgentRoleType["DEVELOPER"] = "DEVELOPER";
    AgentRoleType["QA"] = "QA";
    AgentRoleType["DESIGNER"] = "DESIGNER";
    AgentRoleType["MARKETING"] = "MARKETING";
    AgentRoleType["SALES"] = "SALES";
    AgentRoleType["FINANCE"] = "FINANCE";
    AgentRoleType["SUPPORT"] = "SUPPORT";
    AgentRoleType["HR"] = "HR";
    AgentRoleType["LEGAL"] = "LEGAL";
    AgentRoleType["DATA_ANALYST"] = "DATA_ANALYST";
    AgentRoleType["SECURITY"] = "SECURITY";
    AgentRoleType["DEVOPS"] = "DEVOPS";
    AgentRoleType["DOCUMENTATION"] = "DOCUMENTATION";
})(AgentRoleType || (exports.AgentRoleType = AgentRoleType = {}));
