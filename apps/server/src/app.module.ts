import { Module } from '@nestjs/common';
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
  providers: [PrismaService]
})
export class AppModule {}
