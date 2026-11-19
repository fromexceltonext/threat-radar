import { Bug } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { BarList } from "../charts/BarList";

type Props ={
    
    cwes: { name: string; value: number  }[];
    
};

export const TopCwesCard = ({ cwes }: Props) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Bug  className="size-4 text-amber-400" />
                    Top weaknesses
                </CardTitle>
                <CardDescription>Most common CWE across the catalog</CardDescription>
            </CardHeader>
            <CardContent>
                <BarList data={cwes}/>
            </CardContent>
        </Card>
    )
}