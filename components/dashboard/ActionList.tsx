import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

interface ActionItem {
  tweet_id: string;
  text_preview: string;
  topic: string;
  views?: number;
  er?: number;
  replies?: number;
}

interface ActionsData {
  boost: ActionItem[];
  kill: ActionItem[];
  reply: ActionItem[];
}

function fmtNum(n: number) {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return String(n);
}

function fmtEr(er: number) {
  return `${(er * 100).toFixed(2)}%`;
}

export function ActionList({ actions }: { actions: ActionsData }) {
  return (
    <Tabs defaultValue="boost" className="w-full">
      <TabsList className="bg-slate-800 border border-slate-700">
        <TabsTrigger value="boost" className="data-[state=active]:bg-slate-700 text-slate-300">
          加码 ({actions.boost.length})
        </TabsTrigger>
        <TabsTrigger value="kill" className="data-[state=active]:bg-slate-700 text-slate-300">
          下架 ({actions.kill.length})
        </TabsTrigger>
        <TabsTrigger value="reply" className="data-[state=active]:bg-slate-700 text-slate-300">
          回复 ({actions.reply.length})
        </TabsTrigger>
      </TabsList>

      <TabsContent value="boost" className="mt-3">
        <div className="space-y-2">
          {actions.boost.map((item) => (
            <Link key={item.tweet_id} href={`/tweets/${item.tweet_id}`}>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors">
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-200 truncate">{item.text_preview}</p>
                  <div className="flex gap-2 mt-1">
                    <Badge variant="outline" className="text-xs border-slate-700 text-slate-400">
                      {item.topic}
                    </Badge>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs text-slate-400">{fmtNum(item.views ?? 0)} 阅读</p>
                  <p className="text-sm font-mono text-green-400 font-medium">{fmtEr(item.er ?? 0)} ER</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <p className="text-xs text-slate-600 mt-3">ER 高于账号基线 2x 以上，建议追加互动或续写</p>
      </TabsContent>

      <TabsContent value="kill" className="mt-3">
        <div className="space-y-2">
          {actions.kill.map((item) => (
            <Link key={item.tweet_id} href={`/tweets/${item.tweet_id}`}>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors">
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-200 truncate">{item.text_preview}</p>
                  <div className="flex gap-2 mt-1">
                    <Badge variant="outline" className="text-xs border-slate-700 text-slate-400">
                      {item.topic}
                    </Badge>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs text-slate-400">{fmtNum(item.views ?? 0)} 阅读</p>
                  <p className="text-sm font-mono text-red-400 font-medium">{fmtEr(item.er ?? 0)} ER</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <p className="text-xs text-slate-600 mt-3">高曝光低互动，建议置顶回复说明或删除以免拉低账号整体 ER</p>
      </TabsContent>

      <TabsContent value="reply" className="mt-3">
        <div className="space-y-2">
          {actions.reply.map((item) => (
            <Link key={item.tweet_id} href={`/tweets/${item.tweet_id}`}>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors">
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-200 truncate">{item.text_preview}</p>
                  <div className="flex gap-2 mt-1">
                    <Badge variant="outline" className="text-xs border-slate-700 text-slate-400">
                      {item.topic}
                    </Badge>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-mono text-blue-400 font-medium">{item.replies ?? 0} 回复</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <p className="text-xs text-slate-600 mt-3">回复数高，互动热度仍在，建议在评论区追加观点引导讨论</p>
      </TabsContent>
    </Tabs>
  );
}
