import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private client: any;
  private mockProxyCache: any;

  constructor() {
    try {
      const { PrismaClient } = require('@prisma/client');
      this.client = new PrismaClient();
    } catch (e) {
      console.warn('[@prisma/client] Running in Mock/In-Memory Mode (No Database required)');
      this.mockProxyCache = this.createMockPrisma();
      this.client = this.mockProxyCache;
    }
  }

  private createMockPrisma() {
    const defaultModel = {
      findUnique: async () => null,
      findFirst: async () => null,
      findMany: async () => [],
      create: async (args: any) => args?.data || {},
      update: async (args: any) => args?.data || {},
      delete: async () => ({}),
      count: async () => 0
    };

    const handler = {
      get: (target: any, prop: string) => {
        if (prop in target) return target[prop];
        return defaultModel;
      }
    };
    return new Proxy({ $connect: async () => {}, $disconnect: async () => {} }, handler);
  }

  private getModel(modelName: string) {
    if (this.client && this.client[modelName]) {
      return this.client[modelName];
    }
    if (!this.mockProxyCache) {
      this.mockProxyCache = this.createMockPrisma();
    }
    return this.mockProxyCache;
  }

  get user() { return this.getModel('user'); }
  get organization() { return this.getModel('organization'); }
  get team() { return this.getModel('team'); }
  get subscription() { return this.getModel('subscription'); }
  get creditAccount() { return this.getModel('creditAccount'); }
  get creditTransaction() { return this.getModel('creditTransaction'); }
  get agent() { return this.getModel('agent'); }
  get workflow() { return this.getModel('workflow'); }
  get execution() { return this.getModel('execution'); }
  get executionStep() { return this.getModel('executionStep'); }
  get memory() { return this.getModel('memory'); }
  get document() { return this.getModel('document'); }
  get auditLog() { return this.getModel('auditLog'); }
  get apiKey() { return this.getModel('apiKey'); }

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
