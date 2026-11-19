import { TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { MonthPoint } from "@/lib/stats";

// A small bar chart made with plain divs: the bar height is a % of the busiest month
export const MonthlyAddedCard = ({ data }: { data: MonthPoint[] }) => {
  const max = Math.max(1, ...data.map((d) => d.value));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="size-4 text-violet-400" />
          Added per month
        </CardTitle>
        <CardDescription>New KEV entries, last 12 months</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex h-52 gap-2">
          {data.map((d) => (
            <div key={d.month} className="group flex flex-1 flex-col items-center gap-1">
              <span className="text-xs tabular-nums text-muted-foreground transition-colors group-hover:text-foreground">
                {d.value}
              </span>
              <div className="flex w-full flex-1 items-end">
                <div
                  className="w-full rounded-t-md bg-linear-to-t from-blue-600 to-violet-400 transition-all group-hover:brightness-125"
                  style={{ height: `${Math.max(2, (d.value / max) * 100)}%` }}
                />
              </div>
              <span className="text-[11px] text-muted-foreground">{d.label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};