import { PageHeader } from "@/components/layout/PageHeader"
import { TableSkeleton } from "@/components/threats/TableSkeleton"
import { ThreatsResults } from "@/components/threats/ThreatsResults"
import { Suspense } from "react"

const ThreatsPage = ({  searchParams }: PageProps<"/threats">) => {

    return (
        <div className="space-y-6">
            <PageHeader 
               title="Threats"
               description="Every entry in the CSA KEV catalog" 
            />
         { /* searchParams change on every request, so this part streams in */ }   
        
          <Suspense fallback={<TableSkeleton />}   >
            <ThreatsResults searchParams={searchParams}/>
          </Suspense>        
          
        </div>
    )
}

export default ThreatsPage;