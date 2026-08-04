import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { LLMService } from '../llm/llm.service';
import { ToolsService } from '../tools/tools.service';
import { MemoryService } from '../memory/memory.service';
import { BillingService } from '../billing/billing.service';
import { ObservabilityGateway } from '../observability/observability.gateway';
import { WorkflowGraph, WorkflowNodeType, LLMProvider, AgentExecutionStep } from '@nexusmind/shared';

@Injectable()
export class WorkflowService {
  private workflowCache: Array<{ id: string; name: string; description: string; graph: WorkflowGraph }> = [
    {
      id: 'wf-demo-01',
      name: 'Autonomous Deep Research & Competitor Analysis Workflow',
      description: 'Crawls competitor site, extracts key metrics, analyzes architecture with LLM and generates structured report.',
      graph: {
        nodes: [
          { id: 'node-1', type: 'trigger', position: { x: 50, y: 150 }, data: { label: 'Start Research Trigger', type: WorkflowNodeType.TRIGGER, config: {} } },
          { id: 'node-2', type: 'browser', position: { x: 300, y: 150 }, data: { label: 'Scrape Target Site', type: WorkflowNodeType.BROWSER, config: { url: 'https://news.ycombinator.com', action: 'GOTO' } } },
          { id: 'node-3', type: 'llm', position: { x: 600, y: 150 }, data: { label: 'Analyze scraped data', type: WorkflowNodeType.LLM, config: { provider: LLMProvider.OPENAI, model: 'gpt-4o' } } },
          { id: 'node-4', type: 'memory', position: { x: 900, y: 150 }, data: { label: 'Store in Long-term Memory', type: WorkflowNodeType.MEMORY, config: {} } },
          { id: 'node-5', type: 'end', position: { x: 1150, y: 150 }, data: { label: 'Workflow End', type: WorkflowNodeType.END, config: {} } }
        ],
        edges: [
          { id: 'e1-2', source: 'node-1', target: 'node-2' },
          { id: 'e2-3', source: 'node-2', target: 'node-3' },
          { id: 'e3-4', source: 'node-3', target: 'node-4' },
          { id: 'e4-5', source: 'node-4', target: 'node-5' }
        ]
      }
    }
  ];

  constructor(
    private prisma: PrismaService,
    private llmService: LLMService,
    private toolsService: ToolsService,
    private memoryService: MemoryService,
    private billingService: BillingService,
    private observability: ObservabilityGateway
  ) {}

  async listWorkflows() {
    return this.workflowCache;
  }

  async saveWorkflow(id: string | null, name: string, graph: WorkflowGraph, description = '') {
    const wfId = id || `wf-${Date.now()}`;
    const item = { id: wfId, name, description, graph };

    const idx = this.workflowCache.findIndex(w => w.id === wfId);
    if (idx >= 0) {
      this.workflowCache[idx] = item;
    } else {
      this.workflowCache.push(item);
    }

    await this.prisma.workflow.create({
      data: {
        id: wfId,
        name,
        description,
        graphJson: JSON.stringify(graph),
        userId: 'usr-demo-admin-01'
      }
    }).catch(() => null);

    return item;
  }

  async executeWorkflow(workflowId: string, inputData: Record<string, any> = {}) {
    const userId = 'usr-demo-admin-01';
    const wf = this.workflowCache.find(w => w.id === workflowId);
    const graph = wf ? wf.graph : inputData.graph;

    if (!graph || !graph.nodes || graph.nodes.length === 0) {
      throw new BadRequestException('Invalid workflow graph or non-existent workflow ID');
    }

    // Step 1: Check credit balance (Deduct 2 credits per workflow execution run start)
    await this.billingService.deductCredits(userId, 2, `Workflow Execution: ${wf ? wf.name : 'Custom Graph'}`, `exec-${Date.now()}`);

    const executionId = `exec-${Date.now()}`;
    const steps: AgentExecutionStep[] = [];
    let totalTokens = 0;
    let totalCredits = 2;

    this.observability.emitExecutionStatus(executionId, { executionId, status: 'RUNNING', startedAt: new Date().toISOString() });

    // Step 2: Sequential / Graph Topological execution of nodes
    for (const node of graph.nodes) {
      const nodeType = node.data.type;
      const startTime = Date.now();

      let actionDesc = `Executed node ${node.data.label} (${nodeType})`;
      let nodeOutput: any = { status: 'SUCCESS' };
      let reasoning = `Processing node ${node.id} of type ${nodeType}`;
      let stepTokens = 0;
      let stepCredits = 1;

      if (nodeType === WorkflowNodeType.TRIGGER) {
        reasoning = `Trigger initiated with input context parameters.`;
        nodeOutput = { inputReceived: inputData, timestamp: new Date().toISOString() };
      } else if (nodeType === WorkflowNodeType.BROWSER) {
        reasoning = `Launching Playwright browser engine for page navigation & DOM snapshot.`;
        nodeOutput = await this.toolsService.executeBrowserTask(node.data.config.url || 'https://news.ycombinator.com', 'GOTO');
      } else if (nodeType === WorkflowNodeType.LLM || nodeType === WorkflowNodeType.PROMPT) {
        reasoning = `Formulating multi-modal prompt context and streaming LLM completion.`;
        const res = await this.llmService.generateCompletion({
          provider: node.data.config.provider || LLMProvider.OPENAI,
          model: node.data.config.model || 'gpt-4o',
          systemPrompt: 'You are an autonomous AI Agent execution node.',
          prompt: `Process input: ${JSON.stringify(inputData)}`
        });
        nodeOutput = { response: res.content };
        stepTokens = res.tokensUsed;
        stepCredits = res.creditsConsumed;
      } else if (nodeType === WorkflowNodeType.PYTHON || nodeType === WorkflowNodeType.JAVASCRIPT || nodeType === WorkflowNodeType.SHELL) {
        reasoning = `Executing secure sandboxed script execution (${nodeType}).`;
        nodeOutput = await this.toolsService.executeCodeSandbox(nodeType, node.data.config.code || 'console.log("Execution OK"); return { ok: true };', inputData);
      } else if (nodeType === WorkflowNodeType.MEMORY) {
        reasoning = `Persisting execution state into vector semantic long-term memory.`;
        nodeOutput = await this.memoryService.storeMemory('agent-mgr-01', 'LONG_TERM', `Workflow execution ${executionId} completed node ${node.id}`);
      }

      totalTokens += stepTokens;
      totalCredits += stepCredits;
      const durationMs = Date.now() - startTime;

      const step: AgentExecutionStep = {
        stepId: `step-${Date.now()}-${node.id}`,
        timestamp: new Date().toISOString(),
        agentId: node.data.agentId || 'agent-mgr-01',
        agentName: node.data.label || 'Autonomous Node Agent',
        nodeId: node.id,
        action: actionDesc,
        input: node.data.config,
        output: nodeOutput,
        reasoning,
        status: 'SUCCESS',
        tokensUsed: stepTokens,
        creditsConsumed: stepCredits,
        durationMs
      };

      steps.push(step);
      this.observability.emitExecutionStep(executionId, step);
    }

    this.observability.emitExecutionStatus(executionId, {
      executionId,
      status: 'COMPLETED',
      totalTokens,
      totalCredits,
      stepsCount: steps.length,
      completedAt: new Date().toISOString()
    });

    return {
      executionId,
      status: 'COMPLETED',
      totalTokens,
      totalCreditsConsumed: totalCredits,
      steps
    };
  }
}
