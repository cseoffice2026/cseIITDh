import { useNews } from "../../hooks/useNews";
import { Link } from "react-router-dom";
import NewsCard from "./NewsCard";

const NewsLoading = () => (
  <div className="animate-pulse space-y-4">
    {["skeleton-1", "skeleton-2", "skeleton-3"].map((i) => (
      <div key={i} className="h-32 rounded-2xl bg-brand-50 p-4"></div>
    ))}
  </div>
);

// Returns true if the news item is marked as completed.
// Adjust these field names to match your data.
const isCompletedItem = (item) =>
  item?.completed === true ||
  item?.isCompleted === true ||
  String(item?.status ?? "").toLowerCase() === "completed";

export default function NewsSection() {
  const { data: news, isLoading: newsLoading, error: newsError } = useNews();

  // Show only news that is not completed and whose date has not passed.
  // News dated today stays visible until the day ends.
  const getActiveNews = () => {
    if (!news || news.length === 0) return [];

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    return news
      .filter((item) => {
        // Hide completed news
        if (isCompletedItem(item)) return false;

        // Hide news without a date
        if (!item?.date) return false;

        // Hide news whose date is over
        const itemDate = new Date(item.date);
        if (Number.isNaN(itemDate.getTime())) return false;
        return itemDate >= startOfToday;
      })
      // Soonest first
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      // Show only top 3
      .slice(0, 3);
  };

  const activeNews = getActiveNews();

  return (
    <section>
      {/* Heading + View All */}
      <div className="mb-5 flex items-center justify-between gap-3 border-b border-brand-100 pb-3">
        <h2 className="text-xl font-bold uppercase text-gray-900 sm:text-2s">
          Latest News and Announcements
        </h2>
        <Link
          to="/allnews"
          className="shrink-0 rounded-full bg-brand-600 px-4 py-1.5 text-xs font-semibold text-accent transition-colors duration-200 hover:bg-brand-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
        >
          View All →
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-5">
        {newsLoading ? (
          <NewsLoading />
        ) : newsError ? (
          <div className="rounded-2xl bg-red-50 p-4 text-red-500">
            <p>Error loading News and Announcements: {newsError?.message}</p>
            <p className="mt-2 text-sm">Please try refreshing the page.</p>
          </div>
        ) : activeNews.length > 0 ? (
          activeNews.map((item, index) => (
            <NewsCard
              key={`news-${item?.id ?? item?.link ?? `${item?.title ?? item?.Title ?? "entry"}-${index}`}`}
              item={item}
            />
          ))
        ) : (
          <div className="rounded-2xl bg-brand-50 py-8 text-center">
            <p className="mb-4 text-gray-600">
              No upcoming News and Announcements right now.
            </p>
            <Link
              to="/allnews"
              className="font-medium text-brand-600 hover:text-brand-700"
            >
              View past news and Announcements →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}