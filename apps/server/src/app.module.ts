import { Module, Controller, Get } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { BillingModule } from './modules/billing/billing.module';
import { LLMModule } from './modules/llm/llm.module';
import { ToolsModule } from './modules/tools/tools.module';
import { MemoryModule } from './modules/memory/memory.module';
import { RAGModule } from './modules/rag/rag.module';
import { AgentsModule } from './modules/agents/agents.module';
import { WorkflowModule } from './modules/workflow/workflow.module';
import { ObservabilityModule } from './modules/observability/observability.module';
import { MarketplaceModule } from './modules/marketplace/marketplace.module';
import { PrismaService } from './prisma/prisma.service';

@Controller()
export class AppController {
  @Get()
  getHealth() {
    return {
      status: 'ONLINE',
      platform: 'NexusMind Enterprise Autonomous AI Agent Server',
      version: '1.0.0',
      documentation: '/api/docs',
      timestamp: new Date().toISOString()
    };
  }
}

@Module({
  imports: [
    AuthModule,
    BillingModule,
    LLMModule,
    ToolsModule,
    MemoryModule,
    RAGModule,
    AgentsModule,
    WorkflowModule,
    ObservabilityModule,
    MarketplaceModule
  ],
  controllers: [AppController],
  providers: [PrismaService]
})
export class AppModule {}
