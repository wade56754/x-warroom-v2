'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { topicWar } from '@/lib/mock-data';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  ReferenceLine,
} from 'recharts';

function getBarColor(vs: number) {
  if (vs > 20) return '#22c55e';
  if (vs < -20) return '#ef4444';
  return '#64748b';
}

const sorted = [...topicWar].sort((a, b) => b.vs_baseline_pct - a.vs_baseline_pct);

export function TopicWarChart() {
  return (
    <Card className="bg-slate-900 border-slate-800 flex-1" style={{ minWidth: 0 }}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-slate-400">
          话题战场 · 7 天 ER vs 基线
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart
            data={sorted}
            layout="vertical"
            margin={{ top: 0, right: 40, left: 0, bottom: 0 }}
          >
            <XAxis
              type="number"
              tickFormatter={(v) => `${v}%`}
              tick={{ fill: '#64748b', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              type="category"
              dataKey="topic"
              width={110}
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v: string) => v}
            />
            <Tooltip
              cursor={{ fill: 'rgba(255,255,255,0.04)' }}
              contentStyle={{
                background: '#1e293b',
                border: '1px solid #334155',
                borderRadius: 6,
                fontSize: 12,
                color: '#e2e8f0',
              }}
              formatter={(value) => {
                const n = Number(value);
                return [`${n > 0 ? '+' : ''}${n}%`, 'vs 基线'];
              }}
              labelFormatter={(label) => String(label)}
            />
            <ReferenceLine x={0} stroke="#334155" />
            <Bar dataKey="vs_baseline_pct" radius={[0, 3, 3, 0]}>
              {sorted.map((entry) => (
                <Cell key={entry.topic} fill={getBarColor(entry.vs_baseline_pct)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="flex gap-4 mt-2 text-xs text-slate-500">
          <span>
            <span className="inline-block w-2 h-2 rounded-sm bg-green-500 mr-1" />
            显著超基线 (&gt;20%)
          </span>
          <span>
            <span className="inline-block w-2 h-2 rounded-sm bg-slate-500 mr-1" />
            持平
          </span>
          <span>
            <span className="inline-block w-2 h-2 rounded-sm bg-red-500 mr-1" />
            显著低基线 (&lt;-20%)
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
