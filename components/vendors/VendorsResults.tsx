import { Pagination } from "@/components/layout/Pagination";
import { getVendorStats, VENDORS_PAGE_SIZE } from "@/lib/vendors";
import { parsePage } from "@/lib/paging";
import { VendorsTable } from "./VendorsTable";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export const VendorsResults = async ({ searchParams }: Props) => {
  const page = parsePage((await searchParams).page);
  const vendors = await getVendorStats();

  const start = (page - 1) * VENDORS_PAGE_SIZE;
  const pageItems = vendors.slice(start, start + VENDORS_PAGE_SIZE);

  return (
    <div className="space-y-4">
      <VendorsTable vendors={pageItems} startRank={start} max={vendors[0]?.total ?? 1} />
      <Pagination
        page={page}
        total={vendors.length}
        pageSize={VENDORS_PAGE_SIZE}
        hrefFor={(p) => (p > 1 ? `/vendors?page=${p}` : "/vendors")}
      />
    </div>
  );
};