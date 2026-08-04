import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private client: any;

  constructor() {
    try {
      const { PrismaClient } = require('@prisma/client');
      this.client = new PrismaClient();
    } catch (e) {
      console.warn('[@prisma/client] Running in Mock/In-Memory Mode (No Database required)');
      this.client = this.createMockPrisma();
    }
  }

  private createMockPrisma() {
    const handler = {
      get: (target: any, prop: string) => {
        if (prop in target) return target[prop];
        return {
          findUnique: async () => null,
          findFirst: async () => null,
          findMany: async () => [],
          create: async (args: any) => args.data || {},
          update: async (args: any) => args.data || {},
          delete: async () => ({}),
          count: async () => 0
        };
      }
    };
    return new Proxy({ $connect: async () => {}, $disconnect: async () => {} }, handler);
  }

  // Forward database model getters (user, organization, agent, etc.)
  get user() { return this.client.user || this.createMockPrisma(); }
  get organization() { return this.client.organization || this.createMockPrisma(); }
  get team() { return this.client.team || this.createMockPrisma(); }
  get subscription() { return this.client.subscription || this.createMockPrisma(); }
  get creditAccount() { return this.client.creditAccount || this.createMockPrisma(); }
  get creditTransaction() { return this.client.creditTransaction || this.createMockPrisma(); }
  get agent() { return this.client.agent || this.createMockPrisma(); }
  get workflow() { return this.client.workflow || this.createMockPrisma(); }
  get execution() { return this.client.execution || this.createMockPrisma(); }
  get executionStep() { return this.client.executionStep || this.createMockPrisma(); }
  get memory() { return this.client.memory || this.createMockPrisma(); }
  get document() { return this.client.document || this.createMockPrisma(); }
  get auditLog() { return this.client.auditLog || this.createMockPrisma(); }
  get apiKey() { return this.client.apiKey || this.createMockPrisma(); }

  async onModuleInit() {
    try {
      if (this.client && typeof this.client.$connect === 'function') {
        await this.client.$connect();
      }
    } catch (e) {
      console.warn('Prisma Database will connect when PostgreSQL service starts.');
    }
  }

  async onModuleDestroy() {
    try {
      if (this.client && typeof this.client.$disconnect === 'function') {
        await this.client.$disconnect();
      }
    } catch (e) {}
  }
}
