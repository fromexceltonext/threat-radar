import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { NewsItem } from "@/lib/news";

const SOURCE_COLORS: Record<string, string> = {
  CISA: "border-blue-500/30 bg-blue-500/15 text-blue-300",
  "The Hacker News": "border-red-500/30 bg-red-500/15 text-red-300",
  BleepingComputer: "border-amber-500/30 bg-amber-500/15 text-amber-300",
  "Krebs on Security": "border-green-500/30 bg-green-500/15 text-green-300",
};

const formatDate = (iso: string): string =>
  iso ? new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "";

export const NewsCard = ({ item }: { item: NewsItem }) => {
  return (
    <Card className="transition-colors hover:ring-primary/40">
      <CardHeader>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Badge variant="outline" className={SOURCE_COLORS[item.source]}>
            {item.source}
          </Badge>
          <span>{formatDate(item.publishedAt)}</span>
        </div>
        <CardTitle className="leading-snug">
          <a href={item.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
            {item.title}
            <ExternalLink className="ml-1 inline size-3.5 text-muted-foreground" />
          </a>
        </CardTitle>
      </CardHeader>
      {item.summary && <CardContent className="text-sm text-muted-foreground">{item.summary}…</CardContent>}
    </Card>
  );
};