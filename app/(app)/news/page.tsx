import { PageHeader } from "@/components/layout/PageHeader";
import { NewsList } from "@/components/news/NewsList";
import { getNews } from "@/lib/news";

const NewsPage = async () => {

    const news = await getNews();

    return (
        <div>
            <PageHeader 
               title="News"
               description="Latest from CISA, The Hacker News, BleepingComputer and Krebs on Security"             
            />
            <NewsList items={news} />
        </div>
    );
};

export default NewsPage;