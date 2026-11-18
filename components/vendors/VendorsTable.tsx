import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { VendorStats } from "@/lib/vendors";

type Props = {
  vendors: VendorStats[];
  startRank: number; // rank of the first row on this page (0 on page 1, 25 on page 2…)
  max: number; // biggest total in the whole ranking, so bars compare across pages
};

export const VendorsTable = ({ vendors, startRank, max }: Props) => {
  return (
    <Card>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">#</TableHead>
              <TableHead>Vendor</TableHead>
              <TableHead className="w-1/3">Entries</TableHead>
              <TableHead>Ransomware</TableHead>
              <TableHead>Products</TableHead>
              <TableHead>Last added</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vendors.map((v, i) => (
              <TableRow key={v.name}>
                <TableCell className="text-muted-foreground tabular-nums">{startRank + i + 1}</TableCell>
                <TableCell>
                  <Link href={`/threats?vendor=${encodeURIComponent(v.name)}`} className="text-primary hover:underline">
                    {v.name}
                  </Link>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-2 flex-1 rounded-full bg-muted">
                      <div
                        className="h-2 rounded-full bg-linear-to-r from-blue-500 to-violet-500"
                        style={{ width: `${(v.total / max) * 100}%` }}
                      />
                    </div>
                    <span className="w-10 text-right tabular-nums">{v.total}</span>
                  </div>
                </TableCell>
                <TableCell className={`tabular-nums ${v.ransomware > 0 ? "text-pink-300" : "text-muted-foreground"}`}>
                  {v.ransomware}
                </TableCell>
                <TableCell className="tabular-nums text-muted-foreground">{v.products}</TableCell>
                <TableCell className="tabular-nums text-muted-foreground">{v.lastAdded}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};