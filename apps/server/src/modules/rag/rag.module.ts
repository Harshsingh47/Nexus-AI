import { Module } from '@nestjs/common';
import { RAGService } from './rag.service';
import { RAGController } from './rag.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [RAGController],
  providers: [RAGService, PrismaService],
  exports: [RAGService]
})
export class RAGModule {}
