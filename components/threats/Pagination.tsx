import Link from "next/link";
import { PAGE_SIZE, threatsHref, type ThreatFilters } from "@/lib/filters";

type Props = {
  filters: ThreatFilters;
  total: number;
};

const LINK = "rounded-md border border-border px-3 py-1.5 text-sm hover:bg-muted";

export const Pagination = ({ filters, total }: Props) => {
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const page = Math.min(filters.page, pages);

  return (
    <div className="flex items-center justify-between gap-3 text-sm text-muted-foreground">
      <span>
        {total.toLocaleString("en-US")} results · page {page} of {pages}
      </span>
      <div className="flex gap-2">
        {page > 1 && (
          <Link href={threatsHref(filters, { page: page - 1 })} className={LINK}>
            ← Previous
          </Link>
        )}
        {page < pages && (
          <Link href={threatsHref(filters, { page: page + 1 })} className={LINK}>
            Next →
          </Link>
        )}
      </div>
    </div>
  );
};