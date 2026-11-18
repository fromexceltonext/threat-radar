import type { Threat } from "./threats"
import type { DueItem } from "./stats"

export const PAGE_SIZE = 25

export type ThreatFilters = {
q: string;
vendor: string;
ransomware: boolean;
dueSoon: boolean;
page: number;
};

type SearchParams = Record<string, string | string[] | undefined>;

// ?vendor=a&vendor=b arrives as an array: we keep the first value
const first = (value: string | string[] | undefined): string => (Array.isArray(value) ? value[0] : value)?.trim() ?? "";

// URL → filters. Anything unexpected falls back to "no filter".
export const parseFilters = (sp: SearchParams): ThreatFilters => {
  const page = Number.parseInt(first(sp.page), 10);
  return {
    q: first(sp.q),
    vendor: first(sp.vendor),
    ransomware: first(sp.ransomware) === "known",
    dueSoon: first(sp.due) === "soon",
    page: Number.isFinite(page) && page > 0 ? page : 1,
  };
};

export const applyFilters = (items: DueItem[], f: ThreatFilters): DueItem[] => {
  const q = f.q.toLowerCase();
  return items.filter((t) => {
    if (f.vendor && t.vendorProject !== f.vendor) return false;
    if (f.ransomware && t.knownRansomwareCampaignUse !== "Known") return false;
    if (f.dueSoon && (t.daysLeft < 0 || t.daysLeft > 14)) return false;
    if (q) {
      const text = `${t.cveID} ${t.vendorProject} ${t.product} ${t.vulnerabilityName}`.toLowerCase();
      if (!text.includes(q)) return false;
    }
    return true;
  });
};

// Filters → URL. Keeps the current filters and changes only what we pass.
export const threatsHref = (f: ThreatFilters, changes: Partial<ThreatFilters> = {}): string => {
  const next = { ...f, ...changes };
  const params = new URLSearchParams();
  if (next.q) params.set("q", next.q);
  if (next.vendor) params.set("vendor", next.vendor);
  if (next.ransomware) params.set("ransomware", "known");
  if (next.dueSoon) params.set("due", "soon");
  if (next.page > 1) params.set("page", String(next.page));
  const query = params.toString();
  return query ? `/threats?${query}` : "/threats";
};

// Unique vendor names, A → Z (for the vendor dropdown)
export const listVendors = (threats: Threat[]): string[] =>
  [...new Set(threats.map((t) => t.vendorProject))].sort((a, b) => a.localeCompare(b));