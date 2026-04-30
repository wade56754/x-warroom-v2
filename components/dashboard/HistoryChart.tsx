'use client';

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';

interface HistoryPoint {
  sampled_at: string;
  views: number;
  likes: number;
  replies: number;
  retweets: number;
  bookmarks: number;
}

function fmtNum(n: number) {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(n);
}

function fmtTime(iso: string) {
  const d = new Date(iso);
  return `${d.getMonth() + 1}/${d.getDate()} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

export function HistoryChart({ history }: { history: HistoryPoint[] }) {
  if (history.length === 0) {
    return <p className="text-xs text-slate-600 py-4">暂无采样历史</p>;
  }

  const data = history.map((h) => ({
    t: fmtTime(h.sampled_at),
    views: h.views,
    likes: h.likes,
    replies: h.replies,
    retweets: h.retweets,
    bookmarks: h.bookmarks,
  }));

  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={data} margin={{ top: 4, right: 16, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
        <XAxis
          dataKey="t"
          tick={{ fill: '#64748b', fontSize: 10 }}
          axisLine={false}
          tickLine={false}
          interval="preserveStartEnd"
        />
        <YAxis
          yAxisId="views"
          orientation="left"
          tickFormatter={fmtNum}
          tick={{ fill: '#64748b', fontSize: 10 }}
          axisLine={false}
          tickLine={false}
          width={48}
        />
        <YAxis
          yAxisId="engage"
          orientation="right"
          tick={{ fill: '#64748b', fontSize: 10 }}
          axisLine={false}
          tickLine={false}
          width={32}
        />
        <Tooltip
          contentStyle={{
            background: '#1e293b',
            border: '1px solid #334155',
            borderRadius: 6,
            fontSize: 12,
            color: '#e2e8f0',
          }}
          labelStyle={{ color: '#94a3b8' }}
          formatter={(value, name) => [fmtNum(Number(value)), String(name)]}
        />
        <Legend
          wrapperStyle={{ fontSize: 11, color: '#94a3b8', paddingTop: 8 }}
        />
        <Line
          yAxisId="views"
          type="monotone"
          dataKey="views"
          stroke="#3b82f6"
          strokeWidth={1.5}
          dot={false}
          isAnimationActive={false}
          name="阅读"
        />
        <Line
          yAxisId="engage"
          type="monotone"
          dataKey="likes"
          stroke="#f59e0b"
          strokeWidth={1}
          dot={false}
          isAnimationActive={false}
          name="点赞"
        />
        <Line
          yAxisId="engage"
          type="monotone"
          dataKey="retweets"
          stroke="#22c55e"
          strokeWidth={1}
          dot={false}
          isAnimationActive={false}
          name="转推"
        />
        <Line
          yAxisId="engage"
          type="monotone"
          dataKey="replies"
          stroke="#a78bfa"
          strokeWidth={1}
          dot={false}
          isAnimationActive={false}
          name="回复"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
