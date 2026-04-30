"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type FetchState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'done'; text: string };

export function ClaudeSuggestion() {
  const [state, setState] = useState<FetchState>({ status: 'loading' });

  function load() {
    setState({ status: 'loading' });
    fetch('/api/claude/suggest')
      .then((r) => r.json())
      .then((data: { text?: string; error?: string }) => {
        if (data.error) setState({ status: 'error', message: data.error });
        else setState({ status: 'done', text: data.text ?? '' });
      })
      .catch((e: unknown) =>
        setState({ status: 'error', message: String(e) })
      );
  }

  useEffect(() => {
    let cancelled = false;
    fetch('/api/claude/suggest')
      .then((r) => r.json())
      .then((data: { text?: string; error?: string }) => {
        if (cancelled) return;
        if (data.error) setState({ status: 'error', message: data.error });
        else setState({ status: 'done', text: data.text ?? '' });
      })
      .catch((e: unknown) => {
        if (!cancelled) setState({ status: 'error', message: String(e) });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Card className="bg-slate-900 border-slate-800 w-80 shrink-0">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-slate-400">Claude 建议</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {state.status === 'loading' && (
          <div className="space-y-2">
            <div className="h-3 bg-slate-800 rounded animate-pulse w-full" />
            <div className="h-3 bg-slate-800 rounded animate-pulse w-4/5" />
            <div className="h-3 bg-slate-800 rounded animate-pulse w-3/5" />
          </div>
        )}
        {state.status === 'error' && (
          <div className="space-y-2">
            <p className="text-xs text-amber-400 leading-relaxed">{state.message}</p>
            <button
              onClick={load}
              className="text-xs text-slate-400 hover:text-slate-200 underline transition-colors"
            >
              重试
            </button>
          </div>
        )}
        {state.status === 'done' && (
          <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">{state.text}</p>
        )}
        <div className="pt-2 border-t border-slate-800">
          <p className="text-xs text-slate-600">基于 30 天账号基线 · 真实数据</p>
        </div>
      </CardContent>
    </Card>
  );
}
