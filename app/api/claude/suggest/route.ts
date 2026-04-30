import { NextResponse } from 'next/server';
import { callLLM, hasApiKey, buildSuggestPrompt, MODEL } from '@/lib/claude';
import { fetchKPI, fetchTopicWar, fetchActions } from '@/lib/queries';

export async function GET() {
  if (!hasApiKey()) {
    return NextResponse.json(
      { error: 'LLM_API_KEY 未配置，请在 .env.local 设置' },
      { status: 503 }
    );
  }

  try {
    const [kpi, topicWar, actions] = await Promise.all([
      fetchKPI(),
      fetchTopicWar(),
      fetchActions(),
    ]);

    const prompt = buildSuggestPrompt({
      kpi: (kpi ?? {}) as Record<string, unknown>,
      topicWar: topicWar as Record<string, unknown>[],
      actions: actions as Record<string, unknown>[],
    });

    const text = await callLLM(prompt, 600);

    return NextResponse.json({ text, model: MODEL });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
