import React from 'react';
import Link from 'next/link';
import { 
  Zap, 
  Bot, 
  GitFork, 
  Wand2, 
  Database, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles,
  CheckCircle2,
  Globe,
  Code
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-dark-950 text-white -ml-64 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-b from-blue-600/15 via-purple-600/10 to-transparent rounded-full blur-3xl -z-10"></div>
      
      {/* Landing Navigation Header */}
      <header className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="font-extrabold text-xl tracking-tight text-white">NexusMind AI</span>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-xs font-semibold text-slate-300 hover:text-white px-4 py-2 rounded-xl transition-all"
          >
            Sign In
          </Link>
          <Link
            href="/dashboard"
            className="py-2.5 px-5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02]"
          >
            <span>Launch Platform</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto text-center px-6 pt-16 pb-20 space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Enterprise Autonomous Multi-Agent & Vibe App Platform</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
          Create, Orchestrate & Deploy <br />
          <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
            Autonomous AI Agents
          </span>
        </h1>

        <p className="text-slate-400 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
          NexusMind empowers teams to build multi-step AI workflows, execute Playwright web research, run isolated Python code sandboxes, query vector RAG knowledge, and synthesize web apps in natural language.
        </p>

        <div className="flex items-center justify-center gap-4 pt-4">
          <Link
            href="/dashboard"
            className="py-3.5 px-7 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-sm flex items-center gap-2 shadow-xl shadow-blue-600/30 transition-all hover:scale-[1.02]"
          >
            <span>Explore Command Center</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/vibe-builder"
            className="py-3.5 px-7 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-bold text-sm flex items-center gap-2 transition-all"
          >
            <Wand2 className="w-4 h-4 text-purple-400" />
            <span>Vibe App Studio</span>
          </Link>
        </div>
      </section>

      {/* Grid Features */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 rounded-3xl glass-panel border border-slate-800 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
            <GitFork className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Visual Flow Canvas</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Drag and drop Playwright browser nodes, LLM calls, decision splits, Python code interpreters, and vector RAG search nodes.
          </p>
        </div>

        <div className="p-8 rounded-3xl glass-panel border border-slate-800 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
            <Wand2 className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">Conversational Vibe Studio</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Describe web apps or AI agents in natural language. NexusMind generates full-stack UI code, backend route handlers, and database schemas.
          </p>
        </div>

        <div className="p-8 rounded-3xl glass-panel border border-slate-800 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center">
            <Database className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-white">RAG & Vector Knowledge</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Ingest PDFs, Word documents, CSV files, and repositories into vector search with similarity chunk matching and source citations.
          </p>
        </div>
      </section>
    </div>
  );
}
