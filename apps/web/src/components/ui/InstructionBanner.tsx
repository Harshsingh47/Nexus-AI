'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles, BookOpen } from 'lucide-react';

interface InstructionBannerProps {
  title: string;
  description: string;
  steps: string[];
  tips?: string;
}

export function InstructionBanner({ title, description, steps, tips }: InstructionBannerProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="rounded-2xl border border-blue-500/30 bg-gradient-to-r from-blue-950/40 via-dark-950 to-indigo-950/30 overflow-hidden transition-all shadow-md">
      {/* Header Toggle Bar */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex items-center justify-between text-left hover:bg-blue-500/5 transition-colors"
      >
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white flex items-center gap-2">
              <span>Quick Guide & Instructions: {title}</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono">
                How to use
              </span>
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">{description}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400 font-medium shrink-0">
          <span>{isOpen ? 'Hide Instructions' : 'Show Instructions'}</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {/* Collapsible Content */}
      {isOpen && (
        <div className="px-5 pb-5 pt-1 border-t border-slate-800/80 space-y-3 text-xs">
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">
              Step-by-Step Usage:
            </span>
            <ol className="space-y-1.5 list-decimal list-inside text-slate-300">
              {steps.map((step, idx) => (
                <li key={idx} className="leading-relaxed">
                  <span className="text-slate-200">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {tips && (
            <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start gap-2 text-[11px] text-amber-300">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span><strong>Pro Tip:</strong> {tips}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
