import { Badge } from "@/components/ui/badge";
import type { DueStatus } from "@/lib/stats";

type Props = {

    status: DueStatus;
    daysLeft: number;
};

export const DueBadge = ({ status, daysLeft }: Props) => {
    if (status === "overdue") {
        return <Badge variant="destructive">Overdue {-daysLeft}</Badge>;
    }

    if  (status === "today") {
        return <Badge className="bg-amber-500 text-black">Due Today</Badge>;
    }

    return <Badge variant="secondary">in {daysLeft} days</Badge>;
};

