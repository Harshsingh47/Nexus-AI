import { Module } from '@nestjs/common';
import { WorkflowService } from './workflow.service';
import { WorkflowController } from './workflow.controller';
import { PrismaService } from '../../prisma/prisma.service';
import { LLMModule } from '../llm/llm.module';
import { ToolsModule } from '../tools/tools.module';
import { MemoryModule } from '../memory/memory.module';
import { BillingModule } from '../billing/billing.module';
import { ObservabilityModule } from '../observability/observability.module';

@Module({
  imports: [LLMModule, ToolsModule, MemoryModule, BillingModule, ObservabilityModule],
  controllers: [WorkflowController],
  providers: [WorkflowService, PrismaService],
  exports: [WorkflowService]
})
export class WorkflowModule {}
