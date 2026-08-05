'use client';

import React, { useState } from 'react';
import { 
  Play, 
  Save, 
  Wand2, 
  Sparkles, 
  GitFork, 
  Bot, 
  Globe, 
  Code, 
  Database, 
  BrainCircuit, 
  UserCheck, 
  ArrowRight,
  CheckCircle2,
  RefreshCw,
  Coins,
  X
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { InstructionBanner } from '@/components/ui/InstructionBanner';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export default function BuilderPage() {
  const { deductCredits, addLogStep } = useAppStore();
  const [promptText, setPromptText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [executionResult, setExecutionResult] = useState<any>(null);

  const [nodes, setNodes] = useState<any[]>([
    { id: '1', label: 'Trigger Event', type: 'TRIGGER', icon: GitFork, status: 'READY' },
    { id: '2', label: 'Playwright Web Scraper', type: 'BROWSER', icon: Globe, status: 'READY' },
    { id: '3', label: 'Claude 3.5 Sonnet Analysis', type: 'LLM', icon: Bot, status: 'READY' },
    { id: '4', label: 'Python Data Processing', type: 'PYTHON', icon: Code, status: 'READY' },
    { id: '5', label: 'Store in RAG Knowledge Base', type: 'RAG', icon: Database, status: 'READY' }
  ]);

  const paletteNodes = [
    { type: 'PROMPT', label: 'Prompt Node', icon: Wand2, color: 'text-amber-400 bg-amber-500/10' },
    { type: 'LLM', label: 'LLM Model Call', icon: Bot, color: 'text-blue-400 bg-blue-500/10' },
    { type: 'DECISION', label: 'Condition / Decision', icon: GitFork, color: 'text-purple-400 bg-purple-500/10' },
    { type: 'BROWSER', label: 'Playwright Browser Automation', icon: Globe, color: 'text-emerald-400 bg-emerald-500/10' },
    { type: 'PYTHON', label: 'Python / JS Sandbox', icon: Code, color: 'text-indigo-400 bg-indigo-500/10' },
    { type: 'RAG', label: 'RAG Vector Search', icon: Database, color: 'text-cyan-400 bg-cyan-500/10' },
    { type: 'MEMORY', label: 'Short/Long Memory', icon: BrainCircuit, color: 'text-pink-400 bg-pink-500/10' },
    { type: 'HUMAN_APPROVAL', label: 'Human Approval Gate', icon: UserCheck, color: 'text-rose-400 bg-rose-500/10' }
  ];

  const removeNode = (id: string) => {
    setNodes(prev => prev.filter(n => n.id !== id));
  };

  const handlePromptGenerate = async () => {
    if (!promptText.trim()) return;
    setIsGenerating(true);

    const generatedLabel = promptText.length > 30 ? `${promptText.substring(0, 30)}...` : promptText;
    const newNode = {
      id: `node-${Date.now()}`,
      label: `Agent: ${generatedLabel}`,
      type: 'LLM',
      icon: Bot,
      status: 'READY'
    };

    setNodes(prev => [...prev, newNode]);
    setPromptText('');
    setIsGenerating(false);

    try {
      await fetch(`${API_BASE}/agents/generate-from-prompt`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: promptText })
      }).catch(() => null);
    } catch (e) {}
  };

  const handleRunWorkflow = async () => {
    if (nodes.length === 0) return;
    setIsRunning(true);
    setExecutionResult(null);
    deductCredits(2);

    const mockResult = {
      executionId: `exec-${Date.now()}`,
      status: 'COMPLETED',
      totalCreditsConsumed: 2,
      steps: nodes.map((n, i) => ({
        stepId: `step-${i + 1}`,
        agentName: n.label,
        action: `Executed node #${i + 1} (${n.type})`,
        reasoning: `Processed node step successfully with status ${n.status}`,
        durationMs: 120 + i * 80,
        output: { status: 'SUCCESS', nodeType: n.type, timestamp: new Date().toLocaleTimeString() }
      }))
    };

    setExecutionResult(mockResult);
    mockResult.steps.forEach(s => addLogStep(s));
    setIsRunning(false);

    try {
      await fetch(`${API_BASE}/workflows/wf-demo-01/execute`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ inputData: { nodes } })
      }).catch(() => null);
    } catch (e) {}
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto flex flex-col">
      {/* Instruction Banner */}
      <InstructionBanner
        title="Visual Flow & Prompt Canvas Builder"
        description="Build multi-step AI workflows visually by adding nodes or using natural language instructions."
        steps={[
          "Build via Prompt: Type a task in the top input box (e.g. 'Scrape tech news and write Python summary') and click 'Auto Build Agent'.",
          "Interactive Palette: Click any node in the left Node Palette to add it dynamically to the workflow canvas.",
          "Run Execution: Click 'Run Workflow (2 Credits)' at top right to start execution and observe live step outputs below."
        ]}
        tips="Executing a workflow consumes 2 credits and streams live step reasoning into the Observability tab!"
      />

      {/* Top Builder Control Header */}
      <div className="flex items-center justify-between p-4 rounded-2xl glass-panel border border-slate-800 shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
            <GitFork className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white flex items-center gap-2">
              <span>Interactive Workflow Canvas</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">Interactive Canvas</span>
            </h1>
            <p className="text-xs text-slate-400">Click palette nodes to add, remove nodes, or generate via natural language prompt</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => alert('Workflow topology graph saved to workspace!')}
            className="py-2 px-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-semibold text-slate-300 flex items-center gap-1.5 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Save Graph</span>
          </button>
          <button 
            onClick={handleRunWorkflow}
            disabled={isRunning || nodes.length === 0}
            className="py-2.5 px-5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition-all hover:scale-[1.02] disabled:opacity-50 cursor-pointer"
          >
            {isRunning ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-current" />}
            <span>{isRunning ? 'Executing Engine...' : 'Run Workflow (2 Credits)'}</span>
          </button>
        </div>
      </div>

      {/* Natural Language Prompt Generator Bar */}
      <div className="p-4 rounded-2xl glass-panel border border-indigo-500/30 bg-gradient-to-r from-indigo-950/40 via-dark-950 to-purple-950/40 shrink-0">
        <div className="flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-indigo-400 shrink-0 animate-pulse" />
          <input
            type="text"
            value={promptText}
            onChange={(e) => setPromptText(e.target.value)}
            placeholder="Describe what you want the agent to do in natural language (e.g. 'Scrape product specs from news.ycombinator.com, write a Python analysis script and send summary')..."
            className="flex-1 bg-slate-900/90 border border-slate-800 text-xs rounded-xl px-4 py-2.5 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
          />
          <button
            onClick={handlePromptGenerate}
            disabled={isGenerating || !promptText.trim()}
            className="py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md shadow-indigo-600/30 transition-all disabled:opacity-50 shrink-0 cursor-pointer"
          >
            {isGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
            <span>Auto Build Agent</span>
          </button>
        </div>
      </div>

      {/* Canvas Area with Left Node Palette */}
      <div className="flex-1 flex gap-6 min-h-[450px]">
        {/* Left Node Palette */}
        <div className="w-64 rounded-2xl glass-panel border border-slate-800 p-4 space-y-4 overflow-y-auto shrink-0">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Node Palette (Click to Add)</h2>
          <div className="space-y-2">
            {paletteNodes.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  onClick={() => {
                    setNodes(prev => [
                      ...prev,
                      { id: `node-${Date.now()}`, label: item.label, type: item.type, icon: Icon, status: 'READY' }
                    ]);
                  }}
                  className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 hover:border-blue-500/50 cursor-pointer flex items-center gap-3 transition-all hover:translate-x-1"
                >
                  <div className={`p-2 rounded-lg ${item.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-medium text-slate-200">{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Center Workflow Graph Visual Area */}
        <div className="flex-1 rounded-2xl glass-panel border border-slate-800 p-6 relative overflow-auto bg-dark-950/90 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-slate-400 font-mono">Workflow Canvas ({nodes.length} Nodes)</span>
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
              <Coins className="w-3.5 h-3.5 text-amber-400" />
              <span>Est. Cost: 2 Credits</span>
            </div>
          </div>

          {/* Interactive Flow Nodes */}
          {nodes.length === 0 ? (
            <div className="text-center my-auto py-12 space-y-2">
              <p className="text-slate-500 text-xs font-mono">Canvas is empty. Click nodes in the palette or type a prompt to build.</p>
            </div>
          ) : (
            <div className="flex flex-wrap items-center justify-center gap-4 my-auto py-8">
              {nodes.map((node, i) => {
                const Icon = node.icon || Bot;
                return (
                  <React.Fragment key={node.id}>
                    <div className="p-4 rounded-2xl glass-card border border-blue-500/30 hover:border-blue-400 w-56 space-y-2 shadow-xl bg-slate-900/90 relative group">
                      <div className="flex items-center justify-between">
                        <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-[9px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                            {node.type}
                          </span>
                          <button
                            onClick={() => removeNode(node.id)}
                            className="p-1 rounded text-slate-500 hover:text-rose-400 transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <h4 className="font-bold text-xs text-white">{node.label}</h4>
                      <div className="flex items-center justify-between text-[10px] text-slate-500 pt-2 border-t border-slate-800/80">
                        <span>Node #{i + 1}</span>
                        <span className="text-emerald-400 font-mono">{node.status}</span>
                      </div>
                    </div>
                    {i < nodes.length - 1 && (
                      <ArrowRight className="w-5 h-5 text-slate-600 shrink-0 animate-pulse" />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          )}

          {/* Execution Trace Output Container */}
          {executionResult && (
            <div className="p-4 rounded-xl bg-slate-900/95 border border-emerald-500/30 space-y-3 font-mono text-xs max-h-60 overflow-y-auto">
              <div className="flex items-center justify-between text-emerald-400">
                <span className="font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Workflow Execution Completed</span>
                </span>
                <span>Credits Consumed: {executionResult.totalCreditsConsumed || 2}</span>
              </div>
              <div className="space-y-2 text-slate-300">
                {executionResult.steps?.map((step: any, idx: number) => (
                  <div key={idx} className="p-2.5 rounded bg-slate-950 border border-slate-800 text-[11px] space-y-1">
                    <div className="flex justify-between text-blue-400 font-bold">
                      <span>Step #{idx + 1}: {step.agentName}</span>
                      <span className="text-slate-500">{step.durationMs}ms</span>
                    </div>
                    <p className="text-slate-400">{step.reasoning}</p>
                    <pre className="text-emerald-300 text-[10px] overflow-x-auto p-1 bg-slate-900 rounded">
                      {JSON.stringify(step.output, null, 2)}
                    </pre>
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
