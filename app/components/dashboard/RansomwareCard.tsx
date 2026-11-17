import { DonutChart } from "@/components/charts/DonutChart" ;
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

type Props = {
    split: { name: string; value: number } [];
    known: number;
    total: number;
};

export const RansomwareCard = ({ split, known, total }: Props) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Ransomware Distribution</CardTitle>
                <CardDescription>Known vs. Unknown campaign use</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
                <DonutChart
                    data={split}
                    category="name"
                    value="value"
                    colors={["blue", "gray"]}
                    showLabel
                    label={`${known} / ${total}`}
                />
            </CardContent>
        </Card>
    );
};