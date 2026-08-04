import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AgentsService } from './agents.service';
import { AgentConfig } from '@nexusmind/shared';

@ApiTags('AI Agents')
@Controller('agents')
export class AgentsController {
  constructor(private readonly agentsService: AgentsService) {}

  @Get()
  @ApiOperation({ summary: 'List all agents' })
  async listAgents() {
    return this.agentsService.listAgents();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get agent configuration by ID' })
  async getAgent(@Param('id') id: string) {
    return this.agentsService.getAgentById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new AI Agent' })
  async createAgent(@Body() body: Partial<AgentConfig>) {
    return this.agentsService.createAgent(body);
  }

  @Post('generate-from-prompt')
  @ApiOperation({ summary: 'Generate an agent autonomously from a natural language prompt' })
  async generateAgentFromPrompt(@Body() body: { prompt: string }) {
    return this.agentsService.generateAgentFromPrompt(body.prompt);
  }
}
