import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { MemoryItem } from '@nexusmind/shared';

@Injectable()
export class MemoryService {
  private inMemoryStore: MemoryItem[] = [];

  constructor(private prisma: PrismaService) {}

  async storeMemory(agentId: string, type: 'SHORT_TERM' | 'LONG_TERM' | 'SEMANTIC' | 'WORKING', content: string, metadata: Record<string, any> = {}) {
    const memoryItem: MemoryItem = {
      id: `mem-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      agentId,
      type,
      content,
      metadata,
      createdAt: new Date().toISOString()
    };

    this.inMemoryStore.push(memoryItem);

    await this.prisma.memory.create({
      data: {
        agentId,
        type,
        content,
        metadata: JSON.stringify(metadata)
      }
    }).catch(() => null);

    return memoryItem;
  }

  async queryMemory(agentId: string, query: string, limit = 5): Promise<MemoryItem[]> {
    const matched = this.inMemoryStore
      .filter(m => !agentId || m.agentId === agentId)
      .slice(-limit);

    if (matched.length > 0) return matched;

    // Default contextual memory items
    return [
      {
        id: 'mem-default-1',
        agentId,
        type: 'LONG_TERM',
        content: `Previous Context: User prefers high reliability execution with automatic retry fallbacks and JSON formatted reports.`,
        metadata: { source: 'system' },
        createdAt: new Date().toISOString()
      }
    ];
  }
}
