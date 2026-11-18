import { cacheLife } from "next/cache";
import { getThreats } from "./threats";

export const VENDORS_PAGE_SIZE = 25;

export type VendorStats = {
  name: string;
  total: number;
  ransomware: number;
  products: number;
  lastAdded: string;
};

export const getVendorStats = async (): Promise<VendorStats[]> => {
  "use cache";
  cacheLife("hours");

  const threats = await getThreats();
  const byVendor = new Map<string, { total: number; ransomware: number; products: Set<string>; lastAdded: string }>();

  for (const t of threats) {
    const v = byVendor.get(t.vendorProject) ?? { total: 0, ransomware: 0, products: new Set<string>(), lastAdded: "" };
    v.total += 1;
    if (t.knownRansomwareCampaignUse === "Known") v.ransomware += 1;
    v.products.add(t.product);
    if (t.dateAdded > v.lastAdded) v.lastAdded = t.dateAdded; // YYYY-MM-DD sorts as text
    byVendor.set(t.vendorProject, v);
  }

  return [...byVendor.entries()]
    .map(([name, v]) => ({
      name,
      total: v.total,
      ransomware: v.ransomware,
      products: v.products.size,
      lastAdded: v.lastAdded,
    }))
    .sort((a, b) => b.total - a.total || a.name.localeCompare(b.name));
};