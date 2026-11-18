import { PageHeader } from "@/components/layout/PageHeader";
import { getVendorStats } from "@/lib/vendors";

// Cached data only (no URL, no date), so Next can prerender this part
export const VendorsHeader = async () => {
  const vendors = await getVendorStats();
  return <PageHeader title="Vendors" description={`${vendors.length} vendors in the catalog, ranked by entries`} />;
};