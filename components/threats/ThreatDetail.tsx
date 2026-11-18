import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageHeader } from "@/components/layout/PageHeader";
import { DueBadge } from "@/components/dashboard/DueBadge";
import { getThreat } from "@/lib/threats";
import { addDueInfo } from "@/lib/stats";
import { RansomwareBadge } from "./RansomwareBadge";
import { ThreatFacts } from "./ThreatFacts";
import { ThreatReferences } from "./ThreatReferences";

type Props = {
  params: Promise<{ cveId: string }>;
};

export const ThreatDetail = async ({ params }: Props) => {
  const { cveId } = await params;
  await connection(); // the due badge uses today's date: compute it per request
  const threat = await getThreat(cveId);
  if (!threat) notFound();

  const [t] = addDueInfo([threat]);

  return (
    <div className="space-y-6">
      <Link
        href="/threats"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        All threats
      </Link>

      <PageHeader title={t.cveID} description={t.vulnerabilityName}>
        <div className="flex items-center gap-2">
          <DueBadge status={t.status} daysLeft={t.daysLeft} />
          <RansomwareBadge use={t.knownRansomwareCampaignUse} />
        </div>
      </PageHeader>

      <section className="grid gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">{t.shortDescription}</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Required action</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">{t.requiredAction}</CardContent>
          </Card>
          <ThreatReferences notes={t.notes} />
        </div>
        <ThreatFacts threat={t} />
      </section>
    </div>
  );
};