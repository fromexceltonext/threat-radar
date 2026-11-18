import type { ReactNode } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { DueItem } from "@/lib/stats";

// One "label: value" row
const Fact = ({ label, children }: { label: string; children: ReactNode }) => {
  return (
    <div className="flex justify-between gap-4 py-2">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-right">{children}</dd>
    </div>
  );
};

export const ThreatFacts = ({ threat: t }: { threat: DueItem }) => {
  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>Details</CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="divide-y divide-border text-sm">
          <Fact label="Vendor">
            <Link
              href={`/threats?vendor=${encodeURIComponent(t.vendorProject)}`}
              className="text-primary hover:underline"
            >
              {t.vendorProject}
            </Link>
          </Fact>
          <Fact label="Product">{t.product}</Fact>
          <Fact label="Added">{t.dateAdded}</Fact>
          <Fact label="Due">{t.dueDate}</Fact>
          <Fact label="CWE">{(t.cwes ?? []).join(", ") || "—"}</Fact>
        </dl>
      </CardContent>
    </Card>
  );
};