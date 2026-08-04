import { AgentConfig, LLMProvider, WorkflowGraph, WorkflowNode, WorkflowEdge, WorkflowNodeType } from '@nexusmind/shared';

export interface NexusMindSDKOptions {
  apiKey: string;
  baseUrl?: string;
}

export class AgentBuilder {
  private config: Partial<AgentConfig> = {
    temperature: 0.7,
    maxIterations: 10,
    memoryEnabled: true,
    humanApprovalRequired: false,
    tools: []
  };

  constructor(name: string) {
    this.config.name = name;
  }

  setRole(role: string): this {
    this.config.role = role;
    return this;
  }

  setDescription(desc: string): this {
    this.config.description = desc;
    return this;
  }

  setSystemPrompt(prompt: string): this {
    this.config.systemPrompt = prompt;
    return this;
  }

  setLLM(provider: LLMProvider, model: string): this {
    this.config.provider = provider;
    this.config.model = model;
    return this;
  }

  addTool(toolName: string): this {
    this.config.tools = [...(this.config.tools || []), toolName];
    return this;
  }

  requireHumanApproval(required = true): this {
    this.config.humanApprovalRequired = required;
    return this;
  }

  build(): AgentConfig {
    if (!this.config.name || !this.config.systemPrompt) {
      throw new Error('Agent requires a name and systemPrompt');
    }
    return {
      id: `agent-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      name: this.config.name,
      role: this.config.role || 'GENERALIST',
      description: this.config.description || '',
      systemPrompt: this.config.systemPrompt,
      provider: this.config.provider || LLMProvider.OPENAI,
      model: this.config.model || 'gpt-4o',
      temperature: this.config.temperature ?? 0.7,
      tools: this.config.tools || [],
      maxIterations: this.config.maxIterations || 10,
      memoryEnabled: this.config.memoryEnabled ?? true,
      humanApprovalRequired: this.config.humanApprovalRequired ?? false
    };
  }
}

export class WorkflowBuilder {
  private nodes: WorkflowNode[] = [];
  private edges: WorkflowEdge[] = [];

  addNode(id: string, type: WorkflowNodeType, label: string, config: Record<string, any> = {}, position = { x: 100, y: 100 }): this {
    this.nodes.push({
      id,
      type: type.toLowerCase(),
      position,
      data: { label, type, config }
    });
    return this;
  }

  connect(source: string, target: string, label?: string, condition?: string): this {
    this.edges.push({
      id: `e-${source}-${target}`,
      source,
      target,
      label,
      condition
    });
    return this;
  }

  build(): WorkflowGraph {
    return {
      nodes: this.nodes,
      edges: this.edges
    };
  }
}

export class NexusMindClient {
  private apiKey: string;
  private baseUrl: string;

  constructor(options: NexusMindSDKOptions) {
    this.apiKey = options.apiKey;
    this.baseUrl = options.baseUrl || 'http://localhost:4000/api';
  }

  async runWorkflow(workflowGraph: WorkflowGraph, inputData: Record<string, any>) {
    // SDK client implementation for API trigger
    return {
      executionId: `exec-${Date.now()}`,
      status: 'STARTED',
      inputData,
      graph: workflowGraph
    };
  }
}
