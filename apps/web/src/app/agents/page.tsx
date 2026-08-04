'use client';

import React, { useState, useEffect } from 'react';
import { 
  Bot, 
  Plus, 
  Sparkles, 
  Cpu,
  Trash2,
  AlertCircle
} from 'lucide-react';
import { LLMProvider, AgentRoleType } from '@nexusmind/shared';
import { useAppStore } from '@/lib/store';
import { InstructionBanner } from '@/components/ui/InstructionBanner';

export default function AgentsPage() {
  const { agents, fetchAgents, addAgent, deleteAgent } = useAppStore();
  const [isCreating, setIsCreating] = useState(false);
  const [newAgentName, setNewAgentName] = useState('');
  const [newAgentRole, setNewAgentRole] = useState(AgentRoleType.DEVELOPER);
  const [newAgentPrompt, setNewAgentPrompt] = useState('');

  useEffect(() => {
    fetchAgents();
  }, [fetchAgents]);

  const handleCreateAgent = async () => {
    if (!newAgentName || !newAgentPrompt) return;
    const newAgent = {
      id: `agent-${Date.now()}`,
      name: newAgentName,
      role: newAgentRole,
      description: newAgentPrompt,
      systemPrompt: newAgentPrompt,
      provider: LLMProvider.OPENAI,
      model: 'gpt-4o',
      temperature: 0.7,
      tools: ['PLAYWRIGHT_BROWSER', 'CODE_SANDBOX', 'VECTOR_RAG'],
      maxIterations: 10,
      memoryEnabled: true,
      humanApprovalRequired: false
    };

    try {
      await fetch('http://localhost:4000/api/agents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAgent)
      }).catch(() => null);

      addAgent(newAgent); // Dynamic state update
      setIsCreating(false);
      setNewAgentName('');
      setNewAgentPrompt('');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Instruction Banner */}
      <InstructionBanner
        title="AI Agent Teams & Roster"
        description="Configure autonomous AI specialists with defined job roles, LLM models, system prompts, and tools."
        steps={[
          "Click '+ Create New AI Agent' at top right to open the agent creation form.",
          "Select a specialized role from the dropdown (e.g. DEVELOPER, RESEARCHER, QA, SECURITY, MANAGER).",
          "Type custom system instructions for your agent and click 'Save Agent' to add it dynamically to your team roster!"
        ]}
        tips="Specialist agents can be selected as worker nodes inside the Visual Flow Builder!"
      />

      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl glass-panel border border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2.5">
            <Bot className="w-6 h-6 text-blue-400" />
            <span>Autonomous Multi-Agent Team Roster</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Configure specialized AI agents with distinct roles, system instructions, LLM models, Playwright tools, and shared team memory.
          </p>
        </div>

        <button
          onClick={() => setIsCreating(true)}
          className="py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md shadow-blue-600/30 transition-all shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Create New AI Agent</span>
        </button>
      </div>

      {/* Modal / Form for Creating Agent */}
      {isCreating && (
        <div className="p-6 rounded-2xl glass-panel border border-blue-500/30 bg-slate-900/95 space-y-4 shadow-2xl">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span>Configure AI Specialist Agent</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Agent Name</label>
              <input
                type="text"
                placeholder="e.g. Senior QA Security Tester Agent"
                value={newAgentName}
                onChange={e => setNewAgentName(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-xs rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1">Specialized Role</label>
              <select
                value={newAgentRole}
                onChange={e => setNewAgentRole(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 text-xs rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-blue-500"
              >
                {Object.values(AgentRoleType).map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1">System Instructions & Behavior Prompt</label>
            <textarea
              rows={3}
              placeholder="Define exact guidelines, security boundaries, and step-by-step reasoning logic for this agent..."
              value={newAgentPrompt}
              onChange={e => setNewAgentPrompt(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 text-xs rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={() => setIsCreating(false)}
              className="py-2 px-4 rounded-xl bg-slate-800 text-slate-300 text-xs font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateAgent}
              className="py-2 px-4 rounded-xl bg-blue-600 text-white text-xs font-semibold"
            >
              Save Agent
            </button>
          </div>
        </div>
      )}

      {/* Agents Roster Grid or Empty State */}
      {agents.length === 0 ? (
        <div className="p-12 rounded-3xl glass-panel border border-slate-800 text-center space-y-4 max-w-xl mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mx-auto">
            <Bot className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-white">No AI Agents in Workspace</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Your agent roster is currently empty. Create your first specialized AI agent worker to start orchestrating automated workflows.
          </p>
          <button
            onClick={() => setIsCreating(true)}
            className="py-2.5 px-5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs inline-flex items-center gap-2 shadow-lg shadow-blue-600/30 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Create First AI Agent</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent: any) => (
            <div key={agent.id} className="p-6 rounded-2xl glass-card border border-slate-800 hover:border-blue-500/40 space-y-4 flex flex-col justify-between relative group">
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600/20 to-purple-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold">
                      <Bot className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-white">{agent.name}</h3>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono font-semibold">
                        {agent.role}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => deleteAgent(agent.id)}
                    title="Delete Agent"
                    className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-500 hover:text-rose-400 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed mb-4">
                  {agent.description || agent.systemPrompt}
                </p>
              </div>

              <div className="space-y-3 pt-3 border-t border-slate-800/80">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{agent.provider}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">{agent.model}</span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {agent.tools?.map((tool: string, idx: number) => (
                    <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800 font-mono">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
