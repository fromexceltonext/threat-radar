import { Placeholder } from "./components/dashboard/Placeholder";
import { StatsGrid } from "./components/dashboard/StatsGrid";
import { getDashboard } from "@/lib/stats";
import { TopVendorsCard } from "./components/dashboard/TopVendorsCard";
import { RansomwareCard } from "./components/dashboard/RansomwareCard";
import { DueSoonList } from "@/components/dashboard/DueSoonList";
import { RecentTable } from "@/components/dashboard/RecentTable";



const Home = async() => {
  const d = await getDashboard();
  return (
   <main className="mx-auto w-full max-w-6xl space-y-6 p-6 md:p-10">
    <header>
      <h1 className="text-3xl font-bold tracking-tight">Threat Radar</h1>
        <p className="text-gray-500">Known exploited vulnerabilities at a glance</p>
    </header>

    <StatsGrid total={d.total} addedThisWeek={d.addedThisWeek} pastDue={d.pastDue} ransomware={d.ransomware} />

    <section className="grid gap-4 lg:grid-cols-2">
      <TopVendorsCard vendors={d.topVendors} />
      <RansomwareCard split={d.ransomwareSplit} known={d.ransomware} total={d.total} />
    </section>

    <section className="grid gap-4 lg:grid-cols-2">
      <DueSoonList items={d.dueSoon} />
      <RecentTable items={d.recent} />
    </section>
   </main>
  ) 
};

export default Home;