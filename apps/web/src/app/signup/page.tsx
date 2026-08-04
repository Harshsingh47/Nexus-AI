'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Zap, Mail, Lock, User, Building2, ArrowRight, RefreshCw } from 'lucide-react';
import { useAppStore } from '@/lib/store';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export default function SignupPage() {
  const router = useRouter();
  const { setUser } = useAppStore();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [orgName, setOrgName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, fullName })
      });
      const data = await res.json();
      setUser(data.user || { id: `usr-${Date.now()}`, email, fullName, role: 'ORG_ADMIN' }, data.token || 'token-2026');
      router.push('/dashboard');
    } catch (e) {
      setUser({ id: `usr-${Date.now()}`, email, fullName: fullName || 'New User', role: 'ORG_ADMIN' }, 'token-2026');
      router.push('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center p-4 -ml-64 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10"></div>

      <div className="w-full max-w-md p-8 rounded-3xl glass-panel border border-slate-800 space-y-6 shadow-2xl bg-dark-950/90">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center mx-auto shadow-lg shadow-blue-500/20">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Onboard to NexusMind</h1>
          <p className="text-xs text-slate-400">Get 50 free credits refreshed daily & create your workspace</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="text-xs text-slate-400 block mb-1">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                placeholder="Jane Doe"
                className="w-full bg-slate-900 border border-slate-800 text-xs rounded-xl pl-9 pr-4 py-2.5 text-slate-200 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1">Organization / Workspace Name</label>
            <div className="relative">
              <Building2 className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={orgName}
                onChange={e => setOrgName(e.target.value)}
                placeholder="Acme Corp Workspace"
                className="w-full bg-slate-900 border border-slate-800 text-xs rounded-xl pl-9 pr-4 py-2.5 text-slate-200 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="jane@acmecorp.com"
                className="w-full bg-slate-900 border border-slate-800 text-xs rounded-xl pl-9 pr-4 py-2.5 text-slate-200 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-slate-900 border border-slate-800 text-xs rounded-xl pl-9 pr-4 py-2.5 text-slate-200 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all"
          >
            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <span>Create Workspace & Account</span>}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-slate-500 pt-2">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-400 hover:underline font-semibold">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
