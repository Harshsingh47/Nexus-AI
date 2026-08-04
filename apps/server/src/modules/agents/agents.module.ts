import { Module } from '@nestjs/common';
import { AgentsService } from './agents.service';
import { AgentsController } from './agents.controller';
import { PrismaService } from '../../prisma/prisma.service';
import { LLMModule } from '../llm/llm.module';

@Module({
  imports: [LLMModule],
  controllers: [AgentsController],
  providers: [AgentsService, PrismaService],
  exports: [AgentsService]
})
export class AgentsModule {}
