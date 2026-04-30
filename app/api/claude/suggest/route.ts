import { NextResponse } from 'next/server';
import { getClient, buildSuggestPrompt, MODEL } from '@/lib/claude';
import { fetchKPI, fetchTopicWar, fetchActions } from '@/lib/queries';

export async function GET() {
  const client = getClient();
  if (!client) {
    return NextResponse.json(
      { error: 'ANTHROPIC_API_KEY 未配置，请在 .env.local 设置' },
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

    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 600,
      messages: [{ role: 'user', content: prompt }],
    });

    const text = response.content
      .filter((c) => c.type === 'text')
      .map((c) => (c as { type: 'text'; text: string }).text)
      .join('');

    return NextResponse.json({ text, model: MODEL });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
