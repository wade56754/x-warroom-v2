# X 数据作战室 v2

X account analytics dashboard built with Next.js 15, shadcn/ui, and Recharts.
Connects to Supabase for real tweet data (W2) and Claude AI for suggestions (W3).

## 与 v1 的关系

[v1 (`x-data-warroom`)](https://github.com/wade56754/x-data-warroom) is a vanilla SVG MVP.
v2 is a full product rewrite: component architecture, real-time data pipeline, Claude AI integration roadmap.

## W1-W4 路线图

| Sprint | 目标 |
|--------|------|
| W1 (done) | Next.js 15 + shadcn/ui static demo, all mock data |
| W2 | Supabase connection, real tweet ingestion, live KPI cards |
| W3 | Claude AI suggestion engine via API |
| W4 | Vercel deploy, cron ingestion, production hardening |

## Quick Start

```bash
git clone https://github.com/wade56754/x-warroom-v2
cd x-warroom-v2
bun install
bun dev
# open http://localhost:3000
```

## Tech Stack

- **Framework**: Next.js 15 (App Router, TypeScript)
- **UI**: shadcn/ui (slate theme, dark mode default)
- **Charts**: Recharts 3
- **Styles**: Tailwind CSS 4
- **Package manager**: bun
- **Database** (W2+): Supabase (PostgreSQL)
- **AI** (W3+): Anthropic Claude API

## Acknowledgements

- [shadcn/ui](https://ui.shadcn.com) — component library
- [Recharts](https://recharts.org) — composable chart library
- [Vercel](https://vercel.com) — deployment platform
- [Anthropic](https://anthropic.com) — Claude AI API
