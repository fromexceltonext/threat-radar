import { DonutChart } from "@/components/charts/DonutChart" ;
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Lock } from "lucide-react"

type Props = {
    split: { name: string; value: number } [];
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
                <li>
                    <span className="size-2.5 rounded-sm bg-pink-500"/>
                    Known · {known.toLocaleString("en-US")}
                </li>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="size-2.5 rounded-sm bg-gray-500"/>
                    Unknown · {(total - known).toLocaleString("en-US")}
                  </li>
                </ul>
            </CardContent>
        </Card>
    );
};