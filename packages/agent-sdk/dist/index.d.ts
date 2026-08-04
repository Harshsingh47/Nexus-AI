import { AgentConfig, LLMProvider, WorkflowGraph, WorkflowNodeType } from '@nexusmind/shared';
export interface NexusMindSDKOptions {
    apiKey: string;
    baseUrl?: string;
}
export declare class AgentBuilder {
    private config;
    constructor(name: string);
    setRole(role: string): this;
    setDescription(desc: string): this;
    setSystemPrompt(prompt: string): this;
    setLLM(provider: LLMProvider, model: string): this;
    addTool(toolName: string): this;
    requireHumanApproval(required?: boolean): this;
    build(): AgentConfig;
}
export declare class WorkflowBuilder {
    private nodes;
    private edges;
    addNode(id: string, type: WorkflowNodeType, label: string, config?: Record<string, any>, position?: {
        x: number;
        y: number;
    }): this;
    connect(source: string, target: string, label?: string, condition?: string): this;
    build(): WorkflowGraph;
}
export declare class NexusMindClient {
    private apiKey;
    private baseUrl;
    constructor(options: NexusMindSDKOptions);
    runWorkflow(workflowGraph: WorkflowGraph, inputData: Record<string, any>): Promise<{
        executionId: string;
        status: string;
        inputData: Record<string, any>;
        graph: WorkflowGraph;
    }>;
}
