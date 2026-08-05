'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  Coins, 
  Building2, 
  Bell, 
  Cpu, 
  Plus,
  LogOut,
  Sparkles,
  X
} from 'lucide-react';
import { useAppStore } from '@/lib/store';

export function Header() {
  const router = useRouter();
  const { 
    credits, 
    activePlan, 
    fetchBilling, 
    searchQuery, 
    setSearchQuery, 
    user, 
    logout,
    selectedModel,
    setSelectedModel
  } = useAppStore();

  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    fetchBilling();
  }, [fetchBilling]);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const models = [
    { value: 'gpt-4o', label: 'OpenAI gpt-4o' },
    { value: 'claude-3-5-sonnet-20240620', label: 'Claude 3.5 Sonnet' },
    { value: 'llama-3.1-70b-versatile', label: 'Groq Llama 3.1 70B' },
    { value: 'gemini-1.5-pro', label: 'Google Gemini 1.5 Pro' }
  ];

  return (
    <header className="h-16 border-b border-slate-800 bg-dark-950/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30 ml-64">
      {/* Left Search Command Bar */}
      <div className="flex items-center gap-3 w-96">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search agents, workflows, knowledge base..."
            className="w-full bg-slate-900/90 border border-slate-800 text-xs rounded-xl pl-9 pr-4 py-2 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-all"
          />
        </div>
      </div>

      {/* Right User Bar & Global Indicators */}
      <div className="flex items-center gap-4">
        {/* Environment / Demo Indicator */}
        <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-semibold font-mono">
          <Sparkles className="w-3 h-3 animate-pulse" />
          <span>Interactive Environment</span>
        </div>

        {/* Functional Model Selector */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
          <Cpu className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="bg-transparent text-xs text-slate-200 focus:outline-none cursor-pointer pr-1"
          >
            {models.map(m => (
              <option key={m.value} value={m.value} className="bg-slate-900 text-white">
                {m.label}
              </option>
            ))}
          </select>
        </div>

        {/* Dynamic Credit Meter Pill */}
        <Link 
          href="/billing"
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-950/80 to-indigo-950/80 border border-blue-500/30 hover:border-blue-400 text-xs transition-all shadow-sm group"
        >
          <Coins className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-white font-mono">{credits}</span>
            <span className="text-[10px] text-blue-300 uppercase tracking-wider">Credits</span>
          </div>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 font-mono font-semibold ml-1">
            {activePlan}
          </span>
        </Link>

        {/* Organization Switcher */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
          <Building2 className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-medium">{user?.fullName ? `${user.fullName}'s Workspace` : 'NexusMind Corp'}</span>
        </div>

        {/* Action Button */}
        <Link
          href="/builder"
          className="py-1.5 px-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-blue-600/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>New Workflow</span>
        </Link>

        {/* Functional Notifications Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 transition-all relative"
          >
            <Bell className="w-4 h-4" />
            <span className="w-2 h-2 rounded-full bg-blue-500 absolute top-1.5 right-1.5 animate-ping"></span>
            <span className="w-2 h-2 rounded-full bg-blue-500 absolute top-1.5 right-1.5"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl glass-panel border border-slate-800 bg-slate-950 p-4 space-y-3 shadow-2xl z-50 text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="font-bold text-white">System Activity</span>
                <button onClick={() => setShowNotifications(false)} className="text-slate-500 hover:text-slate-300">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="space-y-2">
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <p className="font-semibold text-blue-400">Daily Free Refreshed</p>
                  <p className="text-[10px] text-slate-400">50 daily credits added to your workspace.</p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <p className="font-semibold text-emerald-400">Agent Roster Synced</p>
                  <p className="text-[10px] text-slate-400">Multi-agent worker tools initialized.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile & Functional Logout */}
        {user ? (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center font-bold text-xs text-white shadow-md">
              {user.fullName ? user.fullName.substring(0, 2).toUpperCase() : 'EA'}
            </div>
            <button
              onClick={handleLogout}
              title="Sign Out"
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-400 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            className="py-1.5 px-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:text-white font-medium"
          >
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
}
