import { useNews } from "../../hooks/useNews";
import { Link } from "react-router-dom";
import NewsCard from "./NewsCard";

const NewsLoading = () => (
  <div className="animate-pulse space-y-4">
    {["skeleton-1", "skeleton-2", "skeleton-3"].map((i) => (
      <div key={i} className="bg-gray-200 rounded-lg p-4 h-32"></div>
    ))}
  </div>
);

export default function NewsSection() {
  const { data: news, isLoading: newsLoading, error: newsError } = useNews();

  // Archive news older than 1 month (or without a date) out of the home page,
  // same recency window used for Talks and Events.
  const getRecentNews = () => {
    if (!news || news.length === 0) return [];

    const oneMonthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    return news
      .filter((item) => item.date && item.date >= oneMonthAgo)
      .slice(0, 3); // Show only top 3 recent items
  };

  const recentNews = getRecentNews();

  return (
    <section className="space-y-5">
      <div className="flex items-end justify-between gap-4">
        <div>        
          <h2 className="text-2xl font-bold text-gray-800">Latest News</h2>
         
        </div>
        <Link
          to="/allnews"
          className="shrink-0 text-sm font-semibold text-brand-600 hover:text-brand-700"
        >
          View All →
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {newsLoading ? (
          <NewsLoading />
        ) : newsError ? (
          <div className="rounded-lg bg-red-50 p-4 text-red-500">
            <p>Error loading News and Announcements: {newsError?.message}</p>
            <p className="text-sm mt-2">Please try refreshing the page.</p>
          </div>
        ) : recentNews.length > 0 ? (
          recentNews.map((item, index) => (
            <NewsCard
              key={`news-${item?.id ?? item?.link ?? `${item?.title ?? item?.Title ?? "entry"}-${index}`}`}
              item={item}
            />
          ))
        ) : (
          <div className="rounded-lg bg-gray-50 py-8 text-center">
            <p className="mb-4 text-gray-600">
              No recent News and Announcements in the past month.
            </p>
            <Link
              to="/allnews"
              className="font-medium text-brand-600 hover:text-brand-700"
            >
              View past news and Announcements, more →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
