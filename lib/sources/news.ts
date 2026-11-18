import Parser from "rss-parser";

export type NewsItem = {
  id: string;
  title: string;
  link: string;
  source: string;
  publishedAt: string; // ISO date
  summary: string;
};

// Public RSS feeds. We show headline + short summary and link to the original article.
const FEEDS = [
  { source: "CISA", url: "https://www.cisa.gov/cybersecurity-advisories/all.xml" },
  { source: "The Hacker News", url: "https://feeds.feedburner.com/TheHackersNews" },
  { source: "BleepingComputer", url: "https://www.bleepingcomputer.com/feed/" },
  { source: "Krebs on Security", url: "https://krebsonsecurity.com/feed/" },
] as const;

const parser = new Parser();

const fetchFeed = async (source: string, url: string): Promise<NewsItem[]> => {
  const res = await fetch(url, { headers: { "User-Agent": "ThreatRadar/1.0" } });
  if (!res.ok) {
    throw new Error(`${source} feed failed: ${res.status}`);
  }
  const feed = await parser.parseString(await res.text());

  return feed.items.map((item) => ({
    id: item.guid ?? item.link ?? item.title ?? "",
    title: item.title?.trim() ?? "Untitled",
    link: item.link ?? "",
    source,
    publishedAt: item.isoDate ?? "",
    summary: (item.contentSnippet ?? "").slice(0, 220),
  }));
};

export const fetchNews = async (): Promise<NewsItem[]> => {
  // allSettled: if one feed is down, the others still show up
  const results = await Promise.allSettled(FEEDS.map((f) => fetchFeed(f.source, f.url)));

  return results
    .flatMap((r) => (r.status === "fulfilled" ? r.value : []))
    .filter((item) => item.link.startsWith("https://")) // never render javascript: or http: links
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
};