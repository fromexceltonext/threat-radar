import { History } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { DueItem } from "@/lib/stats";
import { DueBadge } from "./DueBadge";

export const RecentTable = ({ items }: { items: DueItem[] }) => {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History className="size-4 text-green-400" />
          Recently added
        </CardTitle>
        <CardDescription>Newest entries in the catalog</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>CVE</TableHead>
              <TableHead>Vendor / Product</TableHead>
              <TableHead>Due</TableHead>
              <TableHead>Ransomware</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((t) => (
              <TableRow key={t.cveID}>
                <TableCell className="font-mono">{t.cveID}</TableCell>
                <TableCell>
                  {t.vendorProject}
                  <span className="block text-muted-foreground">{t.product}</span>
                </TableCell>
                <TableCell>
                  <DueBadge status={t.status} daysLeft={t.daysLeft} />
                </TableCell>
                <TableCell>
                  {t.knownRansomwareCampaignUse === "Known" ? (
                    <Badge variant="outline" className="border-pink-500/30 bg-pink-500/15 text-pink-300">
                      Known
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-muted-foreground">
                      Unknown
                    </Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};