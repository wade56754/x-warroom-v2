import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { claudeSuggestion } from '@/lib/mock-data';

export function ClaudeSuggestion() {
  return (
    <Card className="bg-slate-900 border-slate-800 w-80 shrink-0">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-slate-400">Claude 建议</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <p className="text-xs text-slate-500 mb-1">建议加码话题</p>
          <Badge className="bg-green-900 text-green-300 hover:bg-green-900 text-sm font-medium">
            {claudeSuggestion.topic_to_double_down}
          </Badge>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed">{claudeSuggestion.reason}</p>
        <div>
          <p className="text-xs text-slate-500 mb-2">实证推文</p>
          <div className="space-y-1">
            {claudeSuggestion.proof_tweets.map((id) => (
              <a
                key={id}
                href={`https://x.com/wadezone/status/${id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-xs text-blue-400 hover:text-blue-300 font-mono truncate"
              >
                /{id}
              </a>
            ))}
          </div>
        </div>
        <div className="pt-2 border-t border-slate-800">
          <p className="text-xs text-slate-600">基于 30 天账号基线 · 全假数据 demo</p>
        </div>
      </CardContent>
    </Card>
  );
}
