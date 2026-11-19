import { cacheLife } from "next/cache";
import { getThreats, type Threat } from "./threats";
import { cweLabel } from "./cwe";

export type DueStatus = "overdue" | "today" | "soon" | "later";

const DAY_MS = 24 * 60 * 60 * 1000;

// Local date as YYYY-MM-DD (same format as the KEV feed)
export const todayISO = (): string => {
  const d = new Date();
  const pad = (v: number) => String(v).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

// Whole days from `today` to `date` (negative = in the past)
export const daysBetween = (today: string, date: string): number =>
  Math.round((Date.parse(date) - Date.parse(today)) / DAY_MS);

const dueStatus = (days: number): DueStatus => {
  if (days < 0) return "overdue";
  if (days === 0) return "today";
  if (days <= 14) return "soon";
  return "later";
};

export type DueItem = Threat & { daysLeft: number; status: DueStatus };

// Adds days left + status to every threat (used by the dashboard and the threats list)
export const addDueInfo = (threats: Threat[], today = todayISO()): DueItem[] =>
  threats.map((t) => {
    const daysLeft = daysBetween(today, t.dueDate);
    return { ...t, daysLeft, status: dueStatus(daysLeft) };
  });

// The last `count` months as "YYYY-MM", oldest first
const lastMonths = (today: string, count: number): string[] => {
  const [year, month] = today.split("-").map(Number);
  return Array.from({ length: count }, (_, i) =>
    new Date(Date.UTC(year, month - 1 - (count - 1 - i), 1)).toISOString().slice(0, 7),
  );
};

const monthLabel = (key: string): string =>
  new Date(`${key}-01T00:00:00Z`).toLocaleDateString("en-US", { month: "short", timeZone: "UTC" });

export type MonthPoint = { month: string; label: string; value: number };

export const getDashboard = async () => {
  "use cache";
  cacheLife("hours");

  const threats = await getThreats();
  const today = todayISO();
  const withDue = addDueInfo(threats, today);

  const addedThisWeek = threats.filter((t) => daysBetween(today, t.dateAdded) >= -7).length;
  // Deadline passed in the last 30 days (most KEV entries are years past due)
  const pastDue = withDue.filter((t) => t.daysLeft < 0 && t.daysLeft >= -30).length;
  const ransomware = threats.filter((t) => t.knownRansomwareCampaignUse === "Known").length;

  // Vendors ranked by number of entries
  const counts = new Map<string, number>();
  for (const t of threats) counts.set(t.vendorProject, (counts.get(t.vendorProject) ?? 0) + 1);
  const topVendors = [...counts.entries()]
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  const ransomwareSplit = [
    { name: "Known", value: ransomware },
    { name: "Unknown", value: threats.length - ransomware },
  ];

  // Next 14 days first (closest on top), then the last 14 days overdue (most recent on top)
  const upcoming = withDue.filter((t) => t.daysLeft >= 0 && t.daysLeft <= 14).sort((a, b) => a.daysLeft - b.daysLeft);
  const recentlyOverdue = withDue
    .filter((t) => t.daysLeft < 0 && t.daysLeft >= -14)
    .sort((a, b) => b.daysLeft - a.daysLeft);
  const dueSoon = [...upcoming, ...recentlyOverdue].slice(0, 6);

  const recent = [...withDue].sort((a, b) => b.dateAdded.localeCompare(a.dateAdded)).slice(0, 5);

  // NEW: entries added per month, last 12 months
  const months = lastMonths(today, 12);
  const perMonth = new Map(months.map((m) => [m, 0]));
  for (const t of threats) {
    const key = t.dateAdded.slice(0, 7);
    if (perMonth.has(key)) perMonth.set(key, (perMonth.get(key) ?? 0) + 1);
  }
  const addedByMonth: MonthPoint[] = months.map((m) => ({
    month: m,
    label: monthLabel(m),
    value: perMonth.get(m) ?? 0,
  }));

  // NEW: most common weaknesses (CWE ids only, skips NVD-CWE-noinfo / NVD-CWE-Other)
  const cweCounts = new Map<string, number>();
  for (const t of threats) {
    for (const cwe of t.cwes ?? []) {
      if (cwe.startsWith("CWE-")) cweCounts.set(cwe, (cweCounts.get(cwe) ?? 0) + 1);
    }
  }
  const topCwes = [...cweCounts.entries()]
    .map(([id, value]) => ({ name: cweLabel(id), value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 6);

  return {
    total: threats.length,
    addedThisWeek,
    pastDue,
    ransomware,
    topVendors,
    ransomwareSplit,
    dueSoon,
    recent,
    addedByMonth,
    topCwes,
  };
};