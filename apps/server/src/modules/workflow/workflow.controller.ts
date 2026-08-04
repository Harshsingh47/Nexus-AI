import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { WorkflowService } from './workflow.service';
import { WorkflowGraph } from '@nexusmind/shared';

@ApiTags('Workflows & Engine')
@Controller('workflows')
export class WorkflowController {
  constructor(private readonly workflowService: WorkflowService) {}

  @Get()
  @ApiOperation({ summary: 'List all workflow graphs' })
  async listWorkflows() {
    return this.workflowService.listWorkflows();
  }

  @Post('save')
  @ApiOperation({ summary: 'Save visual workflow graph' })
  async saveWorkflow(@Body() body: { id?: string; name: string; description?: string; graph: WorkflowGraph }) {
    return this.workflowService.saveWorkflow(body.id || null, body.name, body.graph, body.description);
  }

  @Post(':id/execute')
  @ApiOperation({ summary: 'Trigger autonomous execution of a workflow' })
  async executeWorkflow(@Param('id') id: string, @Body() body: { inputData?: Record<string, any> }) {
    return this.workflowService.executeWorkflow(id, body.inputData || {});
  }
}
