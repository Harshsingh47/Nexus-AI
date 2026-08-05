'use client';

import React, { useState, useEffect } from 'react';
import { Store, Download, Star } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { InstructionBanner } from '@/components/ui/InstructionBanner';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export default function MarketplacePage() {
  const { searchQuery, addAgent } = useAppStore();
  const [items, setItems] = useState<any[]>([
    {
      id: 'tmpl-1',
      name: 'Autonomous Web Research Specialist',
      category: 'BROWSER_AUTOMATION',
      author: 'NexusMind Team',
      rating: '4.9',
      installCount: 1420,
      description: 'Crawls target web domains using Playwright, extracts tabular data, and indexes findings into vector search.'
    },
    {
      id: 'tmpl-2',
      name: 'Python Data Analysis & Transformation Sandbox',
      category: 'CODE_SANDBOX',
      author: 'NexusMind Team',
      rating: '4.8',
      installCount: 890,
      description: 'Executes Python pandas and numpy scripts safely in an isolated sandbox for mathematical modeling.'
    },
    {
      id: 'tmpl-3',
      name: 'DevSecOps & Compliance Audit Pipeline',
      category: 'SECURITY',
      author: 'Community Contributor',
      rating: '4.9',
      installCount: 650,
      description: 'Scans execution logs and code outputs for PII compliance and secret leaks before production deployment.'
    }
  ]);

  useEffect(() => {
    fetch(`${API_BASE}/marketplace`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) setItems(data);
      })
      .catch(() => null);
  }, []);

  const handleInstall = async (item: any) => {
    const newAgent = {
      id: `agent-tmpl-${Date.now()}`,
      name: item.name,
      role: item.category || 'SPECIALIST',
      description: item.description,
      systemPrompt: item.description,
      provider: 'OPENAI' as any,
      model: 'gpt-4o',
      temperature: 0.5,
      tools: ['PLAYWRIGHT_BROWSER', 'CODE_SANDBOX'],
      maxIterations: 10,
      memoryEnabled: true,
      humanApprovalRequired: false
    };

    addAgent(newAgent);
    alert(`Installed "${item.name}" directly into your workspace agent roster!`);
  };

  const filteredItems = items.filter(item =>
    !searchQuery ||
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Instruction Banner */}
      <InstructionBanner
        title="Agent & Template Marketplace"
        description="Browse, install, and deploy community-built AI agents and multi-agent workflow templates into your workspace with 1 click."
        steps={[
          "Browse Categories: Explore specialized agents (Web Scraper, Data Analysis Sandbox, DevSecOps Auditor).",
          "1-Click Installation: Click '1-Click Install to Workspace' on any item card.",
          "Ready to Use: The installed agent or workflow is instantly added to your AI Agent Teams roster!"
        ]}
        tips="Pre-built marketplace templates save time by providing pre-configured Playwright scraper nodes and system prompts!"
      />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl glass-panel border border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2.5">
            <Store className="w-6 h-6 text-purple-400" />
            <span>Agent & Template Marketplace</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Discover community-built AI agents, multi-agent workflows, Playwright scrapers, and developer tools ready for 1-click workspace installation.
          </p>
        </div>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="p-6 rounded-2xl glass-card border border-slate-800 hover:border-purple-500/40 space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono font-semibold">
                  {item.category}
                </span>
                <div className="flex items-center gap-1 text-amber-400 text-xs font-bold font-mono">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{item.rating}</span>
                </div>
              </div>

              <h3 className="font-bold text-base text-white">{item.name}</h3>
              <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="space-y-3 pt-3 border-t border-slate-800">
              <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                <span>By {item.author}</span>
                <span>{item.installCount?.toLocaleString() || 1420} installs</span>
              </div>

              <button
                onClick={() => handleInstall(item)}
                className="w-full py-2 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-purple-600/30"
              >
                <Download className="w-4 h-4" />
                <span>1-Click Install to Workspace</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
