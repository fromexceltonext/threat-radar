import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { DueItem } from "@/lib/stats";
import { DueBadge } from "./DueBadge";

export const DueSoonList = ({ items }: { items: DueItem[] }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Due soon</CardTitle>
        <CardDescription>Overdue first, then the next 14 days</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="divide-y divide-border">
          {items.map((t) => (
            <li key={t.cveID} className="flex items-center justify-between gap-4 py-3">
              <div className="min-w-0">
                <p className="font-mono text-sm">{t.cveID}</p>
                <p className="truncate text-sm text-muted-foreground">
                  {t.vendorProject} · {t.product}
                </p>
              </div>
              <DueBadge status={t.status} daysLeft={t.daysLeft} />
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};