import { StatCard } from "./StatCard";

type Props = {
    total: number;
    addedThisWeek: number;
    pastDue: number;
    ransomware: number;
};

export const StatsGrid = ({  total, addedThisWeek, pastDue, ransomware }: Props) => {
  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="In Catalog" value={total} hint="Known exploited vulnerabilities" />
        <StatCard title="Added this Week" value={addedThisWeek} hint="Last 7 days"/>
        <StatCard title="Past Due" value={pastDue} hint="Deadline passed - last 30 days" tone="danger" />
        <StatCard title="Ransomware" value={ransomware} hint="Known campaign use" tone="danger" />
    </section>
  );
};