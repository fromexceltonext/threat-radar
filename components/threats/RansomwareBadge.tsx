import {  Badge } from "@/components/ui/badge";

export const RansomwareBadge = ({ use }: { use: "Known" | "Unknown"}) => {

    if (use === "Known") {
        return (
            <Badge variant="outline" className="border-pink-500/30 bg-pink-500/15 text-pink-300">
                Known
            </Badge>
        );
    }
    return (
        <Badge variant="outline" className="text-muted-foreground">
            Unknown
        </Badge>
    )
}