import { cacheLife } from "next/cache";
import { getThreats, Threat } from "./threats";


export type DueStatus = "overdue" | "today" | "soon" | "later";

const DAY_MS = 24 * 60 * 60 * 1000;

// Local date as YYYY-MM-DD (same format as the KEV feed)
const todayISO = (): string => {
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

export const getDashboard = async () => {
  "use cache";
  cacheLife("hours");

  const threats = await getThreats();
  const today = todayISO();

  const withDue: DueItem[] = threats.map((t) => {
    const daysLeft = daysBetween(today, t.dueDate);
    return { ...t, daysLeft, status: dueStatus(daysLeft) };
  });

  const addedThisWeek = threats.filter((t) => daysBetween(today, t.dateAdded) >= -7).length;
  const pastDue = withDue.filter((t) => t.status === "overdue").length;
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

  // Overdue first, then the closest due dates (next 14 days)
  const dueSoon = withDue
    .filter((t) => t.status !== "later")
    .sort((a, b) => a.daysLeft - b.daysLeft)
    .slice(0, 6);

  const recent = [...withDue].sort((a, b) => b.dateAdded.localeCompare(a.dateAdded)).slice(0, 5);

  return {
    total: threats.length,
    addedThisWeek,
    pastDue,
    ransomware,
    topVendors,
    ransomwareSplit,
    dueSoon,
    recent,
  };
};