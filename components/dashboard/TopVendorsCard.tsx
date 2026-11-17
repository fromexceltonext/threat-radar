import { BarList } from "@/components/charts/BarList";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Building2 } from "lucide-react";


type Props ={

    vendors: { name: string; value: number } [];
};

export const TopVendorsCard = ({ vendors }: Props) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                <Building2 className="size-4 text-blue-400"/>
                Top Vendors
                </CardTitle>
                <CardDescription>Entries per Vendor</CardDescription>
            </CardHeader>
            <CardContent>
                <BarList data={vendors} />
            </CardContent>
        </Card>
    );
};