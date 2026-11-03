import { useNews } from "../../hooks/useNews";
import { Link } from "react-router-dom"; // ← make sure this is imported

const NewsCard = ({ title, dateDisplay, description, link }) => (
  <button
    type="button"
    onClick={() => {
      if (link) window.open(link, "_blank");
    }}
    className="cursor-pointer bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow duration-300 flex flex-col h-full text-left"
  >
    <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
    {dateDisplay && (
      <p className="text-sm text-indigo-600 font-medium mt-1">{dateDisplay}</p>
    )}
    <p className="text-gray-600 text-sm mt-2 flex-grow">{description}</p>
  </button>
);

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
  const hasRecentNews = recentNews.length > 0;

  return (
    <div>
      {/* Header with button */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">News and Announcements</h2>
        <Link
          to="/allnews"
          className="text-sm bg-indigo-600 text-white px-3 py-1.5 rounded-md hover:bg-indigo-700 transition font-medium"
        >
          View All News and Announcements
        </Link>
      </div>

      {/* News Content */}
      <div className="space-y-4">
        {newsLoading ? (
          <NewsLoading />
        ) : newsError ? (
          <div className="text-red-500 p-4 bg-red-50 rounded-lg">
            <p>Error loading News and Announcements: {newsError?.message}</p>
            <p className="text-sm mt-2">Please try refreshing the page.</p>
          </div>
        ) : hasRecentNews ? (
          recentNews.map((item, index) => (
            <NewsCard
              key={`news-${item?.id ?? item?.link ?? `${item?.title ?? item?.Title ?? "entry"}-${index}`}`}
              {...item}
            />
          ))
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-600 mb-4">No recent News and Announcements in the past month.</p>
            <Link
              to="/allnews"
              className="inline-block text-indigo-600 hover:text-indigo-700 font-medium"
            >
              View past news and Announcements, more →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
