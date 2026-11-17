export interface KevEntry {
  cveID: string;
  vendorProject: string;
  product: string;
  vulnerabilityName: string;
  dateAdded: string;
  shortDescription: string;
  requiredAction: string;
  dueDate: string;
  knownRansomwareCampaignUse: "Known" | "Unknown";
  forensicTriage?: "Yes" | "No"; // newer field, absent on older entries
  notes: string;
  cwes: string[];
}

const KEV_URL = "https://www.cisa.gov/sites/default/files/feeds/known_exploited_vulnerabilities.json";

type KevFeed = {
    catalogVersion: string;
    dateReleased: string;
    count: number;
    vulnerabilities: KevEntry[];
    };

    export const fetchKev = async (): Promise<KevEntry[]> => { 
        const res = await fetch(KEV_URL);
        if (!res.ok) {
            throw new Error(`CISA KEV feed failed: ${res.status}`);
        }    
        const feed: KevFeed = await res.json();
        return feed.vulnerabilities;
    }