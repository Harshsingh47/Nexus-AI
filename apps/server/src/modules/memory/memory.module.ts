import { Module } from '@nestjs/common';
import { MemoryService } from './memory.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  providers: [MemoryService, PrismaService],
  exports: [MemoryService]
})
export class MemoryModule {}
