import { DetailSkeleton } from "@/components/threats/DetailSkeleton"
import { ThreatDetail } from "@/components/threats/ThreatDetail"
import { Suspense } from "react"

const ThreatPage = ({ params }: PageProps<"/threats/[cveId]">) => {
return (
    <Suspense  fallback={<DetailSkeleton />}>
       <ThreatDetail params={params} />
    </Suspense>
);
};

export default ThreatPage