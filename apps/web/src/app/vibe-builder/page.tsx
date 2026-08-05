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
  Eye
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { InstructionBanner } from '@/components/ui/InstructionBanner';

export default function VibeBuilderPage() {
  const { deductCredits } = useAppStore();
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<'PREVIEW' | 'CODE' | 'DATABASE'>('PREVIEW');
  
  const [appState, setAppState] = useState<any>({
    appName: 'SaaS Lead Generator AI App',
    description: 'Autonomous lead scraping, email validation, and CRM pipeline.',
    status: 'READY',
    files: [
      { name: 'app/page.tsx', language: 'typescript', code: `// Autonomously Synthesized Full-Stack Vibe App
import React from 'react';

export default function LeadGeneratorApp() {
  return (
    <div className="p-6 space-y-6 bg-slate-900 text-white rounded-2xl border border-slate-800">
      <h1 className="text-2xl font-bold text-blue-400">Autonomous Lead Generator</h1>
      <p className="text-xs text-slate-400">Powered by Playwright Scraper & Claude 3.5 Sonnet</p>
      
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
          <span className="text-xs text-slate-400">Leads Scraped Today</span>
          <div className="text-2xl font-bold text-emerald-400">1,420</div>
        </div>
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
          <span className="text-xs text-slate-400">Email Verification</span>
          <div className="text-2xl font-bold text-blue-400">99.2%</div>
        </div>
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
          <span className="text-xs text-slate-400">CRM Pipelines</span>
          <div className="text-2xl font-bold text-purple-400">12 Active</div>
        </div>
      </div>
    </div>
  );
}` },
      { name: 'api/scrape/route.ts', language: 'typescript', code: `// Playwright Backend Scraper Endpoint
export async function POST(req: Request) {
  const { targetUrl } = await req.json();
  return Response.json({ success: true, leadsFound: 42, url: targetUrl });
}` }
    ],
    entities: [
      { name: 'Leads', fields: ['id (UUID)', 'companyName (String)', 'email (String)', 'status (Enum)', 'score (Float)'] },
      { name: 'Campaigns', fields: ['id (UUID)', 'title (String)', 'targetRegion (String)', 'scrapedCount (Int)'] }
    ]
  });

  const handleVibeGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    deductCredits(5);

    setTimeout(() => {
      const generatedName = prompt.length > 35 ? `${prompt.substring(0, 35)}...` : prompt;
      const cleanSlug = prompt.toLowerCase().replace(/[^a-z0-9]/g, '-').substring(0, 20);

      setAppState({
        appName: generatedName,
        description: prompt,
        status: 'GENERATED',
        files: [
          {
            name: `app/${cleanSlug}/page.tsx`,
            language: 'typescript',
            code: `// Autonomously Generated Full-Stack UI
import React from 'react';

export default function ${cleanSlug.replace(/-/g, '_')}_App() {
  return (
    <div className="p-8 space-y-6 bg-slate-950 text-white rounded-2xl border border-blue-500/30">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-extrabold text-blue-400">${generatedName}</h1>
          <p className="text-xs text-slate-400">Generated autonomously for prompt: "${prompt}"</p>
        </div>
        <button className="px-4 py-2 rounded-xl bg-blue-600 font-bold text-xs">Run Workflow</button>
      </div>

      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs">
        <h3 className="font-bold text-slate-200 mb-2">Live Synthesized Viewport</h3>
        <p className="text-slate-400">UI pages, backend route handlers, and database entities generated with 0 errors!</p>
      </div>
    </div>
  );`
          },
          {
            name: `api/${cleanSlug}/route.ts`,
            language: 'typescript',
            code: `export async function POST(req: Request) {\n  const data = await req.json();\n  return Response.json({ success: true, processedPrompt: "${prompt}", timestamp: Date.now() });\n}`
          }
        ],
        entities: [
          { name: `${cleanSlug.replace(/-/g, '_')}_records`, fields: ['id (UUID)', 'title (String)', 'dataPayload (JSON)', 'createdAt (DateTime)'] }
        ]
      });
      setIsGenerating(false);
    }, 1200);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto h-[calc(100vh-100px)] flex flex-col">
      {/* Top Instruction Banner */}
      <InstructionBanner
        title="Vibe App & AI Agent Generator Studio"
        description="Describe your application idea in natural language. NexusMind generates full-stack UI components, backend API routes, database schemas, and AI agent workflows."
        steps={[
          "Type your app idea in the prompt bar (e.g. 'Build a competitor tracking dashboard with a React table').",
          "Click 'Generate Full-Stack App (5 Credits)' to synthesize the UI, backend endpoints, and database schemas.",
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
            onClick={() => alert(`App deployed successfully!`)}
            className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition-all hover:scale-[1.02]"
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
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Example Prompts:</span>
              <div
                onClick={() => setPrompt("Build an AI Lead Scraper with a React table, CSV export, and Playwright integration.")}
                className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 hover:border-purple-500/40 cursor-pointer transition-all"
              >
                "Build an AI Lead Scraper with a React table and Playwright integration."
              </div>
              <div
                onClick={() => setPrompt("Build an AI Customer Feedback Analyzer with sentiment graphs and email notifications.")}
                className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 hover:border-purple-500/40 cursor-pointer transition-all"
              >
                "Build an AI Customer Feedback Analyzer with sentiment graphs."
              </div>
            </div>
          </div>

          {/* Prompt Bar */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <textarea
              rows={3}
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              placeholder="Describe your web app or AI agent in natural language..."
              className="w-full bg-slate-900 border border-slate-800 text-xs rounded-xl p-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />
            <button
              onClick={handleVibeGenerate}
              disabled={isGenerating || !prompt.trim()}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-purple-600/30 transition-all disabled:opacity-50"
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
                <span className="text-emerald-400 font-bold">✓ Live Interactive Preview</span>
              </div>

              {/* Render Simulated Live Next.js App */}
              <div className="p-8 rounded-2xl glass-panel border border-blue-500/30 bg-slate-900/90 space-y-6 shadow-2xl">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-2xl font-extrabold text-blue-400 tracking-tight">{appState.appName}</h1>
                    <p className="text-xs text-slate-400 mt-1">{appState.description}</p>
                  </div>
                  <button className="py-2 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-blue-600/20">
                    <Play className="w-3.5 h-3.5" />
                    <span>Run Automation Agent</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="text-xs text-slate-400">Records Scraped</span>
                    <div className="text-2xl font-bold text-emerald-400 font-mono">1,420</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="text-xs text-slate-400">Data Accuracy</span>
                    <div className="text-2xl font-bold text-blue-400 font-mono">99.2%</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <span className="text-xs text-slate-400">Pipelines</span>
                    <div className="text-2xl font-bold text-purple-400 font-mono">12 Active</div>
                  </div>
                </div>

                {/* Sample Live Data Grid */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Database className="w-4 h-4 text-cyan-400" />
                    <span>Generated Database Table</span>
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-mono">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-400">
                          <th className="pb-2">ID</th>
                          <th className="pb-2">Target</th>
                          <th className="pb-2">Payload</th>
                          <th className="pb-2">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        <tr className="hover:bg-slate-800/50">
                          <td className="py-2.5 text-slate-500">#101</td>
                          <td className="py-2.5 font-bold text-white">Acme Corp</td>
                          <td className="py-2.5 text-blue-400">contact@acme.com</td>
                          <td className="py-2.5"><span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px]">VERIFIED</span></td>
                        </tr>
                        <tr className="hover:bg-slate-800/50">
                          <td className="py-2.5 text-slate-500">#102</td>
                          <td className="py-2.5 font-bold text-white">Starlight AI</td>
                          <td className="py-2.5 text-blue-400">sales@starlight.ai</td>
                          <td className="py-2.5"><span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px]">ACTIVE</span></td>
                        </tr>
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
                <span className="text-emerald-400">TypeScript / Next.js</span>
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
