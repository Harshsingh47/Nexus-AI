import { AgentsService } from './agents.service';
import { LLMService } from '../llm/llm.service';
import { AgentRoleType } from '@nexusmind/shared';

describe('AgentsService Unit Tests', () => {
  let service: AgentsService;
  let llmService: LLMService;

  beforeEach(() => {
    llmService = new LLMService();
    const mockPrisma: any = {
      agent: { create: jest.fn().mockResolvedValue({}) }
    };
    service = new AgentsService(mockPrisma, llmService);
  });

  it('should list pre-configured enterprise agents', async () => {
    const agents = await service.listAgents();
    expect(agents.length).toBeGreaterThanOrEqual(4);
    expect(agents[0].role).toBe(AgentRoleType.MANAGER);
  });

  it('should create a custom AI agent successfully', async () => {
    const agent = await service.createAgent({
      name: 'Test QA Agent',
      role: AgentRoleType.QA,
      systemPrompt: 'Run unit test suites and verify contract boundaries.'
    });

    expect(agent.id).toBeDefined();
    expect(agent.name).toBe('Test QA Agent');
    expect(agent.role).toBe(AgentRoleType.QA);
  });
});
