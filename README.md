# NexusMind AI - Enterprise Autonomous AI Agent & Workflow Platform

NexusMind AI is an enterprise-grade autonomous AI Agent Platform combining **No-Code Visual Drag-and-Drop Workflow Building**, **Natural Language Prompt Agent Generation**, and a **Programmatic Developer SDK**. Inspired by OpenAI Operator, Manus AI, Devin, Claude Computer Use, CrewAI, LangGraph, and n8n, NexusMind offers multi-agent delegation, persistent vector memory, RAG ingestion, Playwright browser automation, computer use simulation, subscription billing, and real-time observability.

---

## Technical Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS, Shadcn UI, Framer Motion, Zustand, React Flow (`@xyflow/react`).
- **Backend**: NestJS, Node.js, TypeScript, Express, WebSockets (`socket.io`), Prisma ORM.
- **Database & Storage**: PostgreSQL (`pgvector`), Redis (`BullMQ`), MinIO / Amazon S3.
- **Automation Drivers**: Playwright Headless/Headful Browser Automation Runner, Python/JS/Bash/SQL Code Sandbox.
- **Subscriptions & Monetization**: Credit Metering Engine, Daily Free Credit Auto-Refresher, Stripe Webhook Integration (Weekly, Monthly, Yearly, Enterprise).

---

## Monetization & Credit Engine

| Plan Tier | Price | Billing Cycle | Credits Allocated | Daily Free Refresh | Included Features |
|---|---|---|---|---|---|
| **Free Starter** | $0 | Daily | 50 Credits | 50 Credits / 24h | Single Agent Workflows, Basic RAG, Community Support |
| **Pro Weekly** | $9 | Weekly | 500 Credits / wk | 50 Credits / 24h | Multi-Agent Collaboration, Playwright Browser Runner |
| **Pro Monthly** | $29 | Monthly | 2,500 Credits / mo | 100 Credits / 24h | Full RAG Knowledge Base, Code Sandboxes, Webhooks |
| **Pro Annual** | $249 | Yearly | 35,000 Credits / yr | 200 Credits / 24h | ~30% Discount, Computer Use Simulation, 24/7 Priority Support |
| **Enterprise** | $999 | Monthly | 150,000 Credits | 1,000 Credits / 24h | Dedicated Worker Nodes, Custom Credit Quota, SSO/SAML, SLA |

---

## Monorepo Architecture

```
nexusmind-ai-monorepo/
├── apps/
│   ├── web/                    # Next.js 15 App Router Frontend UI
│   └── server/                 # NestJS Core API Engine & Orchestrator
├── packages/
│   ├── shared/                 # Shared Types, Zod Schemas & Contracts
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

### 2. Start Infrastructure with Docker Compose
```bash
docker compose -f docker/docker-compose.yml up -d
```

### 3. Run Development Servers
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
- **Subscription Billing**: `http://localhost:3000/billing`
- **Knowledge Base (RAG)**: `http://localhost:3000/knowledge`
- **Real-Time Observability**: `http://localhost:3000/observability`

---

## Key Features

1. **Multi-Agent Orchestration**: Supports 15+ specialized role templates (Manager, Developer, Researcher, QA, Security Auditor, DevOps, Designer, Finance, Legal).
2. **Playwright Web Automation**: Headless browser automation for form filling, scraping, screenshotting, and visual DOM inspection.
3. **RAG Vector Search**: Ingests PDFs, Word docs, Excel, CSVs, Markdown, and code repos with semantic chunking and source citations.
4. **Persistent Hybrid Memory**: Short-term session scratchpad, vector semantic long-term memory, working graph memory, and cross-team knowledge retention.
5. **Real-Time Stream**: WebSocket telemetry for reasoning traces, step logs, token tracking, and cost calculation.
