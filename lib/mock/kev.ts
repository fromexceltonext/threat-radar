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

// Returns a YYYY-MM-DD string n days from today (negative = past), in local time.
export const daysFromToday = (n: number): string => {
  const d = new Date();
  d.setDate(d.getDate() + n);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

const REQUIRED_ACTION =
  "FICTIONAL MOCK DATA. Apply mitigations in accordance with vendor instructions or discontinue use of the product if mitigations are unavailable.";

export const mockKevEntries: KevEntry[] = [
  {
    cveID: "CVE-0000-0001",
    vendorProject: "Acme Corp",
    product: "Acme Gateway",
    vulnerabilityName: "Acme Gateway Improper Input Validation Vulnerability",
    dateAdded: daysFromToday(-26),
    shortDescription:
      "Acme Corp Acme Gateway contains an improper input validation vulnerability that allows a remote attacker to execute arbitrary commands.",
    requiredAction: REQUIRED_ACTION,
    dueDate: daysFromToday(-12),
    knownRansomwareCampaignUse: "Known",
    forensicTriage: "Yes",
    notes: "https://example.com/advisories/acme-0001 ; https://example.com/nvd/CVE-0000-0001",
    cwes: ["CWE-20"],
  },
  {
    // forensicTriage intentionally omitted (older entry)
    cveID: "CVE-0000-0002",
    vendorProject: "Globex Industries",
    product: "Globex Portal",
    vulnerabilityName: "Globex Portal SQL Injection Vulnerability",
    dateAdded: daysFromToday(-18),
    shortDescription:
      "Globex Industries Globex Portal contains a SQL injection vulnerability that allows an unauthenticated attacker to read or modify database contents.",
    requiredAction: REQUIRED_ACTION,
    dueDate: daysFromToday(-5),
    knownRansomwareCampaignUse: "Unknown",
    notes: "https://example.com/advisories/globex-0002 ; https://example.com/nvd/CVE-0000-0002",
    cwes: ["CWE-89"],
  },
  {
    cveID: "CVE-0000-0003",
    vendorProject: "Initech Ltd",
    product: "Initech FileShare",
    vulnerabilityName: "Initech FileShare Path Traversal Vulnerability",
    dateAdded: daysFromToday(-10),
    shortDescription:
      "Initech Ltd Initech FileShare contains a path traversal vulnerability that allows an attacker to access files outside the intended directory.",
    requiredAction: REQUIRED_ACTION,
    dueDate: daysFromToday(-1),
    knownRansomwareCampaignUse: "Known",
    forensicTriage: "Yes",
    notes: "https://example.com/advisories/initech-0003 ; https://example.com/nvd/CVE-0000-0003",
    cwes: ["CWE-22"],
  },
  {
    cveID: "CVE-0000-0004",
    vendorProject: "Umbrella Systems",
    product: "Umbrella Auth",
    vulnerabilityName: "Umbrella Auth Authentication Bypass Vulnerability",
    dateAdded: daysFromToday(-3),
    shortDescription:
      "Umbrella Systems Umbrella Auth contains an authentication bypass vulnerability that allows an attacker to gain administrative access.",
    requiredAction: REQUIRED_ACTION,
    dueDate: daysFromToday(1),
    knownRansomwareCampaignUse: "Unknown",
    forensicTriage: "Yes",
    notes: "https://example.com/advisories/umbrella-0004 ; https://example.com/nvd/CVE-0000-0004",
    cwes: ["CWE-287", "CWE-306"],
  },
  {
    cveID: "CVE-0000-0005",
    vendorProject: "Wayne Widgets",
    product: "Widget Manager",
    vulnerabilityName: "Widget Manager Deserialization of Untrusted Data Vulnerability",
    dateAdded: daysFromToday(-2),
    shortDescription:
      "Wayne Widgets Widget Manager contains a deserialization of untrusted data vulnerability that allows remote code execution.",
    requiredAction: REQUIRED_ACTION,
    dueDate: daysFromToday(5),
    knownRansomwareCampaignUse: "Known",
    forensicTriage: "Yes",
    notes: "https://example.com/advisories/wayne-0005 ; https://example.com/nvd/CVE-0000-0005",
    cwes: ["CWE-502"],
  },
  {
    // forensicTriage intentionally omitted (older entry)
    cveID: "CVE-0000-0006",
    vendorProject: "Stark Examples Inc",
    product: "Example Hypervisor",
    vulnerabilityName: "Example Hypervisor Use-After-Free Vulnerability",
    dateAdded: daysFromToday(-1),
    shortDescription:
      "Stark Examples Inc Example Hypervisor contains a use-after-free vulnerability that allows a local attacker to escalate privileges.",
    requiredAction: REQUIRED_ACTION,
    dueDate: daysFromToday(16),
    knownRansomwareCampaignUse: "Unknown",
    notes: "https://example.com/advisories/stark-0006 ; https://example.com/nvd/CVE-0000-0006",
    cwes: ["CWE-416"],
  },
  {
    cveID: "CVE-0000-0007",
    vendorProject: "Hooli Test Labs",
    product: "Hooli Mail Server",
    vulnerabilityName: "Hooli Mail Server Command Injection Vulnerability",
    dateAdded: daysFromToday(0),
    shortDescription:
      "Hooli Test Labs Hooli Mail Server contains a command injection vulnerability that allows an authenticated user to run commands with elevated privileges.",
    requiredAction: REQUIRED_ACTION,
    dueDate: daysFromToday(30),
    knownRansomwareCampaignUse: "Known",
    forensicTriage: "Yes",
    notes: "https://example.com/advisories/hooli-0007 ; https://example.com/nvd/CVE-0000-0007",
    cwes: ["CWE-77", "CWE-78"],
  },
  {
    cveID: "CVE-0000-0008",
    vendorProject: "Pied Piper Mockups",
    product: "Piper Sync",
    vulnerabilityName: "Piper Sync Missing Authorization Vulnerability",
    dateAdded: daysFromToday(0),
    shortDescription:
      "Pied Piper Mockups Piper Sync contains a missing authorization vulnerability that allows an attacker to access sensitive API endpoints.",
    requiredAction: REQUIRED_ACTION,
    dueDate: daysFromToday(51),
    knownRansomwareCampaignUse: "Unknown",
    forensicTriage: "No",
    notes: "https://example.com/advisories/piper-0008 ; https://example.com/nvd/CVE-0000-0008",
    cwes: ["CWE-862"],
  },
];

// Arrow-function helpers for the dashboard
export const getMockKevEntries = (): KevEntry[] => [...mockKevEntries];

// Compares YYYY-MM-DD strings, so an entry due today is not yet overdue.
export const isOverdue = (entry: KevEntry, today: string = daysFromToday(0)): boolean =>
  entry.dueDate < today;

export const getRansomwareEntries = (): KevEntry[] =>
  mockKevEntries.filter((e) => e.knownRansomwareCampaignUse === "Known");