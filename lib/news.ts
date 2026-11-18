import { cacheLife } from "next/cache";
import { fetchNews, type NewsItem } from "@/lib/sources/news";

export type { NewsItem };

export const getNews = async (limit = 40): Promise<NewsItem[]> => {

    "use cache";
    cacheLife("hours");
    const news = await fetchNews();
    return news.slice(0, limit);
};