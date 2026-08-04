'use client';

import React from 'react';
import { BrainCircuit } from 'lucide-react';
import { InstructionBanner } from '@/components/ui/InstructionBanner';

export default function MemoryPage() {
  const memories = [
    {
      id: 'mem-101',
      agent: 'Orchestrator Manager Agent',
      type: 'LONG_TERM',
      content: 'User prefers deployment workflows targeted to AWS EKS with Terraform state lock enabled.',
      timestamp: '2 hours ago',
      relevance: '98%'
    },
    {
      id: 'mem-102',
      agent: 'Full-Stack Developer Agent',
      type: 'SHORT_TERM',
      content: 'Scratchpad execution: Verified NestJS Swagger OpenAPI specs at http://localhost:4000/api/docs.',
      timestamp: '15 mins ago',
      relevance: '95%'
    },
    {
      id: 'mem-103',
      agent: 'DevSecOps Auditor',
      type: 'SEMANTIC',
      content: 'Security Rule: Stripe API secret key must be retrieved from AES-256 vault at runtime only.',
      timestamp: '1 day ago',
      relevance: '99%'
    }
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Instruction Banner */}
      <InstructionBanner
        title="Persistent Memory Explorer"
        description="Inspect short-term session scratchpads, semantic long-term memory, and cross-team knowledge context stored by your agents."
        steps={[
          "Understand Memory Types: LONG_TERM (user preferences), SHORT_TERM (temporary task scratchpads), and SEMANTIC (shared rules).",
          "Inspect Memory Cards: Read stored memory snippets and observe relevance scores (e.g. 98% Relevance).",
          "Agents automatically recall this memory during subsequent visual builder runs!"
        ]}
        tips="Agents use vector search to query past memory whenever evaluating new prompts!"
      />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl glass-panel border border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2.5">
            <BrainCircuit className="w-6 h-6 text-pink-400" />
            <span>Persistent Agent Memory Explorer</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Short-term session scratchpads, semantic long-term memory, working graph memory, and cross-team shared knowledge retention.
          </p>
        </div>
      </div>

      {/* Memory Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {memories.map((mem) => (
          <div key={mem.id} className="p-6 rounded-2xl glass-card border border-slate-800 hover:border-pink-500/40 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] px-2 py-0.5 rounded bg-pink-500/20 text-pink-300 font-mono font-semibold">
                {mem.type}
              </span>
              <span className="text-xs text-slate-500 font-mono">{mem.timestamp}</span>
            </div>

            <h3 className="font-bold text-sm text-white">{mem.agent}</h3>
            <p className="text-xs text-slate-300 leading-relaxed italic bg-slate-900/80 p-3 rounded-xl border border-slate-800">
              "{mem.content}"
            </p>

            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-800">
              <span>Relevance Score</span>
              <span className="text-emerald-400 font-bold">{mem.relevance}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
