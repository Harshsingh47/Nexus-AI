import { Injectable } from '@nestjs/common';

export interface MarketplaceItem {
  id: string;
  name: string;
  category: 'AGENT' | 'WORKFLOW' | 'TOOL';
  author: string;
  rating: number;
  installCount: number;
  description: string;
  priceCredits: number;
  tags: string[];
}

@Injectable()
export class MarketplaceService {
  private items: MarketplaceItem[] = [
    {
      id: 'mkt-devin-relic',
      name: 'Autonomous Full-Stack Devin Engineer',
      category: 'AGENT',
      author: 'NexusMind Labs',
      rating: 4.9,
      installCount: 14200,
      description: 'End-to-end autonomous developer agent with code writing, git PR creation, and automated test execution.',
      priceCredits: 0,
      tags: ['Developer', 'TypeScript', 'Python', 'Git']
    },
    {
      id: 'mkt-rag-researcher',
      name: 'PDF & Academic Paper RAG Analyst',
      category: 'WORKFLOW',
      author: 'AI Research Guild',
      rating: 4.8,
      installCount: 8900,
      description: 'Multi-document RAG ingestion workflow with citation graph visualization and key finding extraction.',
      priceCredits: 0,
      tags: ['RAG', 'Research', 'PDF', 'Knowledge Base']
    },
    {
      id: 'mkt-playwright-bot',
      name: 'Playwright E2E Visual Web Crawler',
      category: 'TOOL',
      author: 'Automation Pro',
      rating: 4.7,
      installCount: 6300,
      description: 'Headless Playwright browser automation node supporting multi-step forms, CAPTCHA handling, and screenshotting.',
      priceCredits: 0,
      tags: ['Playwright', 'Browser', 'Scraper']
    }
  ];

  async getMarketplaceItems() {
    return this.items;
  }

  async installItem(itemId: string) {
    const item = this.items.find(i => i.id === itemId);
    if (item) item.installCount += 1;
    return { success: true, message: `Successfully installed ${item?.name || 'marketplace item'} into your workspace!` };
  }
}
