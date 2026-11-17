import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LucideIcon } from "lucide-react";
import { CountUp } from "./CountUp";


// One color per metric. Full class names so Tailwind can find them.
const COLORS = {
  blue: {
    border: "from-blue-500/60",
    glow: "bg-blue-500/20",
    iconBg: "bg-blue-500/15 text-blue-400",
    value: "text-foreground",
    shadow: "hover:shadow-[0_12px_40px_-12px_rgba(59,130,246,0.6)]",
  },
  green: {
    border: "from-green-500/60",
    glow: "bg-green-500/20",
    iconBg: "bg-green-500/15 text-green-400",
    value: "text-foreground",
    shadow: "hover:shadow-[0_12px_40px_-12px_rgba(34,197,94,0.6)]",
  },
  red: {
    border: "from-red-500/60",
    glow: "bg-red-500/20",
    iconBg: "bg-red-500/15 text-red-400",
    value: "text-red-300",
    shadow: "hover:shadow-[0_12px_40px_-12px_rgba(239,68,68,0.6)]",
  },
  pink: {
    border: "from-pink-500/60",
    glow: "bg-pink-500/20",
    iconBg: "bg-pink-500/15 text-pink-400",
    value: "text-pink-300",
    shadow: "hover:shadow-[0_12px_40px_-12px_rgba(236,72,153,0.6)]",
  },
} as const;

export type StatColor = keyof typeof COLORS;

type Props = {
    title: string;
    value: number;
    hint: string;
    color: StatColor;
    icon: LucideIcon;    
};

export const StatCard = ({ title, value, hint, icon: Icon, color }: Props) => {
   const c = COLORS[color]


    return (
      <div className={`rounded-xl bg-linear-to-br ${c.border} to-transparent p-px transition-all duration-200 hover:-translate-y-1 ${c.shadow}`}>
        <Card className="relative h-full overflow-hidden ring-0">
        <div className={`pointer-events-none absolute -top-12 -right-10 size-36 rounded-full blur-3xl ${c.glow}`} />
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardDescription>{title}</CardDescription>
            <span className={`grid size-9 place-items-center rounded-lg ${c.iconBg}`}>
              <Icon className="size-4" />
            </span>
          </div>
          <CardTitle className={`text-4xl font-bold tabular-nums ${c.value}`}>
            <CountUp value={value} />
          </CardTitle>
          <p className="text-sm text-muted-foreground">{hint}</p>
        </CardHeader>
      </Card>
      </div>
    );
};
