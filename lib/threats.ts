import { cacheLife } from "next/cache";
import { fetchKev, type KevEntry } from "@/lib/sources/kev";


// The one seam: every page asks this file for threats.
// Today it returns mock data; later it will read the live CISA KEV feed.
export type Threat = KevEntry;

export const getThreats = async (): Promise<Threat[]> => {
 "use cache";
  cacheLife("hours");
  return fetchKev();
};

// One threat by its CVE id (undefined if it is not in the catalog)

export const getThreat = async ( cveId: string): Promise<Threat | undefined> => {
  const threats = await getThreats();
  return threats.find((t)  => t.cveID === cveId.toUpperCase())


}
