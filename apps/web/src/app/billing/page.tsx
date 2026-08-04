'use client';

import React, { useState } from 'react';
import { 
  CreditCard, 
  Coins, 
  CheckCircle2, 
  RefreshCw
} from 'lucide-react';
import { SUBSCRIPTION_TIERS_CONFIG, SubscriptionPlanTier } from '@nexusmind/shared';
import { useAppStore } from '@/lib/store';
import { InstructionBanner } from '@/components/ui/InstructionBanner';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export default function BillingPage() {
  const { credits, activePlan, setPlan } = useAppStore();
  const [loadingTier, setLoadingTier] = useState<string | null>(null);

  const handleSubscribe = async (tier: SubscriptionPlanTier) => {
    setLoadingTier(tier);
    try {
      await fetch(`${API_BASE}/billing/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planTier: tier })
      }).catch(() => null);

      setPlan(tier);
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingTier(null);
    }
  };

  const plans = Object.values(SUBSCRIPTION_TIERS_CONFIG);

  return (
    <div className="space-y-10 max-w-7xl mx-auto">
      {/* Instruction Banner */}
      <InstructionBanner
        title="Subscription & Credit Metering Dashboard"
        description="Monitor daily free refreshed credits and upgrade to Weekly, Monthly, or Yearly plans."
        steps={[
          "Daily Refresh: Every user receives 50 free credits refreshed automatically every 24 hours.",
          "Compare Plans: Review included features for Weekly ($9/wk), Monthly ($29/mo), Yearly ($249/yr), and Enterprise ($999/mo).",
          "Upgrade Plan: Click 'Upgrade' on any plan card to add credits and update your plan tier dynamically!"
        ]}
        tips="Upgrading to a subscription plan instantly adds credits to your account and updates the header & sidebar badges!"
      />

      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-8 rounded-3xl glass-panel border border-amber-500/30 bg-gradient-to-r from-amber-950/40 via-dark-950 to-blue-950/40">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-3">
            <Coins className="w-3.5 h-3.5" />
            <span>Daily Free Credit Refresh Active</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">Subscription & Usage Metering</h1>
          <p className="text-xs text-slate-400 mt-2 max-w-xl leading-relaxed">
            Every user gets 50 free credits refreshed automatically every 24 hours. Upgrade to Weekly, Monthly, or Yearly plans for higher execution volumes, Playwright browser automation, and multi-agent parallelism.
          </p>
        </div>

        {/* Current Balance Box */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 text-right shrink-0 min-w-56 space-y-1">
          <span className="text-xs text-slate-400 font-medium block">Current Balance</span>
          <div className="text-3xl font-extrabold text-white font-mono flex items-center justify-end gap-2">
            <Coins className="w-6 h-6 text-amber-400" />
            <span>{credits}</span>
          </div>
          <span className="text-[10px] text-emerald-400 font-mono block">Active Plan: {activePlan}</span>
        </div>
      </div>

      {/* Subscription Plans Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-blue-400" />
            <span>Subscription Plans</span>
          </h2>
          <span className="text-xs text-slate-400">Flexible options: Daily free, Weekly, Monthly, or Yearly</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
          {plans.map((plan) => {
            const isCurrent = activePlan === plan.tier;
            const isPopular = plan.tier === SubscriptionPlanTier.MONTHLY;

            return (
              <div 
                key={plan.tier}
                className={`p-6 rounded-2xl glass-card border flex flex-col justify-between relative transition-all ${
                  isPopular 
                    ? 'border-blue-500 bg-gradient-to-b from-blue-950/40 to-slate-900 shadow-xl shadow-blue-500/10' 
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                {isPopular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider shadow-md">
                    Most Popular
                  </span>
                )}

                <div>
                  <h3 className="font-bold text-base text-white">{plan.name}</h3>
                  <div className="my-4">
                    <span className="text-3xl font-extrabold text-white font-mono">${plan.price}</span>
                    <span className="text-xs text-slate-400">/{plan.billingCycle}</span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 mb-4 text-xs font-mono">
                    <div className="text-amber-400 font-bold">{plan.creditsAllocated.toLocaleString()} Credits</div>
                    <div className="text-[10px] text-slate-500">{plan.dailyFreeCreditRefresh} daily refreshed</div>
                  </div>

                  <ul className="space-y-2 mb-6 text-xs text-slate-300">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => handleSubscribe(plan.tier)}
                  disabled={isCurrent || loadingTier === plan.tier}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all shadow-md ${
                    isCurrent
                      ? 'bg-slate-800 text-slate-400 border border-slate-700 cursor-default'
                      : isPopular
                      ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30'
                      : 'bg-slate-900 hover:bg-slate-800 text-white border border-slate-700'
                  }`}
                >
                  {loadingTier === plan.tier ? (
                    <RefreshCw className="w-4 h-4 animate-spin mx-auto" />
                  ) : isCurrent ? (
                    'Current Plan'
                  ) : (
                    `Upgrade (${plan.name})`
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
