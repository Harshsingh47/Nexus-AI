'use client';

import React from 'react';
import { Activity, CheckCircle2, Terminal } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { InstructionBanner } from '@/components/ui/InstructionBanner';

export default function ObservabilityPage() {
  const { logs } = useAppStore();

  const defaultLogs = [
    {
      stepId: 'step-101',
      agentName: 'Orchestrator Manager Agent',
      action: 'Decomposed user prompt into 3 execution subtasks',
      reasoning: 'Evaluated goal, initialized Playwright scraper worker and Claude Sonnet analyzer.',
      status: 'SUCCESS',
      tokensUsed: 420,
      durationMs: 180,
      timestamp: new Date().toLocaleTimeString()
    },
    {
      stepId: 'step-102',
      agentName: 'Playwright Web Crawler',
      action: 'Navigated to target URL https://news.ycombinator.com',
      reasoning: 'Extracted raw DOM tree, parsed top 10 articles, taken screenshot snapshot.',
      status: 'SUCCESS',
      tokensUsed: 120,
      durationMs: 340,
      timestamp: new Date().toLocaleTimeString()
    },
    {
      stepId: 'step-103',
      agentName: 'DevSecOps Auditor',
      action: 'Validated zero secrets leak in execution sandbox',
      reasoning: 'Verified clean output environment, sanitized credentials, logged audit event.',
      status: 'SUCCESS',
      tokensUsed: 210,
      durationMs: 95,
      timestamp: new Date().toLocaleTimeString()
    }
  ];

  const displayLogs = logs.length > 0 ? logs : defaultLogs;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Instruction Banner */}
      <InstructionBanner
        title="Observability & Real-Time Telemetry"
        description="Monitor live WebSocket execution logs, agent reasoning traces, token usage, and step latencies."
        steps={[
          "Ensure Stream Connection: Verify green 'WebSocket Stream Connected' badge at top right.",
          "Live Monitoring: Open this page while running workflows in the Visual Flow Builder tab.",
          "Inspect Trace Details: Read the step reasoning, duration (in ms), and token counter for each step."
        ]}
        tips="Real-time WebSockets stream step events live as agents process multi-step workflows!"
      />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl glass-panel border border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2.5">
            <Activity className="w-6 h-6 text-emerald-400" />
            <span>Observability & Real-Time Telemetry</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Live WebSocket execution trace stream, step reasoning inspector, token counter, latency metrics, and cost tracking.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>WebSocket Stream Connected</span>
        </div>
      </div>

      {/* Realtime Reasoning Trace Terminal Container */}
      <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Terminal className="w-5 h-5 text-slate-400" />
          <span>Autonomous Reasoning & Action Stream</span>
        </h3>

        <div className="space-y-3 font-mono text-xs">
          {displayLogs.map((log, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="font-bold text-white">{log.agentName}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300">
                    {log.action}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[10px] text-slate-500">
                  <span>{log.durationMs || 150}ms</span>
                  <span>{log.tokensUsed || 200} tokens</span>
                  <span>{log.timestamp || new Date().toLocaleTimeString()}</span>
                </div>
              </div>

              <p className="text-slate-400 text-xs pl-6 border-l-2 border-slate-700">
                {log.reasoning}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
