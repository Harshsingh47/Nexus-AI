'use client';

import React from 'react';
import { Settings, ShieldCheck, Lock } from 'lucide-react';
import { InstructionBanner } from '@/components/ui/InstructionBanner';

export default function SettingsPage() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Instruction Banner */}
      <InstructionBanner
        title="Settings & Security Vault"
        description="Manage AES-256 encrypted provider keys (OpenAI, Anthropic, Gemini), fine-grained RBAC roles, and SOC2 audit logs."
        steps={[
          "KMS Vault: View status of encrypted LLM API keys stored safely with AES-256 GCM encryption.",
          "SOC2 Audit Trails: Monitor user login events, IP addresses, and credit transactions.",
          "Enterprise Compliance: All secret keys are decrypted only in-memory during active workflow runs."
        ]}
        tips="KMS encryption ensures your API keys are never stored as raw text in the database!"
      />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl glass-panel border border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2.5">
            <Settings className="w-6 h-6 text-slate-400" />
            <span>Workspace Settings & Security Vault</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage AES-256 encrypted API keys, LLM provider credentials, fine-grained RBAC roles, organization teams, and SOC2 audit logs.
          </p>
        </div>
      </div>

      {/* Grid Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Encrypted Secrets Manager */}
        <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Lock className="w-5 h-5 text-blue-400" />
            <span>Encrypted Provider API Keys (KMS Vault)</span>
          </h3>

          <div className="space-y-3 font-mono text-xs">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="font-bold text-white">OPENAI_API_KEY</div>
                <div className="text-[10px] text-slate-500">sk-proj-••••••••••••••••3A9x</div>
              </div>
              <span className="text-emerald-400 text-[10px]">Encrypted AES-256</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="font-bold text-white">ANTHROPIC_API_KEY</div>
                <div className="text-[10px] text-slate-500">sk-ant-••••••••••••••••7F8e</div>
              </div>
              <span className="text-emerald-400 text-[10px]">Encrypted AES-256</span>
            </div>
          </div>
        </div>

        {/* RBAC Organizations & Audit Logs */}
        <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>RBAC & SOC2 Audit Trails</span>
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
