import { StatsGrid } from "../../components/dashboard/StatsGrid";
import { getDashboard } from "@/lib/stats";
import { TopVendorsCard } from "../../components/dashboard/TopVendorsCard";
import { RansomwareCard } from "../../components/dashboard/RansomwareCard";
import { DueSoonList } from "@/components/dashboard/DueSoonList";
import { RecentTable } from "@/components/dashboard/RecentTable";
import { PageHeader } from "@/components/layout/PageHeader";



const Home = async() => {
  const d = await getDashboard();
  return (
   <div className="space-y-6">
      <PageHeader 
       title="Overview" 
       description="Known Exploited Vulnerabilities at a glance" 
      />

      <StatsGrid 
        total={d.total}
        addedThisWeek={d.addedThisWeek}
        pastDue={d.pastDue}
        ransomware={d.ransomware}
      />

      <section className="grid gap-4 lg:grid-cols-2">
        <TopVendorsCard 
          vendors={d.topVendors}
        />
        <RansomwareCard 
          split={d.ransomwareSplit}
          known={d.ransomware}
          total={d.total}
        />
      </section>

      <section className="grid gap-4 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <DueSoonList 
            items={d.dueSoon}
          />
        </div>
        <div className="lg:col-span-3">
          <RecentTable 
           items={d.recent}
          />
        </div>
      </section>

   </div>
  ) 
};

export default Home;