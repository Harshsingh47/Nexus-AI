"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NexusMindClient = exports.WorkflowBuilder = exports.AgentBuilder = void 0;
const shared_1 = require("@nexusmind/shared");
class AgentBuilder {
    config = {
        temperature: 0.7,
        maxIterations: 10,
        memoryEnabled: true,
        humanApprovalRequired: false,
        tools: []
    };
    constructor(name) {
        this.config.name = name;
    }
    setRole(role) {
        this.config.role = role;
        return this;
    }
    setDescription(desc) {
        this.config.description = desc;
        return this;
    }
    setSystemPrompt(prompt) {
        this.config.systemPrompt = prompt;
        return this;
    }
    setLLM(provider, model) {
        this.config.provider = provider;
        this.config.model = model;
        return this;
    }
    addTool(toolName) {
        this.config.tools = [...(this.config.tools || []), toolName];
        return this;
    }
    requireHumanApproval(required = true) {
        this.config.humanApprovalRequired = required;
        return this;
    }
    build() {
        if (!this.config.name || !this.config.systemPrompt) {
            throw new Error('Agent requires a name and systemPrompt');
        }
        return {
            id: `agent-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
            name: this.config.name,
            role: this.config.role || 'GENERALIST',
            description: this.config.description || '',
            systemPrompt: this.config.systemPrompt,
            provider: this.config.provider || shared_1.LLMProvider.OPENAI,
            model: this.config.model || 'gpt-4o',
            temperature: this.config.temperature ?? 0.7,
            tools: this.config.tools || [],
            maxIterations: this.config.maxIterations || 10,
            memoryEnabled: this.config.memoryEnabled ?? true,
            humanApprovalRequired: this.config.humanApprovalRequired ?? false
        };
    }
}
exports.AgentBuilder = AgentBuilder;
class WorkflowBuilder {
    nodes = [];
    edges = [];
    addNode(id, type, label, config = {}, position = { x: 100, y: 100 }) {
        this.nodes.push({
            id,
            type: type.toLowerCase(),
            position,
            data: { label, type, config }
        });
        return this;
    }
    connect(source, target, label, condition) {
        this.edges.push({
            id: `e-${source}-${target}`,
            source,
            target,
            label,
            condition
        });
        return this;
    }
    build() {
        return {
            nodes: this.nodes,
            edges: this.edges
        };
    }
}
exports.WorkflowBuilder = WorkflowBuilder;
class NexusMindClient {
    apiKey;
    baseUrl;
    constructor(options) {
        this.apiKey = options.apiKey;
        this.baseUrl = options.baseUrl || 'http://localhost:4000/api';
    }
    async runWorkflow(workflowGraph, inputData) {
        // SDK client implementation for API trigger
        return {
            executionId: `exec-${Date.now()}`,
            status: 'STARTED',
            inputData,
            graph: workflowGraph
        };
    }
}
exports.NexusMindClient = NexusMindClient;
