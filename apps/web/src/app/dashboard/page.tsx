'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { 
  Bot, 
  Play, 
  Coins, 
  Activity, 
  Sparkles, 
  GitFork, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  Layers
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { InstructionBanner } from '@/components/ui/InstructionBanner';

export default function DashboardPage() {
  const { agents, fetchAgents, credits, activePlan, fetchBilling } = useAppStore();

  useEffect(() => {
    fetchAgents();
    fetchBilling();
  }, [fetchAgents, fetchBilling]);

  const stats = [
    { label: 'Active Autonomous Agents', value: agents.length || '4', icon: Bot, change: '+2 active teams', color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
    { label: 'Daily Free Credits Remaining', value: credits, icon: Coins, change: 'Refreshes every 24h', color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
    { label: 'Total Executions (Today)', value: '128', icon: Activity, change: '99.4% success rate', color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
    { label: 'Active Subscription', value: activePlan, icon: Layers, change: 'Dynamic credit refresh', color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/20' }
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Instruction Banner */}
      <InstructionBanner
        title="Overview Command Center"
        description="Your central control dashboard for monitoring credits, agent specialists, and system telemetry."
        steps={[
          "Check your remaining credits in the top meter or Daily Credit Status panel (50 free credits refreshed every 24h).",
          "Click 'Launch Visual Canvas' to open the workflow builder and create automated tasks.",
          "View your active agent specialists below or click 'Upgrade Subscription' to increase your daily credit volume."
        ]}
        tips="Every new user gets 50 free credits daily! Upgrading to Weekly or Monthly adds bulk credits and enables Playwright web automation."
      />

      {/* Top Welcome Banner */}
      <div className="relative rounded-3xl p-8 overflow-hidden glass-panel border border-blue-500/30 bg-gradient-to-r from-blue-950/60 via-indigo-950/40 to-dark-950 shadow-2xl">
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-400 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Autonomous Multi-Agent System Engine</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              NexusMind Command Center
            </h1>
            <p className="text-slate-400 text-sm mt-2 max-w-2xl leading-relaxed">
              Create, orchestrate, and monitor autonomous AI agents capable of web browsing with Playwright, writing code, executing RAG vector searches, and handling multi-agent workflows.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/builder"
              className="py-3 px-5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm flex items-center gap-2 shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02]"
            >
              <GitFork className="w-4 h-4" />
              <span>Launch Visual Canvas</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className={`p-6 rounded-2xl border glass-panel ${stat.bg} transition-all`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400">{stat.label}</span>
                <div className={`p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 ${stat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-3xl font-extrabold text-white font-mono">{stat.value}</span>
                <p className="text-[11px] text-slate-400 mt-1">{stat.change}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Grid: Active Agents & Recent Workflows */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Active Multi-Agent Team (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Bot className="w-5 h-5 text-blue-400" />
              <span>Active Agent Specialists</span>
            </h2>
            <Link href="/agents" className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1">
              <span>View All Agents ({agents.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {agents.map((agent: any) => (
              <div key={agent.id} className="p-5 rounded-2xl glass-card border border-slate-800/80 hover:border-blue-500/40 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-blue-400 font-bold">
                      <Bot className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-white">{agent.name}</h3>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono">
                        {agent.role}
                      </span>
                    </div>
                  </div>
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                </div>

                <p className="text-xs text-slate-400 line-clamp-2">{agent.description || agent.systemPrompt}</p>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-800/60 font-mono">
                  <span>Provider: {agent.provider}</span>
                  <span>Model: {agent.model}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Trigger Workflow Demo */}
          <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Play className="w-4 h-4 text-emerald-400" />
              <span>Featured Autonomous Workflow Template</span>
            </h3>
            <p className="text-xs text-slate-400">
              Run competitor web research, execute Python data analysis, vector chunk into RAG, and store long-term memory.
            </p>
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 font-mono text-[10px]">Playwright + RAG</span>
                <span>Autonomous Deep Research & Competitor Analysis Workflow</span>
              </div>
              <Link 
                href="/builder" 
                className="py-1.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1 shadow-md shadow-emerald-600/20 transition-all"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Run Now</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: Execution Telemetry & Daily Credits (1 Col) */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl glass-panel border border-amber-500/20 bg-gradient-to-b from-slate-900 to-amber-950/20 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Coins className="w-4 h-4" />
                <span>Daily Credit Status</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono">
                {activePlan}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Credits Available:</span>
                <span className="font-mono font-bold text-white">{credits}</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-500 to-emerald-400 w-full"></div>
              </div>
            </div>

            <p className="text-xs text-slate-400">
              Need higher velocity limits, multi-agent parallelism, or Playwright browser automation? Upgrade to Weekly ($9/wk), Monthly ($29/mo), or Yearly ($249/yr).
            </p>

            <Link
              href="/billing"
              className="w-full py-2 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all"
            >
              Upgrade Subscription
            </Link>
          </div>

          {/* Execution Activity Log */}
          <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-400" />
              <span>Real-Time Execution Logs</span>
            </h3>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-slate-200 font-semibold">Playwright Navigation Success</p>
                  <p className="text-[10px] text-slate-500">Target: hacker-news.com | Duration: 240ms</p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-slate-200 font-semibold">RAG Document Vectorized</p>
                  <p className="text-[10px] text-slate-500">Doc: Architecture_Spec.pdf | Chunks: 148</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
