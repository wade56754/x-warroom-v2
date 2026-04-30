import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { fetchRecent48h, fetchActions } from '@/lib/queries';

export const dynamic = 'force-dynamic';

function fmtNum(n: number) {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(n);
}

function fmtEr(er: number) {
  return `${(er * 100).toFixed(2)}%`;
}

function velColor(v: number) {
  if (v > 500) return 'text-green-400';
  if (v < 50) return 'text-red-400';
  return 'text-slate-300';
}

type Kind = 'boost' | 'kill' | 'reply' | undefined;

export default async function TweetsPage({
  searchParams,
}: {
  searchParams: Promise<{ kind?: string; limit?: string }>;
}) {
  const params = await searchParams;
  const kind = params.kind as Kind;
  const limit = Math.min(parseInt(params.limit ?? '100', 10), 500);

  let tweets: Record<string, unknown>[];

  if (kind === 'boost' || kind === 'kill' || kind === 'reply') {
    const actionRows = await fetchActions();
    tweets = (actionRows as Record<string, unknown>[]).filter(
      (r) => r.action_type === kind
    );
    if (tweets.length === 0) return notFound();
  } else {
    tweets = (await fetchRecent48h(limit)) as Record<string, unknown>[];
  }

  const kindLabel: Record<string, string> = {
    boost: '加码推文',
    kill: '撤稿候选',
    reply: '待回复',
  };

  const title = kind ? kindLabel[kind] : `推文列表（48h，最近 ${limit} 条）`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <header className="border-b border-slate-800 bg-slate-950 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-base font-semibold text-slate-100">X 数据作战室</h1>
            <span className="text-xs text-slate-600 font-mono">v2</span>
          </div>
          <nav className="flex gap-1">
            <Link href="/" className="px-3 py-1.5 text-xs rounded-md text-slate-500 hover:text-slate-300 transition-colors">
              概览
            </Link>
            <Link href="/tweets" className={`px-3 py-1.5 text-xs rounded-md font-medium ${!kind ? 'bg-slate-800 text-slate-200' : 'text-slate-500 hover:text-slate-300 transition-colors'}`}>
              推文列表
            </Link>
            <Link href="/tweets?kind=boost" className={`px-3 py-1.5 text-xs rounded-md font-medium ${kind === 'boost' ? 'bg-slate-800 text-slate-200' : 'text-slate-500 hover:text-slate-300 transition-colors'}`}>
              追投
            </Link>
            <Link href="/tweets?kind=kill" className={`px-3 py-1.5 text-xs rounded-md font-medium ${kind === 'kill' ? 'bg-slate-800 text-slate-200' : 'text-slate-500 hover:text-slate-300 transition-colors'}`}>
              撤稿
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-6">
        <div className="mb-4">
          <h2 className="text-sm font-medium text-slate-400">{title}</h2>
          <p className="text-xs text-slate-600 mt-0.5">{tweets.length} 条</p>
        </div>

        <div className="overflow-x-auto rounded-lg border border-slate-800">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900">
                <th className="text-left px-4 py-2.5 text-xs font-medium text-slate-500 w-1/2">推文预览</th>
                <th className="text-left px-4 py-2.5 text-xs font-medium text-slate-500">类目</th>
                <th className="text-right px-4 py-2.5 text-xs font-medium text-slate-500">阅读</th>
                <th className="text-right px-4 py-2.5 text-xs font-medium text-slate-500">回复</th>
                <th className="text-right px-4 py-2.5 text-xs font-medium text-slate-500">ER</th>
                <th className="text-right px-4 py-2.5 text-xs font-medium text-slate-500">v/h</th>
              </tr>
            </thead>
            <tbody>
              {tweets.map((row) => {
                const id = String(row.tweet_id ?? '');
                const text = String(row.text_preview ?? row.text ?? '').slice(0, 60);
                const topic = String(row.topic ?? '—');
                const views = Number(row.views ?? 0);
                const replies = Number(row.replies ?? 0);
                const er = Number(row.er ?? 0);
                const vel = Number(row.velocity_vph ?? 0);

                return (
                  <tr
                    key={id}
                    className="border-b border-slate-800/60 hover:bg-slate-900/60 transition-colors"
                  >
                    <td className="px-4 py-2.5">
                      <Link href={`/tweets/${id}`} className="text-slate-200 hover:text-blue-400 transition-colors">
                        {text}{text.length >= 60 ? '…' : ''}
                      </Link>
                    </td>
                    <td className="px-4 py-2.5">
                      <Badge variant="outline" className="text-xs border-slate-700 text-slate-400">
                        {topic}
                      </Badge>
                    </td>
                    <td className="px-4 py-2.5 text-right text-slate-400 font-mono text-xs">
                      {fmtNum(views)}
                    </td>
                    <td className="px-4 py-2.5 text-right text-slate-400 font-mono text-xs">
                      {replies > 0 ? replies : '—'}
                    </td>
                    <td className="px-4 py-2.5 text-right font-mono text-xs">
                      {er > 0 ? (
                        <span className={er > 0.02 ? 'text-green-400' : er < 0.002 ? 'text-red-400' : 'text-slate-300'}>
                          {fmtEr(er)}
                        </span>
                      ) : '—'}
                    </td>
                    <td className={`px-4 py-2.5 text-right font-mono text-xs ${velColor(vel)}`}>
                      {vel > 0 ? fmtNum(vel) : '—'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
