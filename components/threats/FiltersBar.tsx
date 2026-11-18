import Form from "next/form";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { ThreatFilters } from "@/lib/filters";

type Props = {
  filters: ThreatFilters;
  vendors: string[];
};

const FIELD =
  "h-9 rounded-md border border-input bg-background/40 px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring/50";

// A plain GET form: submitting it just changes the URL (/threats?q=...&vendor=...)
export const FiltersBar = ({ filters, vendors }: Props) => {
  return (
    <Form action="/threats" className="flex flex-wrap items-center gap-3">
      <input
        type="search"
        name="q"
        defaultValue={filters.q}
        placeholder="Search CVE, product, name…"
        className={`${FIELD} w-full sm:w-64`}
      />

      <select name="vendor" defaultValue={filters.vendor} className={`${FIELD} max-w-56`}>
        <option value="" className="bg-card">
          All vendors
        </option>
        {vendors.map((v) => (
          <option key={v} value={v} className="bg-card">
            {v}
          </option>
        ))}
      </select>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          name="ransomware"
          value="known"
          defaultChecked={filters.ransomware}
          className="accent-pink-500"
        />
        Ransomware
      </label>

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="due" value="soon" defaultChecked={filters.dueSoon} className="accent-amber-500" />
        Due in 14 days
      </label>

      <Button type="submit" size="lg">
        Apply
      </Button>
      <Link href="/threats" className="text-sm text-muted-foreground hover:text-foreground">
        Reset
      </Link>
    </Form>
  );
};