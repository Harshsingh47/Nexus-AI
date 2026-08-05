# NexusMind AI - Enterprise Autonomous AI Agent & Workflow Platform

NexusMind AI is an enterprise-grade autonomous AI Agent Platform combining **No-Code Visual Drag-and-Drop Workflow Building**, **Conversational Vibe App Generation**, and a **Programmatic Developer SDK**.

---

## Technical Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Lucide Icons, Framer Motion, Zustand.
- **Backend**: NestJS, Node.js, TypeScript, Express, WebSockets (`socket.io`), Prisma ORM.
- **Database & Storage**: PostgreSQL (`pgvector`), Redis (`BullMQ`), MinIO / Amazon S3.
- **Automation Drivers**: Playwright Headless Browser Automation Runner, Isolated Code Sandboxes.
- **Subscriptions & Monetization**: Credit Metering Engine, Daily Free Credit Auto-Refresher (Weekly, Monthly, Yearly, Enterprise).

---

## Monetization & Credit Engine

| Plan Tier | Price | Billing Cycle | Credits Allocated | Daily Free Refresh | Included Features |
|---|---|---|---|---|---|
| **Free Starter** | $0 | Daily | 50 Credits | 50 Credits / 24h | Single Agent Workflows, Basic RAG |
| **Pro Weekly** | $9 | Weekly | 500 Credits / wk | 50 Credits / 24h | Multi-Agent Collaboration, Playwright Browser Runner |
| **Pro Monthly** | $29 | Monthly | 2,500 Credits / mo | 100 Credits / 24h | Full RAG Knowledge Base, Code Sandboxes |
| **Pro Annual** | $249 | Yearly | 35,000 Credits / yr | 200 Credits / 24h | ~30% Discount, Priority Support |
| **Enterprise** | $999 | Monthly | 150,000 Credits | 1,000 Credits / 24h | Dedicated Worker Nodes, Custom Credit Quota, SLA |

---

## Monorepo Architecture

```
nexusmind-ai-monorepo/
├── apps/
│   ├── web/                    # Next.js 14 App Router Frontend UI
│   └── server/                 # NestJS Core API Engine & Orchestrator
├── packages/
│   ├── shared/                 # Shared Types & Zod Schemas
│   └── agent-sdk/              # Programmatic Developer SDK
├── docker/                     # Dockerfiles & docker-compose setup
├── k8s/                        # Kubernetes manifests & HPA autoscaling
├── terraform/                  # AWS infrastructure IaC scripts
└── .github/workflows/          # CI/CD automation pipeline
```

---

## Quick Start & Installation

### 1. Build Monorepo Dependencies & Shared Packages
```bash
npm install
npm run build:shared
npm run build:sdk
```

### 2. Run Development Servers
```bash
# Start NestJS Backend Server (Runs on http://localhost:4000)
npm run dev:server

# Start Next.js Frontend Application (Runs on http://localhost:3000)
npm run dev:web
```

---

## Interactive API & Documentation

- **Swagger / OpenAPI Spec**: `http://localhost:4000/api/docs`
- **Operations Command Center**: `http://localhost:3000/dashboard`
- **Visual Canvas Builder**: `http://localhost:3000/builder`
- **Conversational Vibe Studio**: `http://localhost:3000/vibe-builder`
- **Subscription Billing**: `http://localhost:3000/billing`
- **Knowledge Base (RAG)**: `http://localhost:3000/knowledge`
