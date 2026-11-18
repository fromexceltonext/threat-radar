import { Card, CardContent } from "@/components/ui/card";
import { getThreats } from "@/lib/threats";
import { addDueInfo } from "@/lib/stats";
import { applyFilters, listVendors, parseFilters, threatsHref, PAGE_SIZE } from "@/lib/filters";
import { FiltersBar } from "./FiltersBar";
import { ThreatsTable } from "./ThreatsTable";
import { Pagination } from "./Pagination";
import { connection } from "next/server";


type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export const ThreatsResults = async ({ searchParams }: Props) => {
  const filters = parseFilters(await searchParams);
  await connection(); //"days left" depends on today's date: compute it per request, not at build time
  const threats = await getThreats();

  const matches = applyFilters(addDueInfo(threats), filters).sort((a, b) => b.dateAdded.localeCompare(a.dateAdded));
  const start = (filters.page - 1) * PAGE_SIZE;
  const pageItems = matches.slice(start, start + PAGE_SIZE);

  return (
    <div className="space-y-4">
      {/* key = current URL, so "Reset" also clears what was typed in the form */}
      <FiltersBar key={threatsHref(filters)} filters={filters} vendors={listVendors(threats)} />
      <Card>
        <CardContent>
          <ThreatsTable items={pageItems} />
        </CardContent>
      </Card>
      <Pagination filters={filters} total={matches.length} />
    </div>
  );
};