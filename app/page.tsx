import Link from 'next/link';
import { KPICard } from '@/components/dashboard/KPICard';
import { TopicWarChart } from '@/components/dashboard/TopicWarChart';
import { ClaudeSuggestion } from '@/components/dashboard/ClaudeSuggestion';
import { ActionList } from '@/components/dashboard/ActionList';
import { fetchKPI, fetchTopicWar, fetchActions } from '@/lib/queries';

export const dynamic = 'force-dynamic';

function fmtNum(n: number) {
  if (n >= 1000000) return `${(n / 1000000).toFixed(2)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(n);
}

// Build structured actions data from flat v_dashboard_actions rows
function buildActions(rows: Record<string, unknown>[]) {
  const boost: typeof rows = [];
  const kill: typeof rows = [];
  const reply: typeof rows = [];
  for (const row of rows) {
    if (row.action_type === 'boost') boost.push(row);
    else if (row.action_type === 'kill') kill.push(row);
    else if (row.action_type === 'reply') reply.push(row);
  }
  return { boost, kill, reply };
}

// Build a placeholder suggestion from topic war data (top performer)
function buildSuggestion(topicWar: Record<string, unknown>[]) {
  const sorted = [...topicWar].sort(
    (a, b) => (Number(b.vs_baseline_pct) || 0) - (Number(a.vs_baseline_pct) || 0)
  );
  const top = sorted[0];
  if (!top) {
    return {
      topic_to_double_down: '暂无数据',
      reason: '暂无足够数据生成建议。',
      proof_tweets: [],
    };
  }
  return {
    topic_to_double_down: String(top.topic ?? ''),
    reason: `本周该话题 ER 比账号 30 天基线高 ${top.vs_baseline_pct}%，发帖 ${top.posts_7d} 条。建议加码该类内容。`,
    proof_tweets: [],
  };
}

export default async function Home() {
  const [kpi, topicWar, actionRows] = await Promise.all([
    fetchKPI(),
    fetchTopicWar(),
    fetchActions(),
  ]);

  const actions = buildActions(actionRows as Record<string, unknown>[]);
  const suggestion = buildSuggestion(topicWar as Record<string, unknown>[]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <header className="border-b border-slate-800 bg-slate-950 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-base font-semibold text-slate-100">X 数据作战室</h1>
            <span className="text-xs text-slate-600 font-mono">v2</span>
          </div>
          <nav className="flex gap-1">
            <Link href="/" className="px-3 py-1.5 text-xs rounded-md bg-slate-800 text-slate-200 font-medium">
              概览
            </Link>
            <Link href="/tweets" className="px-3 py-1.5 text-xs rounded-md text-slate-500 hover:text-slate-300 transition-colors">
              推文列表
            </Link>
            <Link href="/tweets?kind=boost" className="px-3 py-1.5 text-xs rounded-md text-slate-500 hover:text-slate-300 transition-colors">
              追投
            </Link>
            <Link href="/tweets?kind=kill" className="px-3 py-1.5 text-xs rounded-md text-slate-500 hover:text-slate-300 transition-colors">
              撤稿
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-6 space-y-6">
        <section>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <KPICard
              title="追踪推文总数"
              value={fmtNum(Number(kpi?.tracked_tweets ?? 0))}
              subtitle="近 30 天"
            />
            <KPICard
              title="累计曝光量"
              value={fmtNum(Number(kpi?.total_views ?? 0))}
              subtitle="全账号"
            />
            <KPICard
              title="24h 曝光"
              value={fmtNum(Number(kpi?.views_24h ?? 0))}
              subtitle="过去 24 小时"
              showSparkline
              sparkData={[]}
            />
            <KPICard
              title="30 天平均 ER"
              value={`${(Number(kpi?.avg_er ?? 0) * 100).toFixed(2)}%`}
              subtitle="互动率基线"
            />
          </div>
        </section>

        <section className="flex gap-4 items-start">
          <TopicWarChart data={topicWar as unknown as Parameters<typeof TopicWarChart>[0]['data']} />
          <ClaudeSuggestion data={suggestion} />
        </section>

        <section>
          <div className="mb-3">
            <h2 className="text-sm font-medium text-slate-400">行动清单</h2>
            <p className="text-xs text-slate-600 mt-0.5">基于 ER 异常值自动分类，待人工决策</p>
          </div>
          <ActionList actions={actions as unknown as Parameters<typeof ActionList>[0]['actions']} />
        </section>
      </main>

      <footer className="border-t border-slate-800 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <p className="text-xs text-slate-700">X 数据作战室 v2 · 真实数据 · Next.js 16 + shadcn/ui + Recharts + Supabase</p>
        </div>
      </footer>
    </div>
  );
}
