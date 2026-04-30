"use client";

import { useState } from 'react';

export function ReplyGenButton({ tweetId }: { tweetId: string }) {
  const [replies, setReplies] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setLoading(true);
    setError(null);
    try {
      const r = await fetch(`/api/claude/reply?tweet_id=${tweetId}`);
      const data = (await r.json()) as { text?: string; error?: string };
      if (data.error) setError(data.error);
      else setReplies(data.text ?? null);
    } catch (e: unknown) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl bg-slate-900 border border-slate-800 p-5 space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-slate-400">回复模板</h2>
        <button
          onClick={handleClick}
          disabled={loading}
          className="px-3 py-1.5 text-xs rounded-md bg-slate-800 text-slate-200 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? '生成中...' : '生成回复模板'}
        </button>
      </div>
      {error && (
        <p className="text-xs text-amber-400 leading-relaxed">{error}</p>
      )}
      {replies && (
        <pre className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap font-sans">
          {replies}
        </pre>
      )}
      {!replies && !error && !loading && (
        <p className="text-xs text-slate-600">点击按钮，Claude 将基于推文内容生成 3 条候选回复</p>
      )}
    </div>
  );
}
