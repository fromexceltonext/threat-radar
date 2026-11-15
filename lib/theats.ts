import { cacheLife } from "next/cache";
import { mockKevEntries, type KevEntry } from "@/lib/mock/kev";

// The one seam: every page asks this file for threats.
// Today it returns mock data; later it will read the live CISA KEV feed.
export type Threat = KevEntry;

export const getThreats = async (): Promise<Threat[]> => {
 "use cache";
  cacheLife("hours");
  return mockKevEntries;
};
