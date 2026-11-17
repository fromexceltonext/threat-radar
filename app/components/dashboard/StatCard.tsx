import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type Props = {
    title: string;
    value: number;
    hint: string;
    tone?: "default" | "danger";
};

export const StatCard = ({ title, value, hint, tone = "default" }: Props) => {

    return (
      <Card>
        <CardHeader>
            <CardDescription>{title}</CardDescription>
            <CardTitle className={`text-4xl tabular-nums ${tone === "danger" ? "text-red-500" : ""}`}>
                {value}
            </CardTitle>
            <p className="text-sm text-muted-foreground">{hint}</p>
        </CardHeader>    
      </Card>
    );
};
