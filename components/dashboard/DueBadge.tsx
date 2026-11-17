import { Badge } from "@/components/ui/badge";
import type { DueStatus } from "@/lib/stats";


const STYLES = {
  red: "border-red-500/30 bg-red-500/15 text-red-300",
  amber: "border-amber-500/30 bg-amber-500/15 text-amber-300",
  blue: "border-blue-500/30 bg-blue-500/15 text-blue-300",
} as const;

type Props = {
    status: DueStatus;
    daysLeft: number;
};

export const DueBadge = ({ status, daysLeft }: Props) => {
    if (status === "overdue") {
        return <Badge variant="outline" className={STYLES.red}>Overdue {-daysLeft}</Badge>;
    }

    if  (status === "today") {
        return <Badge variant="outline" className={STYLES.amber}>Due Today</Badge>;
    }

    const label = `in ${daysLeft} day${daysLeft === 1 ? "" : "s"}`;
    // 3 days or less: urgen (amber); further out: blue

    return (
       <Badge variant="outline" className={daysLeft <= 3 ? STYLES.amber : STYLES.blue}>
          {label}
       </Badge>
    )
};

