import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { LLMService } from '../llm/llm.service';
import { AgentConfig, AgentRoleType, LLMProvider } from '@nexusmind/shared';

@Injectable()
export class AgentsService {
  private agentCache: AgentConfig[] = [
    {
      id: 'agent-mgr-01',
      name: 'Orchestrator Manager Agent',
      role: AgentRoleType.MANAGER,
      description: 'Decomposes complex requests, plans subtask assignments, coordinates team execution and evaluates quality.',
      systemPrompt: 'You are an elite Enterprise Project Orchestrator Manager. Decompose instructions into subtasks, assign to appropriate specialist agents, and synthesize final delivery.',
      provider: LLMProvider.OPENAI,
      model: 'gpt-4o',
      temperature: 0.2,
      tools: ['WEB_SEARCH', 'API_CALL', 'MEMORY'],
      maxIterations: 15,
      memoryEnabled: true,
      humanApprovalRequired: false
    },
    {
      id: 'agent-dev-02',
      name: 'Full-Stack Developer Agent',
      role: AgentRoleType.DEVELOPER,
      description: 'Autonomous software engineering agent capable of writing TypeScript, React, Python, SQL, unit tests, and debugging code.',
      systemPrompt: 'You are Devin-level Full-Stack Developer Agent. Write production-ready, clean code following SOLID principles, error handling, and unit test suites.',
      provider: LLMProvider.ANTHROPIC,
      model: 'claude-3-5-sonnet',
      temperature: 0.3,
      tools: ['CODE_SANDBOX', 'PLAYWRIGHT_BROWSER', 'SHELL', 'SQL'],
      maxIterations: 20,
      memoryEnabled: true,
      humanApprovalRequired: false
    },
    {
      id: 'agent-res-03',
      name: 'Autonomous Research Specialist',
      role: AgentRoleType.RESEARCHER,
      description: 'Deep web browsing, PDF ingestion, data extraction, hypothesis verification, and executive report synthesis.',
      systemPrompt: 'You are a Senior AI Research Analyst. Browse websites, read documentation & PDFs, synthesize data, and cite authoritative sources.',
      provider: LLMProvider.GOOGLE_GEMINI,
      model: 'gemini-1.5-pro',
      temperature: 0.4,
      tools: ['PLAYWRIGHT_BROWSER', 'VECTOR_RAG', 'WEB_SEARCH'],
      maxIterations: 10,
      memoryEnabled: true,
      humanApprovalRequired: false
    },
    {
      id: 'agent-sec-04',
      name: 'DevSecOps & Security Auditor',
      role: AgentRoleType.SECURITY,
      description: 'Audits code security, checks OWASP vulnerabilities, inspects secrets, verifies RBAC rules and generates SOC2 audit logs.',
      systemPrompt: 'You are a Principal Security Auditor. Analyze code for vulnerabilities, sanitize inputs, enforce AES-256 vault security, and ensure strict compliance.',
      provider: LLMProvider.GROQ,
      model: 'llama-3.1-70b',
      temperature: 0.1,
      tools: ['CODE_SANDBOX', 'SQL', 'SHELL'],
      maxIterations: 10,
      memoryEnabled: true,
      humanApprovalRequired: true
    }
  ];

  constructor(
    private prisma: PrismaService,
    private llmService: LLMService
  ) {}

  async listAgents(): Promise<AgentConfig[]> {
    return this.agentCache;
  }

  async getAgentById(id: string): Promise<AgentConfig> {
    const agent = this.agentCache.find(a => a.id === id);
    if (!agent) {
      throw new BadRequestException(`Agent with ID ${id} not found`);
    }
    return agent;
  }

  async createAgent(config: Partial<AgentConfig>): Promise<AgentConfig> {
    const newAgent: AgentConfig = {
      id: `agent-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: config.name || 'Custom AI Agent',
      role: config.role || 'GENERALIST',
      description: config.description || 'Custom autonomous AI Agent',
      systemPrompt: config.systemPrompt || 'You are an autonomous AI Agent assistant.',
      provider: config.provider || LLMProvider.OPENAI,
      model: config.model || 'gpt-4o',
      temperature: config.temperature ?? 0.7,
      tools: config.tools || ['WEB_SEARCH'],
      maxIterations: config.maxIterations || 10,
      memoryEnabled: config.memoryEnabled ?? true,
      humanApprovalRequired: config.humanApprovalRequired ?? false
    };

    this.agentCache.push(newAgent);

    await this.prisma.agent.create({
      data: {
        id: newAgent.id,
        name: newAgent.name,
        role: newAgent.role,
        description: newAgent.description,
        systemPrompt: newAgent.systemPrompt,
        provider: newAgent.provider,
        model: newAgent.model,
        temperature: newAgent.temperature,
        tools: newAgent.tools,
        maxIterations: newAgent.maxIterations,
        memoryEnabled: newAgent.memoryEnabled,
        humanApprovalRequired: newAgent.humanApprovalRequired,
        userId: 'usr-demo-admin-01'
      }
    }).catch(() => null);

    return newAgent;
  }

  async generateAgentFromPrompt(naturalLanguagePrompt: string): Promise<AgentConfig> {
    const response = await this.llmService.generateCompletion({
      provider: LLMProvider.OPENAI,
      model: 'gpt-4o',
      systemPrompt: 'You are an expert AI Agent Architect. Generate JSON configuration for a new specialized AI agent based on user description.',
      prompt: naturalLanguagePrompt,
      jsonMode: true
    });

    const generated = await this.createAgent({
      name: `Agent: ${naturalLanguagePrompt.substring(0, 30)}...`,
      role: AgentRoleType.DEVELOPER,
      description: naturalLanguagePrompt,
      systemPrompt: `You are an AI Agent configured to fulfill: ${naturalLanguagePrompt}`,
      tools: ['WEB_SEARCH', 'CODE_SANDBOX', 'PLAYWRIGHT_BROWSER']
    });

    return generated;
  }
}
