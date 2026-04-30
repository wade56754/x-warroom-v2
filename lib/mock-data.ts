export const kpi = {
  tracked_tweets: 427,
  total_views: 3117757,
  views_24h: 275101,
  avg_er: 0.0074,
};

export const topicWar = [
  { topic: '心理学/科学', posts_7d: 2, median_er_7d: 0.0199, vs_baseline_pct: 217, trend: 'rising' },
  { topic: '知识付费与 IP', posts_7d: 27, median_er_7d: 0.0105, vs_baseline_pct: 67, trend: 'rising' },
  { topic: 'AI 与工具', posts_7d: 32, median_er_7d: 0.0081, vs_baseline_pct: 29, trend: 'stable' },
  { topic: '媒体推/转推', posts_7d: 6, median_er_7d: 0.0068, vs_baseline_pct: 8, trend: 'stable' },
  { topic: '认知与社会', posts_7d: 20, median_er_7d: 0.0066, vs_baseline_pct: 4, trend: 'falling' },
  { topic: '段子与吐槽', posts_7d: 16, median_er_7d: 0.0053, vs_baseline_pct: -15, trend: 'falling' },
  { topic: '哲学与思考', posts_7d: 13, median_er_7d: 0.0051, vs_baseline_pct: -19, trend: 'falling' },
  { topic: '两性/婚恋', posts_7d: 1, median_er_7d: 0.006, vs_baseline_pct: -4, trend: 'falling' },
  { topic: '泛流量/其他', posts_7d: 33, median_er_7d: 0.0055, vs_baseline_pct: -12, trend: 'falling' },
];

export const actions = {
  boost: [
    {
      tweet_id: '2049474637621592419',
      text_preview: '感谢各位支持，我以后一定努力创作。',
      topic: '泛流量/其他',
      views: 1380,
      er: 0.071,
    },
    {
      tweet_id: '2049165390635532355',
      text_preview: '层次1：表面结构复用（入口skill、流程、工具类）',
      topic: 'AI 与工具',
      views: 837,
      er: 0.067,
    },
    {
      tweet_id: '2048977314994954432',
      text_preview: '一个人知道自己为什么而活，他就能忍受任何一种生活。',
      topic: '哲学与思考',
      views: 9616,
      er: 0.034,
    },
  ],
  kill: [
    {
      tweet_id: '2042524642410402272',
      text_preview: '转发看看有多少人还在',
      topic: '泛流量/其他',
      views: 116427,
      er: 0.0,
    },
    {
      tweet_id: '2041882930174812161',
      text_preview: '今天又是普通的一天',
      topic: '泛流量/其他',
      views: 88302,
      er: 0.0003,
    },
    {
      tweet_id: '2040931744213102593',
      text_preview: '大家周末愉快',
      topic: '泛流量/其他',
      views: 72441,
      er: 0.0004,
    },
    {
      tweet_id: '2039740128874401792',
      text_preview: '在吗？看到扣1',
      topic: '泛流量/其他',
      views: 61203,
      er: 0.0002,
    },
    {
      tweet_id: '2038821047392018433',
      text_preview: '分享一下我的日常作息时间表',
      topic: '泛流量/其他',
      views: 54890,
      er: 0.0008,
    },
    {
      tweet_id: '2037912844018302977',
      text_preview: '问一下大家都用什么手机',
      topic: '泛流量/其他',
      views: 48771,
      er: 0.0009,
    },
    {
      tweet_id: '2036887021938401280',
      text_preview: '今天吃了什么？',
      topic: '泛流量/其他',
      views: 42130,
      er: 0.001,
    },
    {
      tweet_id: '2035741028193021952',
      text_preview: '新的一周加油',
      topic: '泛流量/其他',
      views: 38002,
      er: 0.0005,
    },
    {
      tweet_id: '2034882039128401920',
      text_preview: '感觉最近好累',
      topic: '泛流量/其他',
      views: 31004,
      er: 0.0011,
    },
    {
      tweet_id: '2033991028374820864',
      text_preview: '大家有没有推荐的书',
      topic: '泛流量/其他',
      views: 27881,
      er: 0.0013,
    },
  ],
  reply: [
    {
      tweet_id: '2048659888596041966',
      text_preview: '我们 90 后没正式学过繁体字，但基本都能认识，这是因为……',
      topic: '认知与社会',
      replies: 431,
    },
    {
      tweet_id: '2048971081458004374',
      text_preview: '哲学里最震撼你的一句话',
      topic: '哲学与思考',
      replies: 186,
    },
    {
      tweet_id: '2047812930183741440',
      text_preview: '你觉得中国人最缺乏的精神是什么？',
      topic: '认知与社会',
      replies: 143,
    },
  ],
};

export const claudeSuggestion = {
  topic_to_double_down: '心理学/科学',
  reason:
    '本周 2 条推 ER 平均 1.99%，比账号 30 天基线高 217%。建议加码 5-10 条邓巴 / 公羊博弈 / 卡尼曼 / 塔勒布风格的反常识叙事。',
  proof_tweets: ['2045682292765691952', '2044349468825592197'],
};

export const sparkData24h = [
  { hour: '00:00', views: 12500 },
  { hour: '01:00', views: 11800 },
  { hour: '02:00', views: 9200 },
  { hour: '03:00', views: 7100 },
  { hour: '04:00', views: 6400 },
  { hour: '05:00', views: 8300 },
  { hour: '06:00', views: 14200 },
  { hour: '07:00', views: 18900 },
  { hour: '08:00', views: 22400 },
  { hour: '09:00', views: 19800 },
  { hour: '10:00', views: 17300 },
  { hour: '11:00', views: 15600 },
  { hour: '12:00', views: 21100 },
  { hour: '13:00', views: 18700 },
  { hour: '14:00', views: 16200 },
  { hour: '15:00', views: 13400 },
  { hour: '16:00', views: 14800 },
  { hour: '17:00', views: 18300 },
  { hour: '18:00', views: 23500 },
  { hour: '19:00', views: 27900 },
  { hour: '20:00', views: 24100 },
  { hour: '21:00', views: 19800 },
  { hour: '22:00', views: 16400 },
  { hour: '23:00', views: 13200 },
];
