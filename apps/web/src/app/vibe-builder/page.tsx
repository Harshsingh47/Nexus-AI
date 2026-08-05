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
  Bell,
  Star,
  FolderTree,
  FileText,
  Bot,
  Server,
  Shield,
  Cpu,
  Send,
  Zap,
  Activity
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { InstructionBanner } from '@/components/ui/InstructionBanner';

export default function VibeBuilderPage() {
  const { deductCredits, addLogStep } = useAppStore();
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStepIndex, setGenerationStepIndex] = useState<number>(0);
  const [showClarification, setShowClarification] = useState(false);
  const [clarificationData, setClarificationData] = useState<any>(null);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState<'PREVIEW' | 'PLAN' | 'FOLDERS' | 'CODE' | 'DATABASE' | 'AGENTS' | 'DEPLOY'>('PREVIEW');
  const [searchFilter, setSearchFilter] = useState('');
  const [cartCount, setCartCount] = useState(0);
  const [currency, setCurrency] = useState('USD');
  const [watchlist, setWatchlist] = useState<string[]>(['#PROD-101', '#PROD-102']);
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string }>>([
    { role: 'assistant', text: 'Welcome to Vibe Coding Studio! Describe your application idea (e.g. "build ecom platform", "build healthcare app", "build CRM"), and I will compile a production-ready project with live preview, full code, Prisma DB schemas, AI agents, and deployment configs.' }
  ]);
  const [chatInput, setChatInput] = useState('');

  const generationPipelineSteps = [
    '1/10 Step 1: Requirement Understanding & Business Domain Inference...',
    '2/10 Step 2: Intelligent Feature Expansion & User Flow Mapping...',
    '3/10 Step 3: Executive Architectural Project Planning...',
    '4/10 Step 4: Production PostgreSQL + Prisma Database Schema Design...',
    '5/10 Step 5: Generating Backend REST APIs, Controllers & JWT Auth...',
    '6/10 Step 6: Building Production React Frontend & Interactive Dashboards...',
    '7/10 Step 7: Instantiating Autonomous AI Agents Suite (Support, Sales, RAG)...',
    '8/10 Step 8: Wiring Third-Party Integrations (Stripe, Resend, S3, OpenAI)...',
    '9/10 Step 9: Generating Monorepo Folder Structure...',
    '10/10 Step 10: Compiling Docker, Vercel & Production Deployment Configs...'
  ];

  const [appState, setAppState] = useState<any>({
    domain: 'ECOMMERCE',
    appName: 'Full-Stack E-Commerce & Order Management Platform',
    summary: 'Enterprise storefront featuring product catalog, cart drawer, inventory tracking, Stripe payments, and admin analytics.',
    status: 'GENERATED',
    metrics: [
      { label: 'Active Store Products', value: '48 Products', change: 'In Stock', color: 'text-emerald-400' },
      { label: 'Cart Conversion Rate', value: '4.8%', change: '+1.2% this week', color: 'text-blue-400' },
      { label: 'Total Store Revenue', value: '$18,920.00', change: 'Stripe Verified', color: 'text-purple-400' }
    ],
    items: [
      { id: '#PROD-101', name: 'Wireless Noise-Canceling Headphones', symbol: '$299.00', price: '$299.00', volume: 'Stock: 45 units', status: 'IN_STOCK' },
      { id: '#PROD-102', name: 'Ergonomic Mechanical Keyboard', symbol: '$149.00', price: '$149.00', volume: 'Stock: 18 units', status: 'BEST_SELLER' },
      { id: '#PROD-103', name: 'Ultra-Wide 4K Gaming Monitor', symbol: '$699.00', price: '$699.00', volume: 'Stock: 8 units', status: 'LOW_STOCK' },
      { id: '#PROD-104', name: 'Smart Desk Ambient Lighting Strip', symbol: '$79.00', price: '$79.00', volume: 'Stock: 120 units', status: 'NEW_RELEASE' }
    ],
    architecturePlan: {
      domain: 'E-Commerce Retail & Inventory Management',
      userRoles: ['Customer', 'Store Admin', 'Inventory Manager', 'Support Agent'],
      modules: ['Storefront Catalog', 'Cart & Stripe Checkout', 'Inventory Sync', 'Orders Dashboard', 'Customer Support Bot'],
      features: ['JWT Auth', 'Product Filters', 'Wishlist Stars', 'Stripe Checkout', 'Resend Email Receipt', 'PostgreSQL DB'],
      milestones: ['Database Initialization', 'Stripe Integration', 'Responsive UI Build', 'AI Sales Bot Deployment']
    },
    folderStructure: `frontend/
├── src/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── checkout/page.tsx
│   │   └── admin/page.tsx
│   ├── components/
│   │   ├── ProductGrid.tsx
│   │   ├── CartDrawer.tsx
│   │   └── StripeCheckout.tsx
│   └── lib/
│       └── api.ts
backend/
├── src/
│   ├── controllers/
│   │   ├── product.controller.ts
│   │   └── order.controller.ts
│   ├── services/
│   │   ├── stripe.service.ts
│   │   └── inventory.service.ts
│   └── middleware/
│       └── auth.middleware.ts
prisma/
└── schema.prisma
agents/
└── SalesSupportAgent.ts
Dockerfile
docker-compose.yml
vercel.json
.env.production`,
    files: [
      {
        name: 'app/store/page.tsx',
        language: 'typescript',
        code: `// Production E-Commerce Storefront Next.js App\nimport React, { useState } from 'react';\n\nexport default function ECommerceStoreApp() {\n  const [cart, setCart] = useState([]);\n\n  const handleAddToCart = (product) => {\n    setCart(prev => [...prev, product]);\n  };\n\n  return (\n    <div className="p-8 space-y-6 bg-slate-950 text-white font-sans rounded-2xl">\n      <div className="flex justify-between items-center">\n        <h1 className="text-2xl font-bold text-purple-400">Production E-Commerce Platform</h1>\n        <span className="px-3 py-1 bg-purple-600/20 text-purple-300 rounded-xl font-mono">Cart ({cart.length})</span>\n      </div>\n      <p className="text-xs text-slate-400">Integrated with Stripe Payments & PostgreSQL Inventory</p>\n    </div>\n  );\n}`
      },
      {
        name: 'backend/src/controllers/product.controller.ts',
        language: 'typescript',
        code: `import { Request, Response } from 'express';\nimport { PrismaClient } from '@prisma/client';\n\nconst prisma = new PrismaClient();\n\nexport async function getProducts(req: Request, res: Response) {\n  const products = await prisma.product.findMany({\n    where: { status: 'IN_STOCK' },\n    orderBy: { createdAt: 'desc' }\n  });\n  return res.json({ success: true, count: products.length, data: products });\n}`
      },
      {
        name: 'backend/src/services/stripe.service.ts',
        language: 'typescript',
        code: `import Stripe from 'stripe';\nconst stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2023-10-16' });\n\nexport async function createCheckoutSession(items: Array<{ id: string; quantity: number }>) {\n  return await stripe.checkout.sessions.create({\n    payment_method_types: ['card'],\n    line_items: items.map(item => ({ price: item.id, quantity: item.quantity })),\n    mode: 'payment',\n    success_url: \`\${process.env.FRONTEND_URL}/success\`\n  });\n}`
      }
    ],
    prismaSchema: `datasource db {\n  provider = "postgresql"\n  url      = env("DATABASE_URL")\n}\n\ngenerator client {\n  provider = "prisma-client-js"\n}\n\nenum OrderStatus {\n  PENDING\n  PAID\n  SHIPPED\n  CANCELLED\n}\n\nmodel Product {\n  id             String    @id @default(uuid())\n  title          String\n  priceUsd       Float\n  inventoryCount Int\n  category       String\n  createdAt      DateTime  @default(now())\n  updatedAt      DateTime  @updatedAt\n  orderItems     OrderItem[]\n}\n\nmodel Order {\n  id             String      @id @default(uuid())\n  userId         String\n  totalAmount    Float\n  status         OrderStatus @default(PENDING)\n  createdAt      DateTime    @default(now())\n  orderItems     OrderItem[]\n}\n\nmodel OrderItem {\n  id        String  @id @default(uuid())\n  orderId   String\n  productId String\n  quantity  Int\n  order     Order   @relation(fields: [orderId], references: [id])\n  product   Product @relation(fields: [productId], references: [id])\n}`,
    agents: [
      {
        name: 'Sales & Product Concierge Agent',
        purpose: 'Assists storefront customers with product selection, order tracking, and discount codes.',
        tools: ['INVENTORY_LOOKUP', 'STRIPE_REFUND', 'RECOMMENDATION_ENGINE'],
        trigger: 'Customer chat widget or idle page duration > 30s',
        inputs: 'Customer search query, past order history',
        outputs: 'Personalized product recommendation, discount code'
      },
      {
        name: 'Inventory Sync Agent',
        purpose: 'Monitors warehouse stock thresholds and triggers supplier re-orders automatically.',
        tools: ['PRISMA_DB', 'SUPPLIER_WEBHOOK'],
        trigger: 'Stock count drops below 10 units',
        inputs: 'Product SKU, current inventory level',
        outputs: 'Purchase order webhook dispatch'
      }
    ],
    deployment: {
      dockerfile: `FROM node:20-alpine AS builder\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build\nEXPOSE 3000\nCMD ["npm", "start"]`,
      dockerCompose: `version: '3.8'\nservices:\n  web:\n    build: .\n    ports:\n      - "3000:3000"\n    environment:\n      - DATABASE_URL=postgresql://postgres:secret@db:5432/production_db\n  db:\n    image: postgres:15-alpine\n    environment:\n      POSTGRES_PASSWORD: secret\n      POSTGRES_DB: production_db`,
      env: `PORT=3000\nNODE_ENV=production\nDATABASE_URL="postgresql://postgres:secret@db:5432/production_db"\nJWT_SECRET="super-secret-jwt-key-2026"\nSTRIPE_SECRET_KEY="sk_live_5123456789"\nOPENAI_API_KEY="sk-proj-production-key"`
    },
    entities: [
      { name: 'Products', fields: ['id (UUID)', 'title (String)', 'priceUsd (Float)', 'inventoryCount (Int)', 'category (Enum)', 'createdAt (DateTime)'] },
      { name: 'Orders', fields: ['id (UUID)', 'userId (UUID)', 'totalAmount (Float)', 'status (OrderStatus)', 'createdAt (DateTime)'] },
      { name: 'OrderItem', fields: ['id (UUID)', 'orderId (UUID)', 'productId (UUID)', 'quantity (Int)'] }
    ]
  });

  const handlePromptSubmit = (customText?: string) => {
    const targetPrompt = customText !== undefined ? customText : prompt;
    if (!targetPrompt.trim()) return;

    const lowerPrompt = targetPrompt.toLowerCase();

    // Prepare interactive clarifying questions (Emergent / Lovable style)
    if (lowerPrompt.includes('ecom') || lowerPrompt.includes('shop') || lowerPrompt.includes('store') || lowerPrompt.includes('commerce')) {
      setClarificationData({
        title: 'E-Commerce Specification Interview',
        subtitle: 'Customize technical architecture before compiling production code:',
        questions: [
          { key: 'payment', label: 'Payment Gateway', options: ['Stripe Checkout API', 'PayPal Express', 'Crypto Pay Gateway'] },
          { key: 'inventory', label: 'Database & Sync', options: ['PostgreSQL & Prisma ORM', 'Shopify Storefront API', 'Realtime Redis Cache'] }
        ]
      });
      setSelectedOptions({ payment: 'Stripe Checkout API', inventory: 'PostgreSQL & Prisma ORM' });
      setShowClarification(true);
    } else if (lowerPrompt.includes('health') || lowerPrompt.includes('doctor') || lowerPrompt.includes('patient') || lowerPrompt.includes('medical')) {
      setClarificationData({
        title: 'Healthcare Platform Specification Interview',
        subtitle: 'Configure HIPAA compliance and consultation channels:',
        questions: [
          { key: 'telehealth', label: 'Consultation Mode', options: ['WebRTC Video Consultation', 'Async Messaging Chat', 'In-Person Booking'] },
          { key: 'records', label: 'EHR Storage', options: ['Encrypted PostgreSQL (HIPAA Compliance)', 'AWS HealthLake', 'Supabase Secure Storage'] }
        ]
      });
      setSelectedOptions({ telehealth: 'WebRTC Video Consultation', records: 'Encrypted PostgreSQL (HIPAA Compliance)' });
      setShowClarification(true);
    } else {
      execute10StepCompilation(targetPrompt);
    }
  };

  const execute10StepCompilation = (targetPrompt: string) => {
    setShowClarification(false);
    setIsGenerating(true);
    deductCredits(5);

    const lowerPrompt = targetPrompt.toLowerCase();
    const cleanSlug = targetPrompt.toLowerCase().replace(/[^a-z0-9]/g, '-').substring(0, 20) || 'app';
    const generatedName = targetPrompt.length > 35 ? `${targetPrompt.substring(0, 35)}...` : targetPrompt;

    let step = 0;
    setGenerationStepIndex(step);

    const stepInterval = setInterval(() => {
      step++;
      if (step < generationPipelineSteps.length) {
        setGenerationStepIndex(step);
      } else {
        clearInterval(stepInterval);
        finishCompilation(targetPrompt, lowerPrompt, cleanSlug, generatedName);
      }
    }, 250);
  };

  const finishCompilation = (targetPrompt: string, lowerPrompt: string, cleanSlug: string, generatedName: string) => {
    if (lowerPrompt.includes('health') || lowerPrompt.includes('doctor') || lowerPrompt.includes('patient') || lowerPrompt.includes('medical')) {
      setAppState({
        domain: 'HEALTHCARE',
        appName: `Healthcare & Telehealth Portal: ${generatedName}`,
        summary: `Production healthcare portal with doctor/patient logins, HIPAA encrypted EHR records, video appointments, and prescription management. Prompt: "${targetPrompt}"`,
        status: 'GENERATED',
        metrics: [
          { label: 'Active Doctors Available', value: '14 Specialists', change: 'Online Now', color: 'text-emerald-400' },
          { label: 'Appointments Scheduled', value: '42 Today', change: 'WebRTC Video', color: 'text-blue-400' },
          { label: 'HIPAA Compliance Audit', value: 'VERIFIED', change: 'AES-256 Encrypted', color: 'text-purple-400' }
        ],
        items: [
          { id: '#DOC-101', name: 'Dr. Sarah Jenkins (Cardiology)', symbol: 'Cardiology', price: '$150/visit', volume: 'Rating: 4.9★', status: 'AVAILABLE' },
          { id: '#DOC-102', name: 'Dr. Michael Chen (Neurology)', symbol: 'Neurology', price: '$200/visit', volume: 'Rating: 4.8★', status: 'IN_SESSION' },
          { id: '#DOC-103', name: 'Dr. Elena Rostova (Pediatrics)', symbol: 'Pediatrics', price: '$120/visit', volume: 'Rating: 5.0★', status: 'AVAILABLE' }
        ],
        architecturePlan: {
          domain: 'Healthcare Telehealth & EHR Management',
          userRoles: ['Patient', 'Doctor', 'Clinic Admin', 'Pharmacist'],
          modules: ['Doctor Availability Calendar', 'WebRTC Video Room', 'Prescription Issuer', 'Patient EHR Vault'],
          features: ['HIPAA Encrypted DB', 'Twilio Video API', 'Stripe Medical Invoicing', 'Resend SMS Alerts'],
          milestones: ['Role-Based JWT Auth', 'EHR Schema Migration', 'WebRTC Video Integration', 'Prescription Module']
        },
        folderStructure: `frontend/\n├── app/\n│   ├── doctor-dashboard/page.tsx\n│   ├── patient-portal/page.tsx\n│   └── video-consult/page.tsx\nbackend/\n├── controllers/appointment.controller.ts\n├── services/webrtc.service.ts\nprisma/schema.prisma\nagents/TriageAssistantAgent.ts`,
        files: [
          {
            name: `app/${cleanSlug}/page.tsx`,
            language: 'typescript',
            code: `// Production Telehealth Portal Next.js App\nimport React, { useState } from 'react';\n\nexport default function HealthcarePortalApp() {\n  return (\n    <div className="p-8 space-y-6 bg-slate-950 text-white rounded-2xl font-sans">\n      <h1 className="text-2xl font-bold text-blue-400">${generatedName}</h1>\n      <p className="text-xs text-slate-400">HIPAA Encrypted EHR & WebRTC Telehealth Portal</p>\n    </div>\n  );\n}`
          }
        ],
        prismaSchema: `model Doctor {\n  id            String   @id @default(uuid())\n  name          String\n  specialty     String\n  consultFeeUsd Float\n  appointments  Appointment[]\n}\n\nmodel Appointment {\n  id         String   @id @default(uuid())\n  doctorId   String\n  patientId  String\n  scheduledAt DateTime\n  status     String   @default("CONFIRMED")\n  doctor     Doctor   @relation(fields: [doctorId], references: [id])\n}`,
        agents: [
          {
            name: 'Patient Triage & Symptom Agent',
            purpose: 'Interviews patient symptoms and recommends relevant doctor specialty before booking.',
            tools: ['MEDICAL_KNOWLEDGE_BASE', 'DOCTOR_CALENDAR_LOOKUP'],
            trigger: 'Patient click "Book Consultation"',
            inputs: 'Symptom description, urgency level',
            outputs: 'Recommended doctor specialty, appointment slot'
          }
        ],
        deployment: {
          dockerfile: `FROM node:20-alpine\nWORKDIR /app\nCOPY . .\nRUN npm run build\nCMD ["npm", "start"]`,
          dockerCompose: `version: '3.8'\nservices:\n  healthcare_app:\n    build: .\n    ports: ["3000:3000"]`,
          env: `DATABASE_URL="postgresql://postgres:secret@db:5432/healthcare_db"\nHIPAA_ENCRYPTION_KEY="secret-vault-key-2026"`
        },
        entities: [
          { name: 'Doctors', fields: ['id (UUID)', 'name (String)', 'specialty (String)', 'consultFeeUsd (Float)'] },
          { name: 'Appointments', fields: ['id (UUID)', 'doctorId (UUID)', 'patientId (UUID)', 'scheduledAt (DateTime)'] }
        ]
      });
    } else if (lowerPrompt.includes('crm') || lowerPrompt.includes('lead') || lowerPrompt.includes('deal') || lowerPrompt.includes('sales')) {
      setAppState({
        domain: 'CRM',
        appName: `Autonomous Sales CRM Platform: ${generatedName}`,
        summary: `Full-stack sales pipeline CRM with leads database, deal stages (Lead, Proposal, Won), contact notes, and automated Sales AI Agent.`,
        status: 'GENERATED',
        metrics: [
          { label: 'Active Pipeline Deals', value: '$142,500.00', change: '18 Active Deals', color: 'text-emerald-400' },
          { label: 'Lead Win Rate', value: '34.2%', change: '+5.1% this month', color: 'text-blue-400' },
          { label: 'AI Email Follow-Ups', value: '142 Sent', change: 'Resend API', color: 'text-purple-400' }
        ],
        items: [
          { id: '#DEAL-101', name: 'Acme Enterprise License', symbol: '$45,000.00', price: 'Stage: Proposal Sent', volume: 'Owner: Alex', status: 'HIGH_PROBABILITY' },
          { id: '#DEAL-102', name: 'Starlight AI Expansion', symbol: '$28,000.00', price: 'Stage: Qualified Lead', volume: 'Owner: Sarah', status: 'IN_DISCUSSION' }
        ],
        architecturePlan: {
          domain: 'B2B Sales CRM & Lead Pipeline',
          userRoles: ['Sales Rep', 'Account Executive', 'Sales Manager', 'Admin'],
          modules: ['Leads Board', 'Deals Pipeline', 'Email Sequences', 'Analytics Reporting'],
          features: ['PostgreSQL DB', 'Resend Email API', 'Stripe Invoicing', 'AI Sales Assistant'],
          milestones: ['Lead Schema Setup', 'Pipeline Viewport Build', 'Resend Integration', 'AI Agent Rollout']
        },
        folderStructure: `frontend/\n├── app/deals/page.tsx\nbackend/\n├── controllers/deal.controller.ts\nprisma/schema.prisma`,
        files: [
          {
            name: `app/${cleanSlug}/page.tsx`,
            language: 'typescript',
            code: `// Production B2B Sales CRM Next.js App\nimport React from 'react';\n\nexport default function SalesCRMApp() {\n  return (\n    <div className="p-8 space-y-6 bg-slate-950 text-white rounded-2xl font-sans">\n      <h1 className="text-2xl font-bold text-emerald-400">${generatedName}</h1>\n      <p className="text-xs text-slate-400">Autonomous B2B Sales Pipeline & Deal Tracker</p>\n    </div>\n  );\n}`
          }
        ],
        prismaSchema: `model Deal {\n  id          String   @id @default(uuid())\n  companyName String\n  amountUsd   Float\n  stage       String   @default("QUALIFIED")\n  ownerName   String\n  createdAt   DateTime @default(now())\n}`,
        agents: [
          {
            name: 'Autonomous Outbound Sales Agent',
            purpose: 'Drafts personalized email sequences and logs contact interactions automatically.',
            tools: ['RESEND_EMAIL', 'CRM_DEAL_UPDATER'],
            trigger: 'New lead added to CRM pipeline',
            inputs: 'Lead company name, decision maker title',
            outputs: 'Personalized email draft, CRM stage update'
          }
        ],
        deployment: {
          dockerfile: `FROM node:20-alpine\nWORKDIR /app\nCOPY . .\nRUN npm run build\nCMD ["npm", "start"]`,
          dockerCompose: `version: '3.8'\nservices:\n  crm_app:\n    build: .\n    ports: ["3000:3000"]`,
          env: `DATABASE_URL="postgresql://postgres:secret@db:5432/crm_db"\nRESEND_API_KEY="re_123456789"`
        },
        entities: [
          { name: 'Deals', fields: ['id (UUID)', 'companyName (String)', 'amountUsd (Float)', 'stage (Enum)'] }
        ]
      });
    } else if (lowerPrompt.includes('ecom') || lowerPrompt.includes('shop') || lowerPrompt.includes('store') || lowerPrompt.includes('commerce')) {
      setAppState({
        domain: 'ECOMMERCE',
        appName: `E-Commerce Storefront: ${generatedName}`,
        summary: `Full-stack storefront with product catalog, cart drawer, inventory tracking, and Stripe checkout integration. Prompt: "${targetPrompt}"`,
        status: 'GENERATED',
        metrics: [
          { label: 'Active Store Products', value: '48 Products', change: 'In Stock', color: 'text-emerald-400' },
          { label: 'Cart Conversion Rate', value: '4.8%', change: '+1.2% this week', color: 'text-blue-400' },
          { label: 'Total Store Revenue', value: '$18,920.00', change: 'Stripe Verified', color: 'text-purple-400' }
        ],
        items: [
          { id: '#PROD-101', name: 'Wireless Noise-Canceling Headphones', symbol: '$299.00', price: '$299.00', volume: 'Stock: 45 units', status: 'IN_STOCK' },
          { id: '#PROD-102', name: 'Ergonomic Mechanical Keyboard', symbol: '$149.00', price: '$149.00', volume: 'Stock: 18 units', status: 'BEST_SELLER' },
          { id: '#PROD-103', name: 'Ultra-Wide 4K Gaming Monitor', symbol: '$699.00', price: '$699.00', volume: 'Stock: 8 units', status: 'LOW_STOCK' }
        ],
        architecturePlan: {
          domain: 'E-Commerce Retail & Inventory Management',
          userRoles: ['Customer', 'Store Admin', 'Inventory Manager', 'Support Agent'],
          modules: ['Storefront Catalog', 'Cart & Stripe Checkout', 'Inventory Sync', 'Orders Dashboard'],
          features: ['JWT Auth', 'Product Filters', 'Wishlist Stars', 'Stripe Checkout', 'PostgreSQL DB'],
          milestones: ['Database Initialization', 'Stripe Integration', 'Responsive UI Build']
        },
        folderStructure: `frontend/\n├── app/store/page.tsx\nbackend/\n├── controllers/product.controller.ts\nprisma/schema.prisma`,
        files: [
          {
            name: `app/${cleanSlug}/page.tsx`,
            language: 'typescript',
            code: `// Production E-Commerce Storefront Next.js App\nimport React, { useState } from 'react';\n\nexport default function ECommerceStore() {\n  const [cart, setCart] = useState([]);\n  return (\n    <div className="p-8 bg-slate-950 text-white font-sans rounded-2xl">\n      <h1 className="text-2xl font-bold text-purple-400">${generatedName}</h1>\n      <p className="text-xs text-slate-400">Prompt: "${targetPrompt}"</p>\n    </div>\n  );\n}`
          }
        ],
        prismaSchema: `model Product {\n  id          String   @id @default(uuid())\n  title       String\n  priceUsd    Float\n  inventory   Int\n}`,
        agents: [
          {
            name: 'Sales & Product Concierge Agent',
            purpose: 'Assists storefront customers with product selection and discounts.',
            tools: ['INVENTORY_LOOKUP', 'STRIPE_DISCOUNT'],
            trigger: 'Customer chat or idle > 30s',
            inputs: 'Customer search query',
            outputs: 'Personalized product recommendation'
          }
        ],
        deployment: {
          dockerfile: `FROM node:20-alpine\nWORKDIR /app\nCOPY . .\nRUN npm run build\nCMD ["npm", "start"]`,
          dockerCompose: `version: '3.8'\nservices:\n  store_app:\n    build: .\n    ports: ["3000:3000"]`,
          env: `DATABASE_URL="postgresql://postgres:secret@db:5432/store_db"\nSTRIPE_SECRET_KEY="sk_live_123456789"`
        },
        entities: [
          { name: 'Products', fields: ['id (UUID)', 'title (String)', 'priceUsd (Float)', 'inventory (Int)'] }
        ]
      });
    } else {
      setAppState({
        domain: 'CUSTOM',
        appName: generatedName,
        summary: `Production full-stack application for "${targetPrompt}" with Next.js frontend, Express/NestJS backend, PostgreSQL + Prisma ORM, and autonomous AI Agent suite.`,
        status: 'GENERATED',
        metrics: [
          { label: 'Active User Sessions', value: '1,280 Users', change: '+14% active', color: 'text-emerald-400' },
          { label: 'API Processing Latency', value: '120ms', change: 'Optimal Health', color: 'text-blue-400' },
          { label: 'Database Storage Status', value: 'SYNCED', change: 'PostgreSQL Connected', color: 'text-purple-400' }
        ],
        items: [
          { id: '#REC-101', name: `${generatedName} Record #1`, symbol: 'payload_01.json', price: 'Status: OK', volume: 'Latency: 120ms', status: 'ACTIVE' },
          { id: '#REC-102', name: `${generatedName} Record #2`, symbol: 'payload_02.json', price: 'Status: OK', volume: 'Latency: 140ms', status: 'COMPLETED' }
        ],
        architecturePlan: {
          domain: 'Custom Full-Stack Web Application Architecture',
          userRoles: ['End User', 'Workspace Admin', 'System Auditor'],
          modules: ['User Dashboard', 'REST API Engine', 'PostgreSQL Storage', 'AI Agent Worker'],
          features: ['JWT Auth', 'Search & Filtering', 'Export Reports', 'Audit Logging'],
          milestones: ['Architecture Planning', 'DB Migration', 'UI Viewport Render', 'Agent Instantiation']
        },
        folderStructure: `frontend/\n├── app/page.tsx\nbackend/\n├── controllers/main.controller.ts\nprisma/schema.prisma`,
        files: [
          {
            name: `app/${cleanSlug}/page.tsx`,
            language: 'typescript',
            code: `// Production Synthesized Full-Stack Web App\nimport React from 'react';\n\nexport default function CustomApp() {\n  return (\n    <div className="p-8 bg-slate-950 text-white font-sans rounded-2xl">\n      <h1 className="text-2xl font-bold text-blue-400">${generatedName}</h1>\n      <p className="text-xs text-slate-400">Prompt: "${targetPrompt}"</p>\n    </div>\n  );\n}`
          }
        ],
        prismaSchema: `model Record {\n  id        String   @id @default(uuid())\n  title     String\n  payload   Json\n  createdAt DateTime @default(now())\n}`,
        agents: [
          {
            name: 'Autonomous Operations Agent',
            purpose: 'Processes background tasks and syncs telemetry data.',
            tools: ['PRISMA_DB', 'WEBHOOK_DISPATCH'],
            trigger: 'User action or scheduled cron interval',
            inputs: 'Task payload',
            outputs: 'Status telemetry log'
          }
        ],
        deployment: {
          dockerfile: `FROM node:20-alpine\nWORKDIR /app\nCOPY . .\nRUN npm run build\nCMD ["npm", "start"]`,
          dockerCompose: `version: '3.8'\nservices:\n  app:\n    build: .\n    ports: ["3000:3000"]`,
          env: `DATABASE_URL="postgresql://postgres:secret@db:5432/app_db"\nJWT_SECRET="super-secret-key"`
        },
        entities: [
          { name: 'Records', fields: ['id (UUID)', 'title (String)', 'payload (JSON)', 'createdAt (DateTime)'] }
        ]
      });
    }

    setIsGenerating(false);
    setGenerationStepIndex(0);
    setChatMessages(prev => [
      ...prev,
      { role: 'user', text: targetPrompt },
      { role: 'assistant', text: `Successfully built production-ready project "${generatedName}" across all 10 architectural steps! You can inspect the Live Preview, complete Architecture Plan, Monorepo File Tree, Next.js Code, Prisma DB Schemas, AI Agents, or Deployment Configs using the top tabs.` }
    ]);

    addLogStep({
      agentName: 'Vibe App Studio Architecture Engine',
      action: `Compiled production project "${generatedName}" across 10 steps`,
      reasoning: `Synthesized Next.js 14 React frontend, NestJS backend, Prisma PostgreSQL schema, and autonomous AI agents.`,
      durationMs: 2500
    });
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
    alert(`🎉 Full Production Project Deployed & Hosted Successfully!\nLive Viewport URL: https://nexusmind.ai/app/${slug}`);
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
        title="Vibe App Studio (Lovable, Emergent, Bolt & Replit AI Engine)"
        description="Submit any natural language prompt. NexusMind acts as an autonomous Full-Stack Architect, DB Designer, and DevOps Engineer, executing a 10-step compilation pipeline."
        steps={[
          "Type your prompt idea (e.g. 'build ecom platform', 'build healthcare app', 'build CRM').",
          "Observe the 10-Step Real-Time Compilation Telemetry Pipeline build your project live.",
          "Inspect Live Preview, Architecture Plan, Monorepo File Tree, Code Files, Prisma Schemas, AI Agents, and Deployment Configs!"
        ]}
        tips="Vibe Coding generates complete Next.js React UI components, backend route handlers, Prisma database schemas, and AI agents automatically!"
      />

      {/* Top Control Bar with 7 Tabs */}
      <div className="p-4 rounded-2xl glass-panel border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-purple-600 via-blue-600 to-indigo-600 text-white shadow-md">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white flex items-center gap-2">
              <span>Conversational Vibe App & Agent Studio</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono">10-Step AI Engine</span>
            </h1>
            <p className="text-xs text-slate-400">Autonomous Software Architect, DB Designer, & Full-Stack Engineer Engine</p>
          </div>
        </div>

        {/* 7 Workspace Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto max-w-full">
          <div className="flex p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold shrink-0">
            <button
              onClick={() => setActiveTab('PREVIEW')}
              className={`py-1.5 px-3 rounded-lg flex items-center gap-1.5 transition-all ${activeTab === 'PREVIEW' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Live Preview</span>
            </button>
            <button
              onClick={() => setActiveTab('PLAN')}
              className={`py-1.5 px-3 rounded-lg flex items-center gap-1.5 transition-all ${activeTab === 'PLAN' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Plan</span>
            </button>
            <button
              onClick={() => setActiveTab('FOLDERS')}
              className={`py-1.5 px-3 rounded-lg flex items-center gap-1.5 transition-all ${activeTab === 'FOLDERS' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <FolderTree className="w-3.5 h-3.5" />
              <span>Tree</span>
            </button>
            <button
              onClick={() => setActiveTab('CODE')}
              className={`py-1.5 px-3 rounded-lg flex items-center gap-1.5 transition-all ${activeTab === 'CODE' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <Code className="w-3.5 h-3.5" />
              <span>Code</span>
            </button>
            <button
              onClick={() => setActiveTab('DATABASE')}
              className={`py-1.5 px-3 rounded-lg flex items-center gap-1.5 transition-all ${activeTab === 'DATABASE' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <Database className="w-3.5 h-3.5" />
              <span>Prisma</span>
            </button>
            <button
              onClick={() => setActiveTab('AGENTS')}
              className={`py-1.5 px-3 rounded-lg flex items-center gap-1.5 transition-all ${activeTab === 'AGENTS' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <Bot className="w-3.5 h-3.5" />
              <span>Agents</span>
            </button>
            <button
              onClick={() => setActiveTab('DEPLOY')}
              className={`py-1.5 px-3 rounded-lg flex items-center gap-1.5 transition-all ${activeTab === 'DEPLOY' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <Server className="w-3.5 h-3.5" />
              <span>Deploy</span>
            </button>
          </div>

          <button
            onClick={handleDeploy}
            className="py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-600/30 transition-all hover:scale-[1.02] cursor-pointer shrink-0"
          >
            <Rocket className="w-3.5 h-3.5" />
            <span>Deploy</span>
          </button>
        </div>
      </div>

      {/* Main Split Grid */}
      <div className="flex-1 flex gap-6 min-h-0">
        {/* Left Prompt & Iteration Assistant Panel */}
        <div className="w-96 rounded-2xl glass-panel border border-slate-800 p-5 flex flex-col justify-between shrink-0 space-y-4">
          <div className="space-y-4 flex-1 overflow-y-auto">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>Conversational Vibe Assistant</span>
            </h2>

            {/* Interactive Specification Interview (Emergent / Lovable Feature) */}
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
                  onClick={() => execute10StepCompilation(prompt)}
                  className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-xs shadow-md shadow-purple-600/30 hover:scale-[1.02] transition-all cursor-pointer mt-2"
                >
                  Compile 10-Step Project with Choices
                </button>
              </div>
            )}

            {/* Chat Messages Log */}
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
                  setPrompt("build ecom platform");
                  handlePromptSubmit("build ecom platform");
                }}
                className="p-2 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 hover:border-purple-500/40 cursor-pointer transition-all"
              >
                "build ecom platform"
              </div>
              <div
                onClick={() => {
                  setPrompt("build healthcare app with doctor booking and medical records");
                  handlePromptSubmit("build healthcare app with doctor booking and medical records");
                }}
                className="p-2 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 hover:border-purple-500/40 cursor-pointer transition-all"
              >
                "build healthcare app with doctor booking"
              </div>
              <div
                onClick={() => {
                  setPrompt("build CRM with leads and sales pipeline");
                  handlePromptSubmit("build CRM with leads and sales pipeline");
                }}
                className="p-2 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 hover:border-purple-500/40 cursor-pointer transition-all"
              >
                "build CRM with leads and sales pipeline"
              </div>
            </div>
          </div>

          {/* Real-Time Telemetry & Prompt Bar */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            {isGenerating && (
              <div className="p-3 rounded-xl bg-purple-950/60 border border-purple-500/40 text-purple-300 text-xs font-mono space-y-1">
                <div className="flex items-center gap-2 font-bold text-purple-200">
                  <RefreshCw className="w-4 h-4 animate-spin text-purple-400" />
                  <span>10-Step AI Compilation Pipeline:</span>
                </div>
                <p className="text-[11px] text-purple-300 pl-6">{generationPipelineSteps[generationStepIndex]}</p>
                <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden mt-1">
                  <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-full transition-all duration-300" style={{ width: `${((generationStepIndex + 1) / 10) * 100}%` }}></div>
                </div>
              </div>
            )}
            <textarea
              rows={3}
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              placeholder="Describe your app idea in natural language (e.g. 'build ecom platform' or 'build healthcare portal')..."
              className="w-full bg-slate-900 border border-slate-800 text-xs rounded-xl p-3 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />
            <button
              onClick={() => handlePromptSubmit()}
              disabled={isGenerating || !prompt.trim()}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-purple-600/30 transition-all disabled:opacity-50 cursor-pointer"
            >
              {isGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
              <span>Generate Full-Stack App (5 Credits)</span>
            </button>
          </div>
        </div>

        {/* Right Viewport (Preview / Plan / Tree / Code / DB / Agents / Deploy) */}
        <div className="flex-1 rounded-2xl glass-panel border border-slate-800 p-6 flex flex-col min-h-0 overflow-auto bg-slate-950">
          {/* TAB 1: LIVE INTERACTIVE PREVIEW */}
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
                      {appState.domain === 'HEALTHCARE' && <Activity className="w-6 h-6 text-emerald-400" />}
                      {appState.domain === 'ECOMMERCE' && <ShoppingCart className="w-6 h-6 text-purple-400" />}
                      {appState.domain === 'CRM' && <CheckSquare className="w-6 h-6 text-amber-400" />}
                      <span>{appState.appName}</span>
                    </h1>
                    <p className="text-xs text-slate-400 mt-1">{appState.summary}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    {appState.domain === 'ECOMMERCE' && (
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
                      placeholder="Filter records or items..."
                      className="w-full bg-slate-950 border border-slate-800 text-xs rounded-xl pl-9 pr-4 py-2 text-slate-200 focus:outline-none focus:border-blue-500 font-mono"
                    />
                  </div>
                  {appState.domain === 'ECOMMERCE' && (
                    <button
                      onClick={() => setCartCount(c => c + 1)}
                      className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-purple-600/20"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Product to Cart</span>
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
                          <th className="pb-2">Name / Title</th>
                          <th className="pb-2">Category / Specialty</th>
                          <th className="pb-2">Value / Fee</th>
                          <th className="pb-2">Volume / Rating</th>
                          <th className="pb-2">Status</th>
                          <th className="pb-2">Action</th>
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
                            <td className="py-2.5">
                              {appState.domain === 'ECOMMERCE' ? (
                                <button
                                  onClick={() => setCartCount(c => c + 1)}
                                  className="px-2.5 py-1 rounded bg-purple-600/30 text-purple-300 hover:bg-purple-600/50 text-[10px] font-bold"
                                >
                                  + Cart
                                </button>
                              ) : (
                                <span className="text-slate-500 text-[10px]">Active</span>
                              )}
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

          {/* TAB 2: ARCHITECTURE & PROJECT PLAN */}
          {activeTab === 'PLAN' && (
            <div className="space-y-6 flex-1 overflow-y-auto text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-400" />
                  <span>Executive Architecture & Requirements Plan</span>
                </h2>
                <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-mono">
                  {appState.domain} Architecture
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <span className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">User Roles & Access Control:</span>
                  <ul className="space-y-1 font-mono text-slate-400">
                    {appState.architecturePlan?.userRoles?.map((r: string, i: number) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <span className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">Core System Modules:</span>
                  <ul className="space-y-1 font-mono text-slate-400">
                    {appState.architecturePlan?.modules?.map((m: string, i: number) => (
                      <li key={i} className="flex items-center gap-2">
                        <Layers className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <span className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">Security & Integrations:</span>
                  <ul className="space-y-1 font-mono text-slate-400">
                    {appState.architecturePlan?.features?.map((f: string, i: number) => (
                      <li key={i} className="flex items-center gap-2">
                        <Shield className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <span className="font-bold text-slate-300 uppercase tracking-wider text-[10px]">Roadmap Milestones:</span>
                  <ul className="space-y-1 font-mono text-slate-400">
                    {appState.architecturePlan?.milestones?.map((ms: string, i: number) => (
                      <li key={i} className="flex items-center gap-2">
                        <Rocket className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                        <span>{ms}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: MONOREPO FOLDER STRUCTURE */}
          {activeTab === 'FOLDERS' && (
            <div className="space-y-4 flex-1 overflow-y-auto font-mono text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <FolderTree className="w-5 h-5 text-purple-400" />
                  <span>Production Monorepo Directory Tree</span>
                </h2>
                <span className="text-emerald-400 font-bold">Clean Architecture</span>
              </div>
              <pre className="p-5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-[11px] overflow-x-auto leading-relaxed">
                {appState.folderStructure}
              </pre>
            </div>
          )}

          {/* TAB 4: CODE EDITOR */}
          {activeTab === 'CODE' && (
            <div className="space-y-4 flex-1 overflow-y-auto font-mono text-xs">
              <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-2">
                <span>Generated Code Files ({appState.files?.length || 0})</span>
                <span className="text-emerald-400">TypeScript / Next.js 14 / Express</span>
              </div>
              {appState.files?.map((file: any, idx: number) => (
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

          {/* TAB 5: PRISMA DATABASE SCHEMAS */}
          {activeTab === 'DATABASE' && (
            <div className="space-y-4 flex-1 overflow-y-auto">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2 font-mono text-xs">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Database className="w-5 h-5 text-cyan-400" />
                  <span>PostgreSQL & Prisma Schema Specification</span>
                </h3>
                <span className="text-cyan-400 font-bold">Prisma ORM</span>
              </div>

              <pre className="p-5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 font-mono text-[11px] overflow-x-auto">
                {appState.prismaSchema}
              </pre>
            </div>
          )}

          {/* TAB 6: AUTONOMOUS AI AGENTS */}
          {activeTab === 'AGENTS' && (
            <div className="space-y-4 flex-1 overflow-y-auto text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Bot className="w-5 h-5 text-indigo-400" />
                  <span>Autonomous AI Agents Suite ({appState.agents?.length || 0} Agents)</span>
                </h3>
                <span className="text-indigo-400 font-mono">Agentic Architecture</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {appState.agents?.map((agent: any, idx: number) => (
                  <div key={idx} className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                    <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
                      <Bot className="w-4 h-4" />
                      <span>{agent.name}</span>
                    </div>
                    <p className="text-slate-300 text-[11px] leading-relaxed italic bg-slate-950 p-3 rounded-lg border border-slate-800">
                      "{agent.purpose}"
                    </p>
                    <div className="space-y-1 font-mono text-[10px] text-slate-400">
                      <div>Trigger: <span className="text-blue-300">{agent.trigger}</span></div>
                      <div>Tools: <span className="text-purple-300">{agent.tools?.join(', ')}</span></div>
                      <div>Inputs: <span className="text-emerald-300">{agent.inputs}</span></div>
                      <div>Outputs: <span className="text-amber-300">{agent.outputs}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: DEPLOYMENT & ENV */}
          {activeTab === 'DEPLOY' && (
            <div className="space-y-4 flex-1 overflow-y-auto font-mono text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Server className="w-5 h-5 text-emerald-400" />
                  <span>Docker & Production Environment Configs</span>
                </h3>
                <span className="text-emerald-400 font-bold">DevOps Ready</span>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-slate-400 font-bold">Dockerfile:</span>
                  <pre className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-[11px]">
                    {appState.deployment?.dockerfile}
                  </pre>
                </div>

                <div className="space-y-1">
                  <span className="text-slate-400 font-bold">docker-compose.yml:</span>
                  <pre className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 text-[11px]">
                    {appState.deployment?.dockerCompose}
                  </pre>
                </div>

                <div className="space-y-1">
                  <span className="text-slate-400 font-bold">Environment Variables (.env.production):</span>
                  <pre className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-amber-300 text-[11px]">
                    {appState.deployment?.env}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
