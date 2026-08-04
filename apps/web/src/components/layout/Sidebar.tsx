'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Bot, 
  GitFork, 
  Database, 
  BrainCircuit, 
  Store, 
  CreditCard, 
  Activity, 
  Settings, 
  Sparkles,
  LayoutDashboard,
  Zap,
  Wand2
} from 'lucide-react';
import { useAppStore } from '@/lib/store';

export function Sidebar() {
  const pathname = usePathname();
  const { credits, activePlan, agents } = useAppStore();

  const navItems = [
    { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Vibe App Builder', href: '/vibe-builder', icon: Wand2, badge: 'App Studio' },
    { label: 'Visual Flow Builder', href: '/builder', icon: GitFork, badge: 'Canvas' },
    { label: 'AI Agent Teams', href: '/agents', icon: Bot, count: `${agents.length} Active` },
    { label: 'Knowledge Base (RAG)', href: '/knowledge', icon: Database },
    { label: 'Memory Explorer', href: '/memory', icon: BrainCircuit },
    { label: 'Observability & Logs', href: '/observability', icon: Activity, live: true },
    { label: 'Marketplace', href: '/marketplace', icon: Store },
    { label: 'Billing & Credits', href: '/billing', icon: CreditCard, highlight: true },
    { label: 'Settings & Vault', href: '/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 h-screen border-r border-slate-800 bg-dark-950 flex flex-col justify-between p-4 fixed left-0 top-0 z-40">
      <div>
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-3 py-4 mb-6 border-b border-slate-800/80">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-white tracking-wide flex items-center gap-1.5">
              NexusMind <span className="text-xs px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 font-mono">v1.0</span>
            </h1>
            <p className="text-xs text-slate-400">Enterprise AI Platform</p>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-medium border border-indigo-500/30">
                    {item.badge}
                  </span>
                )}
                {item.count && (
                  <span className="text-xs text-slate-400 font-mono">
                    {item.count}
                  </span>
                )}
                {item.live && (
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Banner */}
      <div className="p-3.5 rounded-2xl glass-panel bg-gradient-to-b from-slate-900/80 to-blue-950/30 border border-blue-500/20">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span className="text-xs font-semibold text-white">Daily Free Refreshed</span>
          </div>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 font-mono">
            {activePlan}
          </span>
        </div>
        <p className="text-[11px] text-slate-400 mb-3">
          <span className="text-amber-400 font-bold font-mono">{credits}</span> free credits available.
        </p>
        <Link 
          href="/billing"
          className="w-full py-1.5 px-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/30 transition-all"
        >
          Upgrade Plan
        </Link>
      </div>
    </aside>
  );
}
