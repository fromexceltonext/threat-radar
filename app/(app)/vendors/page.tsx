import { TableSkeleton } from "@/components/threats/TableSkeleton";
import { VendorsHeader } from "@/components/vendors/VendorsHeader";
import { VendorsResults } from "@/components/vendors/VendorsResults";
import { Suspense } from "react";

const VendorsPage = async ({ searchParams }: PageProps<"/vendors">) => {

    return (
        <div className="space-y-6">
           <VendorsHeader />
      {/* ?page= changes on every request, so the table streams in */}
      <Suspense fallback={<TableSkeleton />}>
        <VendorsResults searchParams={searchParams} />
      </Suspense>
        </div>
    )
}

export default VendorsPage