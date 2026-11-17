import { Lock } from "lucide-react";
import { DonutChart } from "@/components/charts/DonutChart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  split: { name: string; value: number }[];
  known: number;
  total: number;
};

export const RansomwareCard = ({ split, known, total }: Props) => {
  const percent = total > 0 ? Math.round((known / total) * 100) : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lock className="size-4 text-pink-400" />
          Ransomware use
        </CardTitle>
        <CardDescription>Known vs. Unknown campaign use</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center gap-10">
        <DonutChart
          data={split}
          category="name"
          value="value"
          colors={["pink", "gray"]}
          showLabel
          label={`${percent}%`}
        />
        <ul className="space-y-3 text-sm">
          <li className="flex items-center gap-2">
            <span className="inline-block size-2.5 shrink-0 rounded-sm bg-linear-to-br from-pink-400 to-purple-500" />
            Known · {known.toLocaleString("en-US")}
          </li>
          <li className="flex items-center gap-2">
            <span className="inline-block size-2.5 shrink-0 rounded-sm bg-gray-500" />
            Unknown · {(total - known).toLocaleString("en-US")}
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};