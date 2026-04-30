// OpenAI-compatible LLM client. Defaults to deepai.wang (NewAPI gateway).
// Uses raw fetch — the OpenAI SDK auto-rewrites max_tokens → max_completion_tokens
// for "reasoning" models, which deepai.wang's gpt-5.x endpoints reject.

const DEFAULT_BASE_URL = 'https://api.deepai.wang/v1';
export const MODEL = process.env.LLM_MODEL ?? 'gpt-5.4';

export function hasApiKey(): boolean {
  return Boolean(process.env.LLM_API_KEY);
}

export async function callLLM(prompt: string, maxTokens: number): Promise<string> {
  const key = process.env.LLM_API_KEY;
  if (!key) throw new Error('LLM_API_KEY not set');
  const baseUrl = (process.env.LLM_BASE_URL ?? DEFAULT_BASE_URL).replace(/\/$/, '');

  const res = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: maxTokens,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`LLM ${res.status}: ${body.slice(0, 500)}`);
  }

  const data = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  return data.choices?.[0]?.message?.content ?? '';
}

// 选题建议 prompt（基于 KPI / topic_war / actions 数据）
export function buildSuggestPrompt(data: {
  kpi: Record<string, unknown>;
  topicWar: Record<string, unknown>[];
  actions: Record<string, unknown>[];
}): string {
  return `你是 Wade 的 X 创作策略顾问。

【账号当前状态】
- 追踪推文：${data.kpi.tracked_tweets}
- 累计曝光：${data.kpi.total_views}
- 24h 曝光增量：${data.kpi.views_24h}
- 30 天平均 ER：${(Number(data.kpi.avg_er) * 100).toFixed(2)}%

【7 天类目战况】（按发推数倒序）
${data.topicWar.map(t => `- ${t.topic}: ${t.posts_7d} 条，中位 ER ${(Number(t.median_er_7d) * 100).toFixed(2)}%，相比 30d 基线 ${Number(t.vs_baseline_pct) > 0 ? '+' : ''}${t.vs_baseline_pct}%（${t.trend}）`).join('\n')}

【今日行动列表】
- 追投候选：${data.actions.filter((a) => a.kind === 'boost' || a.action_type === 'boost').length} 条
- 撤稿候选：${data.actions.filter((a) => a.kind === 'kill' || a.action_type === 'kill').length} 条
- 回复候选：${data.actions.filter((a) => a.kind === 'reply' || a.action_type === 'reply').length} 条

【你的任务】
基于以上数据，给 Wade 三条建议：
1. 下周应当加码哪个类目（用具体数据支持）
2. 哪类应当减少（用基线对比）
3. 1 个具体写作主题建议（Wade 体量适配，不空喊）

要求：
- 每条 ≤ 50 字
- 用真实数据引用（百分比 / 类目名）
- 中文，无 emoji
- 不写鸡汤 / 不写"你应该"等命令式
- 直接给结论，不绕弯`;
}

// 回复模板 prompt
export function buildReplyPrompt(tweet: {
  text: string;
  topic: string;
  replies: number;
}): string {
  return `你是 Wade 的 X 评论区回复助理。

【推文内容】
"${tweet.text}"

【类目】${tweet.topic}
【已收到 ${tweet.replies} 条评论】

【你的任务】
为 Wade 生成 3 条候选回复短文，用 Wade 的语言风格（直接、不油腻、不鸡汤、有反差）：
1. 一句话延伸观点的回复（吸引继续讨论）
2. 一句话反问的回复（激发评论区互动）
3. 一句话感谢 + 引流到长文/产品的回复（变现导向）

要求：
- 每条 ≤ 30 字
- 不用 emoji
- 不用"哈哈"、"嘿嘿"等口语水词
- 给完整文本可直接 copy 粘贴`;
}
