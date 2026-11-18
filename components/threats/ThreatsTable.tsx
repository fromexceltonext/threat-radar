import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DueBadge } from "@/components/dashboard/DueBadge";
import type { DueItem } from "@/lib/stats";
import { RansomwareBadge } from "./RansomwareBadge";

export const ThreatsTable = ({ items }: { items: DueItem[] }) => {
  if (items.length === 0) {
    return <p className="py-10 text-center text-muted-foreground">No threats match these filters.</p>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>CVE</TableHead>
          <TableHead>Vendor / Product</TableHead>
          <TableHead>Added</TableHead>
          <TableHead>Due</TableHead>
          <TableHead>Ransomware</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((t) => (
          <TableRow key={t.cveID}>
            <TableCell className="font-mono">
              <Link href={`/threats/${t.cveID}`} className="text-primary hover:underline">
                {t.cveID}
              </Link>
            </TableCell>
            <TableCell>
              {t.vendorProject}
              <span className="block text-muted-foreground">{t.product}</span>
            </TableCell>
            <TableCell className="tabular-nums text-muted-foreground">{t.dateAdded}</TableCell>
            <TableCell>
              <DueBadge status={t.status} daysLeft={t.daysLeft} />
            </TableCell>
            <TableCell>
              <RansomwareBadge use={t.knownRansomwareCampaignUse} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};