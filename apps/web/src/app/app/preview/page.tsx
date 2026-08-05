'use client';

import React, { useState } from 'react';
import { 
  ShoppingCart, 
  TrendingUp, 
  Search, 
  Plus, 
  Star, 
  Play, 
  CheckCircle2, 
  DollarSign, 
  Database,
  ArrowLeft
} from 'lucide-react';
import Link from 'next/link';

export default function AppPreviewPage() {
  const [cartCount, setCartCount] = useState(0);
  const [searchFilter, setSearchFilter] = useState('');
  const [watchlist, setWatchlist] = useState<string[]>(['#PROD-101']);

  const items = [
    { id: '#PROD-101', name: 'Wireless Noise-Canceling Headphones', symbol: '$299.00', price: '$299.00', volume: 'Stock: 45 units', status: 'IN_STOCK' },
    { id: '#PROD-102', name: 'Ergonomic Mechanical Keyboard', symbol: '$149.00', price: '$149.00', volume: 'Stock: 18 units', status: 'BEST_SELLER' },
    { id: '#PROD-103', name: 'Ultra-Wide 4K Gaming Monitor', symbol: '$699.00', price: '$699.00', volume: 'Stock: 8 units', status: 'LOW_STOCK' },
    { id: '#PROD-104', name: 'Smart Desk Ambient Lighting Strip', symbol: '$79.00', price: '$79.00', volume: 'Stock: 120 units', status: 'NEW_RELEASE' }
  ];

  const filteredItems = items.filter(i => 
    !searchFilter || i.name.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between p-4 rounded-2xl glass-panel border border-slate-800">
        <div className="flex items-center gap-3">
          <Link 
            href="/vibe-builder"
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-mono"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Vibe Studio</span>
          </Link>
          <span className="text-xs text-slate-400 font-mono">Live Standalone App Viewport</span>
        </div>

        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Full-Stack Application Deployed</span>
        </div>
      </div>

      {/* Main Interactive App Body */}
      <div className="max-w-7xl mx-auto p-8 rounded-3xl glass-panel border border-blue-500/30 bg-slate-900/90 space-y-6 shadow-2xl">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold text-blue-400 tracking-tight flex items-center gap-2">
              <ShoppingCart className="w-7 h-7 text-purple-400" />
              <span>Full-Stack E-Commerce Storefront</span>
            </h1>
            <p className="text-xs text-slate-400 mt-1">Enterprise storefront featuring product catalog, cart drawer, inventory tracking, and Stripe checkout.</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 rounded-xl bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-bold font-mono flex items-center gap-1.5">
              <ShoppingCart className="w-4 h-4" />
              <span>Cart ({cartCount})</span>
            </div>
            <button 
              onClick={() => alert('Automation runner triggered for Storefront!')}
              className="py-2 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-blue-600/20"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Run Automation</span>
            </button>
          </div>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-xs text-slate-400">Active Store Products</span>
            <div className="text-2xl font-bold font-mono text-emerald-400">48 Products</div>
            <span className="text-[10px] text-emerald-400 font-mono">In Stock</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-xs text-slate-400">Cart Conversion Rate</span>
            <div className="text-2xl font-bold font-mono text-blue-400">4.8%</div>
            <span className="text-[10px] text-emerald-400 font-mono">+1.2% this week</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="text-xs text-slate-400">Total Store Revenue</span>
            <div className="text-2xl font-bold font-mono text-purple-400">$18,920.00</div>
            <span className="text-[10px] text-emerald-400 font-mono">Stripe Verified</span>
          </div>
        </div>

        {/* Interactive Search & Filter */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchFilter}
              onChange={e => setSearchFilter(e.target.value)}
              placeholder="Search store products..."
              className="w-full bg-slate-950 border border-slate-800 text-xs rounded-xl pl-9 pr-4 py-2 text-slate-200 focus:outline-none focus:border-blue-500 font-mono"
            />
          </div>
          <button
            onClick={() => setCartCount(c => c + 1)}
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-purple-600/20"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product to Cart</span>
          </button>
        </div>

        {/* Table Data */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Database className="w-4 h-4 text-cyan-400" />
            <span>Products Inventory Database</span>
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="pb-2">Watch</th>
                  <th className="pb-2">ID</th>
                  <th className="pb-2">Product Name</th>
                  <th className="pb-2">Price</th>
                  <th className="pb-2">Inventory Stock</th>
                  <th className="pb-2">Status</th>
                  <th className="pb-2">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredItems.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/50">
                    <td className="py-2.5">
                      <button
                        onClick={() => {
                          if (watchlist.includes(item.id)) {
                            setWatchlist(watchlist.filter(i => i !== item.id));
                          } else {
                            setWatchlist([...watchlist, item.id]);
                          }
                        }}
                        className="text-slate-500 hover:text-amber-400 transition-colors"
                      >
                        <Star className={`w-4 h-4 ${watchlist.includes(item.id) ? 'text-amber-400 fill-amber-400' : ''}`} />
                      </button>
                    </td>
                    <td className="py-2.5 text-slate-500">{item.id}</td>
                    <td className="py-2.5 font-bold text-white">{item.name}</td>
                    <td className="py-2.5 text-emerald-400 font-bold">{item.price}</td>
                    <td className="py-2.5 text-slate-400">{item.volume}</td>
                    <td className="py-2.5">
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px]">
                        {item.status}
                      </span>
                    </td>
                    <td className="py-2.5">
                      <button
                        onClick={() => setCartCount(c => c + 1)}
                        className="px-2.5 py-1 rounded bg-purple-600/30 text-purple-300 hover:bg-purple-600/50 text-[10px] font-bold"
                      >
                        + Cart
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
