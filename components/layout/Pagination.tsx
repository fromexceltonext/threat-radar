import Link from "next/link";

type Props = {
  page: number;
  total: number;
  pageSize: number;
  hrefFor: (page: number) => string; // each table decides how its URLs look
};

const LINK = "rounded-md border border-border px-3 py-1.5 text-sm hover:bg-muted";

export const Pagination = ({ page, total, pageSize, hrefFor }: Props) => {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const current = Math.min(page, pages);

  return (
    <div className="flex items-center justify-between gap-3 text-sm text-muted-foreground">
      <span>
        {total.toLocaleString("en-US")} results · page {current} of {pages}
      </span>
      <div className="flex gap-2">
        {current > 1 && (
          <Link href={hrefFor(current - 1)} className={LINK}>
            ← Previous
          </Link>
        )}
        {current < pages && (
          <Link href={hrefFor(current + 1)} className={LINK}>
            Next →
          </Link>
        )}
      </div>
    </div>
  );
};