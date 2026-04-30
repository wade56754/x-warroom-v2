import { KPICard } from '@/components/dashboard/KPICard';
import { TopicWarChart } from '@/components/dashboard/TopicWarChart';
import { ClaudeSuggestion } from '@/components/dashboard/ClaudeSuggestion';
import { ActionList } from '@/components/dashboard/ActionList';
import { kpi } from '@/lib/mock-data';

function fmtNum(n: number) {
  if (n >= 1000000) return `${(n / 1000000).toFixed(2)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(n);
}

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <header className="border-b border-slate-800 bg-slate-950 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-base font-semibold text-slate-100">X 数据作战室</h1>
            <span className="text-xs text-slate-600 font-mono">v2 · demo</span>
          </div>
          <nav className="flex gap-1">
            <button className="px-3 py-1.5 text-xs rounded-md bg-slate-800 text-slate-200 font-medium">概览</button>
            <button className="px-3 py-1.5 text-xs rounded-md text-slate-500 hover:text-slate-300 transition-colors">推文列表</button>
            <button className="px-3 py-1.5 text-xs rounded-md text-slate-500 hover:text-slate-300 transition-colors">话题分析</button>
            <button className="px-3 py-1.5 text-xs rounded-md text-slate-500 hover:text-slate-300 transition-colors">设置</button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-6 space-y-6">
        <section>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <KPICard title="追踪推文总数" value={fmtNum(kpi.tracked_tweets)} subtitle="近 30 天" />
            <KPICard title="累计曝光量" value={fmtNum(kpi.total_views)} subtitle="全账号" />
            <KPICard title="24h 曝光" value={fmtNum(kpi.views_24h)} subtitle="过去 24 小时" showSparkline />
            <KPICard title="30 天平均 ER" value={`${(kpi.avg_er * 100).toFixed(2)}%`} subtitle="互动率基线" />
          </div>
        </section>

        <section className="flex gap-4 items-start">
          <TopicWarChart />
          <ClaudeSuggestion />
        </section>

        <section>
          <div className="mb-3">
            <h2 className="text-sm font-medium text-slate-400">行动清单</h2>
            <p className="text-xs text-slate-600 mt-0.5">基于 ER 异常值自动分类，待人工决策</p>
          </div>
          <ActionList />
        </section>
      </main>

      <footer className="border-t border-slate-800 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <p className="text-xs text-slate-700">X 数据作战室 v2 · W1 静态 demo · 全假数据 · Next.js 15 + shadcn/ui + Recharts</p>
        </div>
      </footer>
    </div>
  );
}
