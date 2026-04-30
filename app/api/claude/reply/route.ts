import { NextResponse } from 'next/server';
import { callLLM, hasApiKey, buildReplyPrompt } from '@/lib/claude';

// gpt-5.4 (the suggest default) rejects certain Wade-style reply prompts as
// promo content; gpt-5.4-mini accepts them.
const REPLY_MODEL = 'gpt-5.4-mini';
import { fetchTweetDetail } from '@/lib/queries';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tweetId = searchParams.get('tweet_id');

  if (!tweetId) {
    return NextResponse.json({ error: '缺少 tweet_id 参数' }, { status: 400 });
  }

  if (!hasApiKey()) {
    return NextResponse.json(
      { error: 'LLM_API_KEY 未配置，请在 .env.local 设置' },
      { status: 503 }
    );
  }

  try {
    const rawDetail = await fetchTweetDetail(tweetId);
    if (!rawDetail) {
      return NextResponse.json({ error: '推文不存在' }, { status: 404 });
    }

    const detail = rawDetail as unknown as Record<string, unknown>;
    const tweet = {
      text: String(detail.text ?? detail.text_preview ?? ''),
      topic: String(detail.topic ?? '未分类'),
      replies: Number(detail.replies ?? 0),
    };

    const prompt = buildReplyPrompt(tweet);
    const text = await callLLM(prompt, 400, REPLY_MODEL);

    return NextResponse.json({ text, model: REPLY_MODEL });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
