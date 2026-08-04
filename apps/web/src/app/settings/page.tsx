'use client';

import React from 'react';
import { Settings, ShieldCheck, Lock } from 'lucide-react';
import { InstructionBanner } from '@/components/ui/InstructionBanner';

export default function SettingsPage() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Instruction Banner */}
      <InstructionBanner
        title="Settings & Key Storage Vault"
        description="Manage provider API keys (OpenAI, Anthropic, Gemini), user workspace preferences, and workspace audit logs."
        steps={[
          "Encrypted Key Storage: View active LLM API keys formatted with AES-256 symmetric encryption storage.",
          "Audit Activity: Monitor login timestamps, client IP addresses, and workflow credit consumption logs.",
          "In-Memory Decryption: API keys are decrypted only in memory during active workflow execution steps."
        ]}
        tips="Environment variables defined in .env are automatically loaded into your workspace securely!"
      />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl glass-panel border border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2.5">
            <Settings className="w-6 h-6 text-slate-400" />
            <span>Workspace Settings & API Key Vault</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage provider API keys, workspace access control, team permissions, and real-time execution audit logs.
          </p>
        </div>
      </div>

      {/* Grid Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Encrypted Secrets Manager */}
        <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Lock className="w-5 h-5 text-blue-400" />
            <span>API Key Storage Vault (AES-256 Enabled)</span>
          </h3>

          <div className="space-y-3 font-mono text-xs">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="font-bold text-white">OPENAI_API_KEY</div>
                <div className="text-[10px] text-slate-500">sk-proj-••••••••••••••••3A9x</div>
              </div>
              <span className="text-emerald-400 text-[10px] bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">AES-256 Active</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="font-bold text-white">ANTHROPIC_API_KEY</div>
                <div className="text-[10px] text-slate-500">sk-ant-••••••••••••••••7F8e</div>
              </div>
              <span className="text-emerald-400 text-[10px] bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">AES-256 Active</span>
            </div>
          </div>
        </div>

        {/* Access & Audit Logs */}
        <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>Workspace Activity & Access Audit Logs</span>
          </h3>

          <div className="space-y-2 font-mono text-xs">
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex justify-between">
              <span className="text-slate-300">User Login: Enterprise Admin</span>
              <span className="text-slate-500">IP: 192.168.1.1</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex justify-between">
              <span className="text-slate-300">Credit Deduction: 2 Credits</span>
              <span className="text-slate-500">Execution: wf-demo-01</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
