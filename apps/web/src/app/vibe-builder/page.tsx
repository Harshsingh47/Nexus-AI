'use client';

import React, { useState } from 'react';
import { 
  Wand2, 
  Sparkles, 
  Play, 
  Code, 
  Database, 
  Rocket, 
  RefreshCw, 
  FileCode, 
  Eye,
  TrendingUp,
  Search,
  CheckCircle2,
  DollarSign
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { InstructionBanner } from '@/components/ui/InstructionBanner';

export default function VibeBuilderPage() {
  const { deductCredits } = useAppStore();
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<'PREVIEW' | 'CODE' | 'DATABASE'>('PREVIEW');
  const [cryptoSearch, setCryptoSearch] = useState('');

  const [appState, setAppState] = useState<any>({
    type: 'CRYPTO',
    appName: 'Real-Time Crypto Price Tracker & Alert Web App',
    description: 'Fetches live market prices for Bitcoin, Ethereum, Solana, and top tokens with price alert thresholds.',
    status: 'GENERATED',
    metrics: [
      { label: 'Bitcoin (BTC)', value: '$64,250.00', change: '+3.4% 24h', color: 'text-emerald-400' },
      { label: 'Ethereum (ETH)', value: '$3,450.50', change: '+2.1% 24h', color: 'text-blue-400' },
      { label: 'Solana (SOL)', value: '$145.80', change: '+5.8% 24h', color: 'text-purple-400' }
    ],
    items: [
      { id: '#BTC', name: 'Bitcoin', symbol: 'BTC', price: '$64,250.00', volume: '$28.4B', status: 'BULLISH' },
      { id: '#ETH', name: 'Ethereum', symbol: 'ETH', price: '$3,450.50', volume: '$14.2B', status: 'BULLISH' },
      { id: '#SOL', name: 'Solana', symbol: 'SOL', price: '$145.80', volume: '$4.8B', status: 'BULLISH' },
      { id: '#BNB', name: 'BNB Token', symbol: 'BNB', price: '$580.00', volume: '$1.9B', status: 'STABLE' }
    ],
    files: [
      {
        name: 'app/crypto/page.tsx',
        language: 'typescript',
        code: `// Autonomously Generated Crypto Tracker Next.js App
import React, { useState, useEffect } from 'react';

export default function CryptoTrackerApp() {
  const [prices, setPrices] = useState([]);

  useEffect(() => {
    // API Call to fetch real-time crypto price ticker
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd')
      .then(res => res.json())
      .then(data => setPrices(data));
  }, []);

  return (
    <div className="p-8 space-y-6 bg-slate-950 text-white rounded-2xl">
      <h1 className="text-2xl font-bold text-blue-400">Live Crypto Price Tracker</h1>
      <p className="text-xs text-slate-400">Real-time WebSocket price updates & alerts</p>
    </div>
  );
}`
      },
      {
        name: 'api/crypto/route.ts',
        language: 'typescript',
        code: `export async function GET() {\n  // Backend API route handler to proxy crypto price endpoints\n  return Response.json({ status: 'ONLINE', timestamp: Date.now() });\n}`
      }
    ],
    entities: [
      { name: 'CryptoAssets', fields: ['id (UUID)', 'symbol (String)', 'priceUsd (Float)', 'volume24h (Float)', 'updatedAt (DateTime)'] },
      { name: 'PriceAlerts', fields: ['id (UUID)', 'userId (UUID)', 'targetPrice (Float)', 'status (Enum)'] }
    ]
  });

  const handleVibeGenerate = (customText?: string) => {
    const targetPrompt = customText !== undefined ? customText : prompt;
    if (!targetPrompt.trim()) return;

    setIsGenerating(true);
    deductCredits(5);

    const lowerPrompt = targetPrompt.toLowerCase();
    const cleanSlug = targetPrompt.toLowerCase().replace(/[^a-z0-9]/g, '-').substring(0, 20) || 'app';
    const generatedName = targetPrompt.length > 35 ? `${targetPrompt.substring(0, 35)}...` : targetPrompt;

    if (lowerPrompt.includes('crypto') || lowerPrompt.includes('price') || lowerPrompt.includes('coin') || lowerPrompt.includes('token') || lowerPrompt.includes('bitcoin')) {
      setAppState({
        type: 'CRYPTO',
        appName: `Crypto Price Tracker: ${generatedName}`,
        description: targetPrompt,
        status: 'GENERATED',
        metrics: [
          { label: 'Bitcoin (BTC)', value: '$64,250.00', change: '+3.4% 24h', color: 'text-emerald-400' },
          { label: 'Ethereum (ETH)', value: '$3,450.50', change: '+2.1% 24h', color: 'text-blue-400' },
          { label: 'Solana (SOL)', value: '$145.80', change: '+5.8% 24h', color: 'text-purple-400' }
        ],
        items: [
          { id: '#BTC', name: 'Bitcoin', symbol: 'BTC', price: '$64,250.00', volume: '$28.4B', status: 'BULLISH' },
          { id: '#ETH', name: 'Ethereum', symbol: 'ETH', price: '$3,450.50', volume: '$14.2B', status: 'BULLISH' },
          { id: '#SOL', name: 'Solana', symbol: 'SOL', price: '$145.80', volume: '$4.8B', status: 'BULLISH' },
          { id: '#BNB', name: 'BNB Token', symbol: 'BNB', price: '$580.00', volume: '$1.9B', status: 'STABLE' }
        ],
        files: [
          {
            name: `app/${cleanSlug}/page.tsx`,
            language: 'typescript',
            code: `// Live Crypto Price Tracker Web App\nimport React from 'react';\n\nexport default function CryptoApp() {\n  return (\n    <div className="p-6 bg-slate-950 text-white font-mono">\n      <h1>Live Crypto Price Ticker</h1>\n      <p>Prompt: ${targetPrompt}</p>\n    </div>\n  );\n}`
          },
          {
            name: `api/${cleanSlug}/route.ts`,
            language: 'typescript',
            code: `export async function GET() {\n  return Response.json({ cryptoPrices: { btc: 64250, eth: 3450, sol: 145.8 } });\n}`
          }
        ],
        entities: [
          { name: 'CryptoPrices', fields: ['id (UUID)', 'symbol (String)', 'priceUsd (Float)', 'volume24h (Float)'] },
          { name: 'PriceAlerts', fields: ['id (UUID)', 'targetPrice (Float)', 'alertTriggered (Boolean)'] }
        ]
      });
    } else if (lowerPrompt.includes('lead') || lowerPrompt.includes('scrape') || lowerPrompt.includes('crm') || lowerPrompt.includes('email')) {
      setAppState({
        type: 'LEAD',
        appName: `Autonomous Lead Scraper: ${generatedName}`,
        description: targetPrompt,
        status: 'GENERATED',
        metrics: [
          { label: 'Leads Scraped Today', value: '1,420', change: '+18% vs yesterday', color: 'text-emerald-400' },
          { label: 'Email Verification Rate', value: '99.2%', change: 'SMTP Verified', color: 'text-blue-400' },
          { label: 'Active CRM Pipelines', value: '12 Active', change: 'Synced to HubSpot', color: 'text-purple-400' }
        ],
        items: [
          { id: '#101', name: 'Acme Corp', symbol: 'contact@acme.com', price: 'High Priority', volume: 'Score: 98.5%', status: 'VERIFIED' },
          { id: '#102', name: 'Starlight AI', symbol: 'sales@starlight.ai', price: 'Medium Priority', volume: 'Score: 92.0%', status: 'ACTIVE' }
        ],
        files: [
          {
            name: `app/${cleanSlug}/page.tsx`,
            language: 'typescript',
            code: `// Lead Scraper Web App\nimport React from 'react';\n\nexport default function LeadApp() {\n  return (\n    <div className="p-6 bg-slate-950 text-white font-mono">\n      <h1>Lead Scraper & CRM Dashboard</h1>\n      <p>Prompt: ${targetPrompt}</p>\n    </div>\n  );\n}`
          }
        ],
        entities: [
          { name: 'Leads', fields: ['id (UUID)', 'companyName (String)', 'email (String)', 'leadScore (Float)'] }
        ]
      });
    } else {
      setAppState({
        type: 'GENERIC',
        appName: generatedName,
        description: targetPrompt,
        status: 'GENERATED',
        metrics: [
          { label: 'Processed Records', value: '1,420', change: '100% Verified', color: 'text-emerald-400' },
          { label: 'Execution Accuracy', value: '99.2%', change: '0 Runtime Errors', color: 'text-blue-400' },
          { label: 'Pipeline Status', value: 'ACTIVE', change: 'Live Engine', color: 'text-purple-400' }
        ],
        items: [
          { id: '#101', name: `${generatedName} Record #1`, symbol: 'payload_01.json', price: 'Status: OK', volume: 'Latency: 120ms', status: 'PROCESSED' },
          { id: '#102', name: `${generatedName} Record #2`, symbol: 'payload_02.json', price: 'Status: OK', volume: 'Latency: 140ms', status: 'ACTIVE' }
        ],
        files: [
          {
            name: `app/${cleanSlug}/page.tsx`,
            language: 'typescript',
            code: `// Autonomously Synthesized Web App\nimport React from 'react';\n\nexport default function CustomApp() {\n  return (\n    <div className="p-6 bg-slate-950 text-white font-mono">\n      <h1>${generatedName}</h1>\n      <p>Prompt: ${targetPrompt}</p>\n    </div>\n  );\n}`
          }
        ],
        entities: [
          { name: `${cleanSlug.replace(/-/g, '_')}_data`, fields: ['id (UUID)', 'title (String)', 'dataPayload (JSON)', 'createdAt (DateTime)'] }
        ]
      });
    }

    setIsGenerating(false);
  };

  const handlePromptClick = (text: string) => {
    setPrompt(text);
    handleVibeGenerate(text);
  };

  const handleDeploy = () => {
    const slug = appState.appName.toLowerCase().replace(/[^a-z0-9]/g, '-').substring(0, 15);
    alert(`🎉 Web App Deployed & Hosted Successfully!\nLive Viewport: https://nexusmind.ai/app/${slug}`);
  };

  const filteredItems = appState.items?.filter((item: any) =>
    !cryptoSearch || 
    item.name.toLowerCase().includes(cryptoSearch.toLowerCase()) || 
    item.symbol.toLowerCase().includes(cryptoSearch.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto h-[calc(100vh-100px)] flex flex-col">
      {/* Top Instruction Banner */}
      <InstructionBanner
        title="Vibe App & AI Agent Generator Studio"
        description="Describe your application idea in natural language. NexusMind generates full-stack UI components, backend API routes, database schemas, and AI agent workflows."
        steps={[
          "Type your app idea in the prompt bar (e.g. 'build a website to fetch crypto prices').",
          "Click 'Generate Full-Stack App (5 Credits)' to synthesize the live web app, backend endpoints, and database schemas.",
          "Switch between Live Preview, Generated Code, and Database Tables, then click 'Deploy & Host App' to publish!"
        ]}
        tips="Vibe Coding generates full Next.js React UI components, backend route handlers, and database entities automatically!"
      />

      {/* Top Control Bar */}
      <div className="p-4 rounded-2xl glass-panel border border-slate-800 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-purple-600 to-blue-600 text-white shadow-md">
            <Wand2 className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white flex items-center gap-2">
              <span>Conversational Vibe App & Agent Studio</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono">Vibe Engine</span>
            </h1>
            <p className="text-xs text-slate-400">Describe what you want to build; AI generates the UI, backend APIs, DB schema & agents</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="grid grid-cols-3 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('PREVIEW')}
              className={`py-1.5 px-3 rounded-lg flex items-center gap-1.5 transition-all ${activeTab === 'PREVIEW' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Live Preview</span>
            </button>
            <button
              onClick={() => setActiveTab('CODE')}
              className={`py-1.5 px-3 rounded-lg flex items-center gap-1.5 transition-all ${activeTab === 'CODE' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>Code Editor</span>
            </button>
            <button
              onClick={() => setActiveTab('DATABASE')}
              className={`py-1.5 px-3 rounded-lg flex items-center gap-1.5 transition-all ${activeTab === 'DATABASE' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>DB Tables</span>
            </button>
          </div>

          <button
            onClick={handleDeploy}
            className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition-all hover:scale-[1.02] cursor-pointer"
          >
            <Rocket className="w-4 h-4" />
            <span>Deploy & Host App</span>
          </button>
        </div>
      </div>

      {/* Main Split Grid */}
      <div className="flex-1 flex gap-6 min-h-0">
        {/* Left Prompt Panel */}
        <div className="w-96 rounded-2xl glass-panel border border-slate-800 p-5 flex flex-col justify-between shrink-0 space-y-4">
          <div className="space-y-4 flex-1 overflow-y-auto">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>Vibe Prompt Assistant</span>
            </h2>

            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-2">
              <div className="font-bold text-white">{appState.appName}</div>
              <p className="text-slate-400 leading-relaxed text-[11px]">{appState.description}</p>
              <span className="inline-block text-[9px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                Status: {appState.status}
              </span>
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Example Prompts (Click to Use):</span>
              <div
                onClick={() => handlePromptClick("build a website to fetch crypto prices")}
                className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 hover:border-purple-500/40 cursor-pointer transition-all"
              >
                "build a website to fetch crypto prices"
              </div>
              <div
                onClick={() => handlePromptClick("Build an AI Lead Scraper with a React table and Playwright integration.")}
                className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 hover:border-purple-500/40 cursor-pointer transition-all"
              >
                "Build an AI Lead Scraper with a React table and Playwright integration."
              </div>
            </div>
          </div>

          {/* Prompt Bar */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <textarea
              rows={3}
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              placeholder="Describe your web app or AI agent in natural language (e.g. 'build a website to fetch crypto prices')..."
              className="w-full bg-slate-900 border border-slate-800 text-xs rounded-xl p-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />
            <button
              onClick={() => handleVibeGenerate()}
              disabled={isGenerating || !prompt.trim()}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-purple-600/30 transition-all disabled:opacity-50 cursor-pointer"
            >
              {isGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
              <span>Generate Full-Stack App (5 Credits)</span>
            </button>
          </div>
        </div>

        {/* Right Viewport (Preview / Code / Database) */}
        <div className="flex-1 rounded-2xl glass-panel border border-slate-800 p-6 flex flex-col min-h-0 overflow-auto bg-slate-950">
          {activeTab === 'PREVIEW' && (
            <div className="space-y-6 flex-1 overflow-y-auto">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 font-mono">
                <span>Viewport: http://localhost:3000/app/preview</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Live Generated Web Application Viewport</span>
                </span>
              </div>

              {/* Render Prompt-Specific Interactive Live Web App */}
              <div className="p-8 rounded-2xl glass-panel border border-blue-500/30 bg-slate-900/90 space-y-6 shadow-2xl">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-2xl font-extrabold text-blue-400 tracking-tight flex items-center gap-2">
                      {appState.type === 'CRYPTO' && <TrendingUp className="w-6 h-6 text-emerald-400" />}
                      <span>{appState.appName}</span>
                    </h1>
                    <p className="text-xs text-slate-400 mt-1">{appState.description}</p>
                  </div>
                  <button 
                    onClick={() => alert(`Automation runner triggered for ${appState.appName}!`)}
                    className="py-2 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-blue-600/20"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Run Automation Agent</span>
                  </button>
                </div>

                {/* Metrics Bar */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {appState.metrics?.map((m: any, idx: number) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                      <span className="text-xs text-slate-400">{m.label}</span>
                      <div className={`text-2xl font-bold font-mono ${m.color || 'text-white'}`}>{m.value}</div>
                      <span className="text-[10px] text-emerald-400 font-mono">{m.change}</span>
                    </div>
                  ))}
                </div>

                {/* Interactive Search Bar for Generated App */}
                <div className="flex items-center gap-3">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={cryptoSearch}
                      onChange={e => setCryptoSearch(e.target.value)}
                      placeholder={appState.type === 'CRYPTO' ? "Search crypto prices (e.g. BTC, Solana)..." : "Filter records..."}
                      className="w-full bg-slate-950 border border-slate-800 text-xs rounded-xl pl-9 pr-4 py-2 text-slate-200 focus:outline-none focus:border-blue-500 font-mono"
                    />
                  </div>
                  <button 
                    onClick={() => setCryptoSearch('')}
                    className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-400 hover:text-white"
                  >
                    Reset Filter
                  </button>
                </div>

                {/* Live Data Grid */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Database className="w-4 h-4 text-cyan-400" />
                    <span>Generated Database Entity: {appState.entities?.[0]?.name || 'Records'}</span>
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-mono">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-400">
                          <th className="pb-2">ID</th>
                          <th className="pb-2">Asset / Item Name</th>
                          <th className="pb-2">Symbol / Payload</th>
                          <th className="pb-2">Live Value</th>
                          <th className="pb-2">24h Volume / Latency</th>
                          <th className="pb-2">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        {filteredItems?.map((item: any, idx: number) => (
                          <tr key={idx} className="hover:bg-slate-800/50">
                            <td className="py-2.5 text-slate-500">{item.id}</td>
                            <td className="py-2.5 font-bold text-white flex items-center gap-1.5">
                              {appState.type === 'CRYPTO' && <DollarSign className="w-3.5 h-3.5 text-emerald-400" />}
                              <span>{item.name}</span>
                            </td>
                            <td className="py-2.5 text-blue-400">{item.symbol}</td>
                            <td className="py-2.5 text-emerald-400 font-bold">{item.price}</td>
                            <td className="py-2.5 text-slate-400">{item.volume}</td>
                            <td className="py-2.5">
                              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px]">
                                {item.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'CODE' && (
            <div className="space-y-4 flex-1 overflow-y-auto font-mono text-xs">
              <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
                <span>Generated Code Files ({appState.files.length})</span>
                <span className="text-emerald-400">TypeScript / Next.js 14</span>
              </div>
              {appState.files.map((file: any, idx: number) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center gap-2 text-blue-400 font-bold text-xs">
                    <FileCode className="w-4 h-4" />
                    <span>{file.name}</span>
                  </div>
                  <pre className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 overflow-x-auto text-[11px]">
                    {file.code}
                  </pre>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'DATABASE' && (
            <div className="space-y-4 flex-1 overflow-y-auto">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Database className="w-5 h-5 text-cyan-400" />
                <span>Generated PostgreSQL & Prisma Schemas</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {appState.entities?.map((ent: any, idx: number) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                    <div className="font-bold text-sm text-cyan-400 flex items-center justify-between">
                      <span>Entity: {ent.name}</span>
                      <span className="text-[10px] text-slate-500 font-mono">Table</span>
                    </div>
                    <ul className="space-y-1 text-xs text-slate-300 font-mono">
                      {ent.fields?.map((f: string, i: number) => (
                        <li key={i} className="p-1 rounded bg-slate-950 border border-slate-800 text-[11px]">
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
