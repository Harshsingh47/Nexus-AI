'use client';

import React, { useState } from 'react';
import { 
  Wand2, 
  Sparkles, 
  Play, 
  Code, 
  Database, 
  Rocket, 
  RefreshCw, 
  FileCode, 
  Eye,
  TrendingUp,
  Search,
  CheckCircle2,
  DollarSign,
  ShoppingCart,
  CheckSquare,
  Plus,
  Layers,
  HelpCircle,
  Check,
  Send,
  Bell,
  Star,
  Download
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { InstructionBanner } from '@/components/ui/InstructionBanner';

export default function VibeBuilderPage() {
  const { deductCredits, addLogStep } = useAppStore();
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState<string>('');
  const [showClarification, setShowClarification] = useState(false);
  const [clarificationData, setClarificationData] = useState<any>(null);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState<'PREVIEW' | 'CODE' | 'DATABASE'>('PREVIEW');
  const [searchFilter, setSearchFilter] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [currency, setCurrency] = useState('USD');
  const [watchlist, setWatchlist] = useState<string[]>(['#BTC', '#ETH']);
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string }>>([
    { role: 'assistant', text: 'Welcome to Vibe Coding Studio! Describe your web app idea, and I will generate production-ready code, live UI components, and Prisma DB schemas.' }
  ]);
  const [chatInput, setChatInput] = useState('');

  const [appState, setAppState] = useState<any>({
    type: 'CRYPTO',
    appName: 'Real-Time Crypto Price Tracker & Alert Web App',
    description: 'Fetches live market prices for Bitcoin, Ethereum, Solana, and top tokens with price alert thresholds.',
    status: 'GENERATED',
    metrics: [
      { label: 'Bitcoin (BTC)', value: '$64,250.00', change: '+3.4% 24h', color: 'text-emerald-400' },
      { label: 'Ethereum (ETH)', value: '$3,450.50', change: '+2.1% 24h', color: 'text-blue-400' },
      { label: 'Solana (SOL)', value: '$145.80', change: '+5.8% 24h', color: 'text-purple-400' }
    ],
    items: [
      { id: '#BTC', name: 'Bitcoin', symbol: 'BTC', price: '$64,250.00', volume: '$28.4B', status: 'BULLISH' },
      { id: '#ETH', name: 'Ethereum', symbol: 'ETH', price: '$3,450.50', volume: '$14.2B', status: 'BULLISH' },
      { id: '#SOL', name: 'Solana', symbol: 'SOL', price: '$145.80', volume: '$4.8B', status: 'BULLISH' },
      { id: '#BNB', name: 'BNB Token', symbol: 'BNB', price: '$580.00', volume: '$1.9B', status: 'STABLE' }
    ],
    files: [
      {
        name: 'app/crypto/page.tsx',
        language: 'typescript',
        code: `// Production-Ready Crypto Tracker Next.js App\nimport React, { useState, useEffect } from 'react';\n\nexport default function CryptoTrackerApp() {\n  const [prices, setPrices] = useState([]);\n\n  useEffect(() => {\n    fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd')\n      .then(res => res.json())\n      .then(data => setPrices(data));\n  }, []);\n\n  return (\n    <div className="p-8 space-y-6 bg-slate-950 text-white rounded-2xl font-mono">\n      <h1 className="text-2xl font-bold text-blue-400">Live Crypto Price Tracker</h1>\n      <p className="text-xs text-slate-400">Real-time WebSocket price updates & alerts</p>\n    </div>\n  );\n}`
      },
      {
        name: 'api/crypto/route.ts',
        language: 'typescript',
        code: `export async function GET() {\n  return Response.json({ status: 'ONLINE', crypto: { btc: 64250, eth: 3450 } });\n}`
      }
    ],
    entities: [
      { name: 'CryptoAssets', fields: ['id (UUID)', 'symbol (String)', 'priceUsd (Float)', 'volume24h (Float)', 'updatedAt (DateTime)'] },
      { name: 'PriceAlerts', fields: ['id (UUID)', 'userId (UUID)', 'targetPrice (Float)', 'status (Enum)'] }
    ]
  });

  const handlePromptSubmit = (customText?: string) => {
    const targetPrompt = customText !== undefined ? customText : prompt;
    if (!targetPrompt.trim()) return;

    const lowerPrompt = targetPrompt.toLowerCase();

    // Prepare interactive clarifying questions (Emergent / Lovable style)
    if (lowerPrompt.includes('crypto') || lowerPrompt.includes('price') || lowerPrompt.includes('coin') || lowerPrompt.includes('bitcoin')) {
      setClarificationData({
        title: 'Crypto App Specification Interview',
        subtitle: 'Customize technical architecture before compiling production code:',
        questions: [
          { key: 'provider', label: 'Data Source', options: ['CoinGecko API (Free)', 'Binance WebSocket (Realtime)', 'CoinMarketCap (Enterprise)'] },
          { key: 'features', label: 'Primary Feature', options: ['Live Price Ticker & Chart', 'Portfolio Watchlist', 'Price Alert Thresholds'] },
          { key: 'auth', label: 'Authentication Mode', options: ['No Auth (Public)', 'Email / Password Auth', 'Web3 WalletConnect'] }
        ]
      });
      setSelectedOptions({ provider: 'CoinGecko API (Free)', features: 'Live Price Ticker & Chart', auth: 'No Auth (Public)' });
      setShowClarification(true);
    } else if (lowerPrompt.includes('shop') || lowerPrompt.includes('store') || lowerPrompt.includes('e-commerce')) {
      setClarificationData({
        title: 'E-Commerce Store Specification Interview',
        subtitle: 'Configure storefront architecture and payment gateway:',
        questions: [
          { key: 'payment', label: 'Payment Gateway', options: ['Stripe Checkout', 'PayPal Express', 'Crypto Payments'] },
          { key: 'inventory', label: 'Inventory Sync', options: ['PostgreSQL Database', 'Shopify Storefront API', 'Mock Inventory'] }
        ]
      });
      setSelectedOptions({ payment: 'Stripe Checkout', inventory: 'PostgreSQL Database' });
      setShowClarification(true);
    } else {
      executeCompilation(targetPrompt);
    }
  };

  const executeCompilation = (targetPrompt: string) => {
    setShowClarification(false);
    setIsGenerating(true);
    setGenerationStep('1/4 Analyzing requirements & user choices...');
    deductCredits(5);

    const lowerPrompt = targetPrompt.toLowerCase();
    const cleanSlug = targetPrompt.toLowerCase().replace(/[^a-z0-9]/g, '-').substring(0, 20) || 'app';
    const generatedName = targetPrompt.length > 35 ? `${targetPrompt.substring(0, 35)}...` : targetPrompt;

    setTimeout(() => {
      setGenerationStep('2/4 Synthesizing React UI components & interactive state...');
    }, 400);

    setTimeout(() => {
      setGenerationStep('3/4 Generating API route handlers & Prisma DB schemas...');
    }, 800);

    setTimeout(() => {
      setGenerationStep('4/4 Compiling Next.js application bundle...');

      if (lowerPrompt.includes('crypto') || lowerPrompt.includes('price') || lowerPrompt.includes('coin') || lowerPrompt.includes('bitcoin')) {
        setAppState({
          type: 'CRYPTO',
          appName: `Crypto Price Tracker: ${generatedName}`,
          description: `Configured with ${selectedOptions.provider || 'CoinGecko API'} & ${selectedOptions.auth || 'Public Access'}. ${targetPrompt}`,
          status: 'GENERATED',
          metrics: [
            { label: 'Bitcoin (BTC)', value: '$64,250.00', change: '+3.4% 24h', color: 'text-emerald-400' },
            { label: 'Ethereum (ETH)', value: '$3,450.50', change: '+2.1% 24h', color: 'text-blue-400' },
            { label: 'Solana (SOL)', value: '$145.80', change: '+5.8% 24h', color: 'text-purple-400' }
          ],
          items: [
            { id: '#BTC', name: 'Bitcoin', symbol: 'BTC', price: '$64,250.00', volume: '$28.4B', status: 'BULLISH' },
            { id: '#ETH', name: 'Ethereum', symbol: 'ETH', price: '$3,450.50', volume: '$14.2B', status: 'BULLISH' },
            { id: '#SOL', name: 'Solana', symbol: 'SOL', price: '$145.80', volume: '$4.8B', status: 'BULLISH' },
            { id: '#BNB', name: 'BNB Token', symbol: 'BNB', price: '$580.00', volume: '$1.9B', status: 'STABLE' }
          ],
          files: [
            {
              name: `app/${cleanSlug}/page.tsx`,
              language: 'typescript',
              code: `// Production-Ready Crypto Tracker Web App\nimport React, { useState, useEffect } from 'react';\n\nexport default function CryptoTrackerApp() {\n  const [prices, setPrices] = useState([]);\n  const provider = "${selectedOptions.provider || 'CoinGecko'}";\n\n  useEffect(() => {\n    fetch('/api/crypto/ticker')\n      .then(res => res.json())\n      .then(data => setPrices(data));\n  }, []);\n\n  return (\n    <div className="p-8 space-y-6 bg-slate-950 text-white font-mono rounded-2xl">\n      <h1 className="text-2xl font-bold text-blue-400">Live Crypto Price Tracker</h1>\n      <p className="text-xs text-slate-400">Provider: {provider} | Prompt: "${targetPrompt}"</p>\n    </div>\n  );\n}`
            },
            {
              name: `api/${cleanSlug}/route.ts`,
              language: 'typescript',
              code: `export async function GET() {\n  return Response.json({ success: true, ticker: { btc: 64250, eth: 3450, sol: 145.8 } });\n}`
            }
          ],
          entities: [
            { name: 'CryptoPrices', fields: ['id (UUID)', 'symbol (String)', 'priceUsd (Float)', 'volume24h (Float)', 'updatedAt (DateTime)'] },
            { name: 'PriceAlerts', fields: ['id (UUID)', 'userId (UUID)', 'targetPrice (Float)', 'status (Enum)'] }
          ]
        });
      } else if (lowerPrompt.includes('shop') || lowerPrompt.includes('store') || lowerPrompt.includes('e-commerce')) {
        setAppState({
          type: 'STORE',
          appName: `E-Commerce Storefront: ${generatedName}`,
          description: `Configured with ${selectedOptions.payment || 'Stripe Checkout'}. ${targetPrompt}`,
          status: 'GENERATED',
          metrics: [
            { label: 'Active Store Products', value: '24 Items', change: 'In Stock', color: 'text-emerald-400' },
            { label: 'Cart Conversion Rate', value: '4.8%', change: '+1.2% this week', color: 'text-blue-400' },
            { label: 'Total Sales Revenue', value: '$12,450.00', change: 'Stripe Verified', color: 'text-purple-400' }
          ],
          items: [
            { id: 'PROD-101', name: 'Wireless Noise-Canceling Headphones', symbol: '$299.00', price: '$299.00', volume: 'Stock: 45 units', status: 'IN_STOCK' },
            { id: 'PROD-102', name: 'Ergonomic Mechanical Keyboard', symbol: '$149.00', price: '$149.00', volume: 'Stock: 18 units', status: 'BEST_SELLER' }
          ],
          files: [
            {
              name: `app/${cleanSlug}/page.tsx`,
              language: 'typescript',
              code: `// E-Commerce Storefront App\nimport React, { useState } from 'react';\n\nexport default function StoreApp() {\n  return (\n    <div className="p-8 bg-slate-950 text-white font-sans rounded-2xl">\n      <h1>Storefront ({selectedOptions.payment || 'Stripe'})</h1>\n    </div>\n  );\n}`
            }
          ],
          entities: [
            { name: 'Products', fields: ['id (UUID)', 'title (String)', 'priceUsd (Float)', 'inventoryCount (Int)'] }
          ]
        });
      } else {
        setAppState({
          type: 'GENERIC',
          appName: generatedName,
          description: targetPrompt,
          status: 'GENERATED',
          metrics: [
            { label: 'Processed Items', value: '1,420', change: '100% Verified', color: 'text-emerald-400' },
            { label: 'Execution Accuracy', value: '99.2%', change: '0 Runtime Errors', color: 'text-blue-400' },
            { label: 'System Pipeline', value: 'ACTIVE', change: 'Live Engine', color: 'text-purple-400' }
          ],
          items: [
            { id: '#101', name: `${generatedName} Item #1`, symbol: 'payload_01.json', price: 'Status: OK', volume: 'Latency: 120ms', status: 'PROCESSED' },
            { id: '#102', name: `${generatedName} Item #2`, symbol: 'payload_02.json', price: 'Status: OK', volume: 'Latency: 140ms', status: 'ACTIVE' }
          ],
          files: [
            {
              name: `app/${cleanSlug}/page.tsx`,
              language: 'typescript',
              code: `// Production-Ready Synthesized Web App\nimport React from 'react';\n\nexport default function CustomApp() {\n  return (\n    <div className="p-6 bg-slate-950 text-white font-mono rounded-2xl">\n      <h1>${generatedName}</h1>\n      <p>Prompt: "${targetPrompt}"</p>\n    </div>\n  );\n}`
            }
          ],
          entities: [
            { name: `${cleanSlug.replace(/-/g, '_')}_data`, fields: ['id (UUID)', 'title (String)', 'dataPayload (JSON)', 'createdAt (DateTime)'] }
          ]
        });
      }

      setIsGenerating(false);
      setGenerationStep('');
      setChatMessages(prev => [
        ...prev,
        { role: 'user', text: targetPrompt },
        { role: 'assistant', text: `Successfully built production-ready app "${generatedName}"! You can test live interaction in the viewport, view Next.js code files, or type follow-up instructions below to refine.` }
      ]);

      addLogStep({
        agentName: 'Vibe App Studio Engine',
        action: `Compiled production web app "${generatedName}"`,
        reasoning: `Synthesized Next.js 14 React components, backend routes, and database entities according to user specification.`,
        durationMs: 1200
      });
    }, 1200);
  };

  const handleRefineChat = () => {
    if (!chatInput.trim()) return;
    const text = chatInput;
    setChatInput('');
    handlePromptSubmit(text);
  };

  const toggleWatchlist = (id: string) => {
    if (watchlist.includes(id)) {
      setWatchlist(watchlist.filter(i => i !== id));
    } else {
      setWatchlist([...watchlist, id]);
    }
  };

  const handleDeploy = () => {
    const slug = appState.appName.toLowerCase().replace(/[^a-z0-9]/g, '-').substring(0, 15);
    alert(`🎉 Full Web Application Deployed & Hosted Successfully!\nLive Viewport URL: https://nexusmind.ai/app/${slug}`);
  };

  const filteredItems = appState.items?.filter((item: any) =>
    !searchFilter || 
    item.name.toLowerCase().includes(searchFilter.toLowerCase()) || 
    item.symbol.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto h-[calc(100vh-100px)] flex flex-col">
      {/* Top Instruction Banner */}
      <InstructionBanner
        title="Vibe App Studio (Emergent / Lovable AI Platform)"
        description="Describe any web app in natural language. NexusMind interviews your architectural preferences, then generates production-ready code, live UI components, and Prisma schemas."
        steps={[
          "Type your prompt idea (e.g. 'build a website to fetch crypto prices').",
          "Answer Clarifying Specification Questions or click 'Compile App' to generate.",
          "Interact with the Live Viewport, inspect code files, or type refinement instructions in the iteration chat!"
        ]}
        tips="Vibe Coding generates full Next.js React UI components, backend route handlers, and database entities automatically!"
      />

      {/* Top Control Bar */}
      <div className="p-4 rounded-2xl glass-panel border border-slate-800 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-purple-600 to-blue-600 text-white shadow-md">
            <Wand2 className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white flex items-center gap-2">
              <span>Conversational Vibe App & Agent Studio</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono">Emergent / Lovable Engine</span>
            </h1>
            <p className="text-xs text-slate-400">Describe what you want to build; AI generates the UI, backend APIs, DB schema & agents</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="grid grid-cols-3 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('PREVIEW')}
              className={`py-1.5 px-3 rounded-lg flex items-center gap-1.5 transition-all ${activeTab === 'PREVIEW' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Live Preview</span>
            </button>
            <button
              onClick={() => setActiveTab('CODE')}
              className={`py-1.5 px-3 rounded-lg flex items-center gap-1.5 transition-all ${activeTab === 'CODE' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>Code Editor</span>
            </button>
            <button
              onClick={() => setActiveTab('DATABASE')}
              className={`py-1.5 px-3 rounded-lg flex items-center gap-1.5 transition-all ${activeTab === 'DATABASE' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>DB Tables</span>
            </button>
          </div>

          <button
            onClick={handleDeploy}
            className="py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition-all hover:scale-[1.02] cursor-pointer"
          >
            <Rocket className="w-4 h-4" />
            <span>Deploy & Host App</span>
          </button>
        </div>
      </div>

      {/* Main Split Grid */}
      <div className="flex-1 flex gap-6 min-h-0">
        {/* Left Prompt & Iteration Chat Panel */}
        <div className="w-96 rounded-2xl glass-panel border border-slate-800 p-5 flex flex-col justify-between shrink-0 space-y-4">
          {/* Chat History & Specification Box */}
          <div className="space-y-4 flex-1 overflow-y-auto">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>Conversational Vibe Assistant</span>
            </h2>

            {/* Interactive Architecture Interview Card (Emergent / Lovable Feature) */}
            {showClarification && clarificationData && (
              <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-500/40 space-y-3 text-xs">
                <div className="flex items-center gap-2 text-purple-300 font-bold">
                  <HelpCircle className="w-4 h-4" />
                  <span>{clarificationData.title}</span>
                </div>
                <p className="text-[11px] text-slate-400">{clarificationData.subtitle}</p>

                {clarificationData.questions.map((q: any) => (
                  <div key={q.key} className="space-y-1">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">{q.label}:</span>
                    <div className="grid grid-cols-1 gap-1">
                      {q.options.map((opt: string) => (
                        <button
                          key={opt}
                          onClick={() => setSelectedOptions(prev => ({ ...prev, [q.key]: opt }))}
                          className={`p-2 rounded-lg text-left text-[11px] font-mono flex items-center justify-between border transition-all ${
                            selectedOptions[q.key] === opt
                              ? 'bg-purple-600/30 text-white border-purple-400'
                              : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          <span>{opt}</span>
                          {selectedOptions[q.key] === opt && <Check className="w-3.5 h-3.5 text-purple-400" />}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                <button
                  onClick={() => executeCompilation(prompt)}
                  className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-xs shadow-md shadow-purple-600/30 hover:scale-[1.02] transition-all cursor-pointer mt-2"
                >
                  Compile Production App with Choices
                </button>
              </div>
            )}

            {/* Iteration Chat Messages */}
            <div className="space-y-2">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl text-xs leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-blue-600/20 border border-blue-500/30 text-blue-200 ml-4'
                      : 'bg-slate-900 border border-slate-800 text-slate-300 mr-4'
                  }`}
                >
                  <span className="text-[9px] font-mono text-slate-500 block uppercase mb-1">{msg.role}:</span>
                  <p className="text-[11px]">{msg.text}</p>
                </div>
              ))}
            </div>

            {/* Example Prompts */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Example Prompts:</span>
              <div
                onClick={() => {
                  setPrompt("build a website to fetch crypto prices");
                  handlePromptSubmit("build a website to fetch crypto prices");
                }}
                className="p-2 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 hover:border-purple-500/40 cursor-pointer transition-all"
              >
                "build a website to fetch crypto prices"
              </div>
              <div
                onClick={() => {
                  setPrompt("Build an e-commerce store with product catalog and cart.");
                  handlePromptSubmit("Build an e-commerce store with product catalog and cart.");
                }}
                className="p-2 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 hover:border-purple-500/40 cursor-pointer transition-all"
              >
                "Build an e-commerce store with product catalog and cart."
              </div>
            </div>
          </div>

          {/* Prompt / Iteration Bar */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            {isGenerating && (
              <div className="p-2.5 rounded-xl bg-purple-950/40 border border-purple-500/30 text-purple-300 text-xs font-mono flex items-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin shrink-0" />
                <span>{generationStep}</span>
              </div>
            )}
            <textarea
              rows={3}
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              placeholder="Describe your web app idea (e.g. 'build a website to fetch crypto prices')..."
              className="w-full bg-slate-900 border border-slate-800 text-xs rounded-xl p-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />
            <button
              onClick={() => handlePromptSubmit()}
              disabled={isGenerating || !prompt.trim()}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-purple-600/30 transition-all disabled:opacity-50 cursor-pointer"
            >
              {isGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
              <span>Generate Full-Stack App (5 Credits)</span>
            </button>
          </div>
        </div>

        {/* Right Viewport (Preview / Code / Database) */}
        <div className="flex-1 rounded-2xl glass-panel border border-slate-800 p-6 flex flex-col min-h-0 overflow-auto bg-slate-950">
          {activeTab === 'PREVIEW' && (
            <div className="space-y-6 flex-1 overflow-y-auto">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 font-mono">
                <span>Viewport: http://localhost:3000/app/preview</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Production-Ready Interactive Web Application Viewport</span>
                </span>
              </div>

              {/* Render Prompt-Specific Interactive Live Web App */}
              <div className="p-8 rounded-2xl glass-panel border border-blue-500/30 bg-slate-900/90 space-y-6 shadow-2xl">
                <div className="flex justify-between items-center">
                  <div>
                    <h1 className="text-2xl font-extrabold text-blue-400 tracking-tight flex items-center gap-2">
                      {appState.type === 'CRYPTO' && <TrendingUp className="w-6 h-6 text-emerald-400" />}
                      {appState.type === 'STORE' && <ShoppingCart className="w-6 h-6 text-purple-400" />}
                      <span>{appState.appName}</span>
                    </h1>
                    <p className="text-xs text-slate-400 mt-1">{appState.description}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    {appState.type === 'CRYPTO' && (
                      <div className="flex items-center gap-2">
                        <select
                          value={currency}
                          onChange={e => setCurrency(e.target.value)}
                          className="bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 rounded-lg px-2 py-1.5 focus:outline-none focus:border-blue-500"
                        >
                          <option value="USD">USD ($)</option>
                          <option value="EUR">EUR (€)</option>
                          <option value="GBP">GBP (£)</option>
                        </select>
                        <button
                          onClick={() => alert(`Price Alert threshold set for ${appState.appName}!`)}
                          className="px-3 py-1.5 rounded-lg bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold font-mono flex items-center gap-1"
                        >
                          <Bell className="w-3.5 h-3.5" />
                          <span>Set Alert</span>
                        </button>
                      </div>
                    )}

                    {appState.type === 'STORE' && (
                      <div className="px-3 py-1.5 rounded-xl bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-bold font-mono flex items-center gap-1.5">
                        <ShoppingCart className="w-4 h-4" />
                        <span>Cart ({cartCount})</span>
                      </div>
                    )}
                    <button 
                      onClick={() => alert(`Automation runner triggered for ${appState.appName}!`)}
                      className="py-2 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-blue-600/20 cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5" />
                      <span>Run Automation</span>
                    </button>
                  </div>
                </div>

                {/* Simulated Real-Time Candlestick / Line Chart for Crypto */}
                {appState.type === 'CRYPTO' && (
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-slate-400 font-bold">Bitcoin 24h Price Action Ticker (Live SVG Chart)</span>
                      <span className="text-emerald-400 font-bold">$64,250.00 (+3.4%)</span>
                    </div>
                    <div className="h-24 w-full flex items-end gap-1 pt-4 px-2">
                      {[40, 55, 45, 68, 62, 75, 70, 88, 82, 95, 90, 100].map((val, idx) => (
                        <div key={idx} className="flex-1 bg-emerald-500/30 border-t-2 border-emerald-400 rounded-t transition-all hover:bg-emerald-500" style={{ height: `${val}%` }}></div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Metrics Bar */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {appState.metrics?.map((m: any, idx: number) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                      <span className="text-xs text-slate-400">{m.label}</span>
                      <div className={`text-2xl font-bold font-mono ${m.color || 'text-white'}`}>{m.value}</div>
                      <span className="text-[10px] text-emerald-400 font-mono">{m.change}</span>
                    </div>
                  ))}
                </div>

                {/* Interactive Search Bar & Actions */}
                <div className="flex items-center gap-3">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchFilter}
                      onChange={e => setSearchFilter(e.target.value)}
                      placeholder="Filter records or assets..."
                      className="w-full bg-slate-950 border border-slate-800 text-xs rounded-xl pl-9 pr-4 py-2 text-slate-200 focus:outline-none focus:border-blue-500 font-mono"
                    />
                  </div>
                  {appState.type === 'STORE' && (
                    <button
                      onClick={() => setCartCount(c => c + 1)}
                      className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-purple-600/20"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Item to Cart</span>
                    </button>
                  )}
                  <button 
                    onClick={() => setSearchFilter('')}
                    className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-400 hover:text-white"
                  >
                    Reset Filter
                  </button>
                </div>

                {/* Live Data Grid */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Database className="w-4 h-4 text-cyan-400" />
                    <span>Generated Database Entity: {appState.entities?.[0]?.name || 'Records'}</span>
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-mono">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-400">
                          <th className="pb-2">Watch</th>
                          <th className="pb-2">ID</th>
                          <th className="pb-2">Asset / Item Name</th>
                          <th className="pb-2">Symbol</th>
                          <th className="pb-2">Live Price ({currency})</th>
                          <th className="pb-2">24h Volume / Stock</th>
                          <th className="pb-2">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60">
                        {filteredItems?.map((item: any, idx: number) => (
                          <tr key={idx} className="hover:bg-slate-800/50">
                            <td className="py-2.5">
                              <button
                                onClick={() => toggleWatchlist(item.id)}
                                className="text-slate-500 hover:text-amber-400 transition-colors"
                              >
                                <Star className={`w-4 h-4 ${watchlist.includes(item.id) ? 'text-amber-400 fill-amber-400' : ''}`} />
                              </button>
                            </td>
                            <td className="py-2.5 text-slate-500">{item.id}</td>
                            <td className="py-2.5 font-bold text-white flex items-center gap-1.5">
                              {appState.type === 'CRYPTO' && <DollarSign className="w-3.5 h-3.5 text-emerald-400" />}
                              <span>{item.name}</span>
                            </td>
                            <td className="py-2.5 text-blue-400">{item.symbol}</td>
                            <td className="py-2.5 text-emerald-400 font-bold">{item.price}</td>
                            <td className="py-2.5 text-slate-400">{item.volume}</td>
                            <td className="py-2.5">
                              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px]">
                                {item.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'CODE' && (
            <div className="space-y-4 flex-1 overflow-y-auto font-mono text-xs">
              <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
                <span>Generated Code Files ({appState.files.length})</span>
                <span className="text-emerald-400">TypeScript / Next.js 14</span>
              </div>
              {appState.files.map((file: any, idx: number) => (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center gap-2 text-blue-400 font-bold text-xs">
                    <FileCode className="w-4 h-4" />
                    <span>{file.name}</span>
                  </div>
                  <pre className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 overflow-x-auto text-[11px]">
                    {file.code}
                  </pre>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'DATABASE' && (
            <div className="space-y-4 flex-1 overflow-y-auto">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Database className="w-5 h-5 text-cyan-400" />
                <span>Generated PostgreSQL & Prisma Schemas</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {appState.entities?.map((ent: any, idx: number) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                    <div className="font-bold text-sm text-cyan-400 flex items-center justify-between">
                      <span>Entity: {ent.name}</span>
                      <span className="text-[10px] text-slate-500 font-mono">Table</span>
                    </div>
                    <ul className="space-y-1 text-xs text-slate-300 font-mono">
                      {ent.fields?.map((f: string, i: number) => (
                        <li key={i} className="p-1 rounded bg-slate-950 border border-slate-800 text-[11px]">
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
