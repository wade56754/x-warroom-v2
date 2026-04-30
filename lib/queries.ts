import { sql } from './db';

export async function fetchKPI() {
  const rows = await sql`SELECT * FROM v_dashboard_kpi`;
  return rows[0] ?? null;
}

export async function fetchTopicWar() {
  return await sql`SELECT * FROM v_dashboard_topic_war ORDER BY posts_7d DESC NULLS LAST`;
}

export async function fetchActions() {
  return await sql`SELECT * FROM v_dashboard_actions`;
}

// 推文列表（48h 默认）
export async function fetchRecent48h(limit = 100) {
  return await sql`SELECT * FROM v_dashboard_recent_48h LIMIT ${limit}`;
}

// 单推详情（含 sample history）
export async function fetchTweetDetail(tweetId: string) {
  const rows = await sql`SELECT * FROM v_tweet_with_prev WHERE tweet_id = ${tweetId}`;
  if (rows.length === 0) return null;
  const history = await sql`
    SELECT sampled_at, views, likes, replies, retweets, bookmarks
    FROM samples
    WHERE tweet_id = ${tweetId}
    ORDER BY sampled_at ASC`;
  return { ...rows[0], history };
}

export async function fetchVelocityTop(limit = 20) {
  return await sql`SELECT * FROM v_dashboard_velocity_top LIMIT ${limit}`;
}

export async function fetchAllTopics() {
  return await sql`SELECT DISTINCT topic FROM tweets WHERE topic IS NOT NULL ORDER BY topic`;
}
