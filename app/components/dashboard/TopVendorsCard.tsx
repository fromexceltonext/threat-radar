import { BarList } from "@/components/charts/BarList";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";


type Props ={

    vendors: { name: string; value: number } [];
};

export const TopVendorsCard = ({ vendors }: Props) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Top Vendors</CardTitle>
                <CardDescription>Entries per Vendor</CardDescription>
            </CardHeader>
            <CardContent>
                <BarList data={vendors} />
            </CardContent>
        </Card>
    );
};