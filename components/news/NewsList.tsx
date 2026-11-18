import { NewsCard } from "./NewsCard";
import type { NewsItem } from "@/lib/news";

export const NewsList = ({ items }: { items: NewsItem[] }) => {

if (items.length === 0) {
    return (
        <p className="py-10 text-center text-muted-foreground">No news right now. Feeds may be down — try again later.</p>
    );
};

return (
    <section className="grid gap-4 md:grid-cols-2">
        {items.map((item) => (
            <NewsCard key={`${item.source}-${item.id}`} item={item} />
        ))}
    </section>
);
};