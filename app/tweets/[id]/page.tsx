import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { HistoryChart } from '@/components/dashboard/HistoryChart';
import { fetchTweetDetail } from '@/lib/queries';

export const dynamic = 'force-dynamic';

function fmtNum(n: number) {
  if (n >= 1000000) return `${(n / 1000000).toFixed(2)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(n);
}

function fmtEr(er: number) {
  return `${(er * 100).toFixed(2)}%`;
}

function fmtDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default async function TweetDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const rawDetail = await fetchTweetDetail(id);
  if (!rawDetail) return notFound();
  const detail = rawDetail as unknown as Record<string, unknown> & {
    history: {
      sampled_at: string;
      views: number;
      likes: number;
      replies: number;
      retweets: number;
      bookmarks: number;
    }[];
  };

  const text = String(detail.text ?? detail.text_preview ?? '');
  const topic = String(detail.topic ?? '—');
  const views = Number(detail.views ?? 0);
  const likes = Number(detail.likes ?? 0);
  const replies = Number(detail.replies ?? 0);
  const retweets = Number(detail.retweets ?? 0);
  const bookmarks = Number(detail.bookmarks ?? 0);
  const er = Number(detail.er ?? 0);
  const createdAt = detail.created_at ? fmtDate(String(detail.created_at)) : '—';
  const history = detail.history ?? [];

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

      <main className="max-w-4xl mx-auto px-6 py-6 space-y-6">
        <div>
          <Link href="/tweets" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
            ← 返回推文列表
          </Link>
        </div>

        {/* Tweet content */}
        <div className="rounded-xl bg-slate-900 border border-slate-800 p-5 space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs border-slate-700 text-slate-400">
              {topic}
            </Badge>
            <span className="text-xs text-slate-600 font-mono">{createdAt}</span>
          </div>
          <p className="text-slate-100 leading-relaxed whitespace-pre-wrap">{text}</p>
          <div className="pt-2 border-t border-slate-800">
            <a
              href={`https://x.com/wadezone/status/${id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
            >
              在 X 查看原文 →
            </a>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {[
            { label: '阅读', value: fmtNum(views), color: 'text-blue-400' },
            { label: '点赞', value: fmtNum(likes), color: 'text-amber-400' },
            { label: '转推', value: fmtNum(retweets), color: 'text-green-400' },
            { label: '回复', value: fmtNum(replies), color: 'text-violet-400' },
            { label: '收藏', value: fmtNum(bookmarks), color: 'text-pink-400' },
            { label: 'ER', value: fmtEr(er), color: er > 0.02 ? 'text-green-400' : er < 0.002 ? 'text-red-400' : 'text-slate-300' },
          ].map(({ label, value, color }) => (
            <div key={label} className="rounded-lg bg-slate-900 border border-slate-800 p-3 text-center">
              <p className="text-xs text-slate-500 mb-1">{label}</p>
              <p className={`text-lg font-bold font-mono ${color}`}>{value}</p>
            </div>
          ))}
        </div>

        {/* History chart */}
        <div className="rounded-xl bg-slate-900 border border-slate-800 p-5">
          <h2 className="text-sm font-medium text-slate-400 mb-4">
            采样趋势（{history.length} 个采样点）
          </h2>
          <HistoryChart history={history} />
        </div>

        {/* Tweet ID */}
        <p className="text-xs text-slate-700 font-mono">tweet_id: {id}</p>
      </main>
    </div>
  );
}
