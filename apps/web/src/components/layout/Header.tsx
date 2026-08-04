'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  Coins, 
  Building2, 
  Bell, 
  ChevronDown, 
  Cpu, 
  Plus,
  LogOut,
  User
} from 'lucide-react';
import { useAppStore } from '@/lib/store';

export function Header() {
  const router = useRouter();
  const { credits, activePlan, fetchBilling, searchQuery, setSearchQuery, user, logout } = useAppStore();

  useEffect(() => {
    fetchBilling();
  }, [fetchBilling]);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <header className="h-16 border-b border-slate-800 bg-dark-950/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30 ml-64">
      {/* Left Search Command Bar */}
      <div className="flex items-center gap-4 w-96">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search agents, workflows, knowledge base... (⌘K)"
            className="w-full bg-slate-900/90 border border-slate-800 text-xs rounded-xl pl-9 pr-4 py-2 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-all"
          />
        </div>
      </div>

      {/* Right User Bar */}
      <div className="flex items-center gap-4">
        {/* Model Selector Pill */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
          <Cpu className="w-3.5 h-3.5 text-indigo-400" />
          <span>gpt-4o / Claude 3.5</span>
          <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
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
          <span className="font-medium">NexusMind Corp</span>
        </div>

        {/* Action Button */}
        <Link
          href="/builder"
          className="py-1.5 px-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-blue-600/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>New Workflow</span>
        </Link>

        {/* Notifications */}
        <button className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 transition-all relative">
          <Bell className="w-4 h-4" />
          <span className="w-2 h-2 rounded-full bg-blue-500 absolute top-1.5 right-1.5 animate-ping"></span>
          <span className="w-2 h-2 rounded-full bg-blue-500 absolute top-1.5 right-1.5"></span>
        </button>

        {/* User Profile & Logout */}
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
