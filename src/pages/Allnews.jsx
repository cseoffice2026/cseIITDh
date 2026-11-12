import { useNews } from "../hooks/useNews";
import NewsCard from "../components/Home/NewsCard";

const NewsLoading = () => (
  <div className="space-y-6 animate-pulse">
    {Array.from({ length: 4 }).map((_, i) => (
      <div key={i} className="bg-gray-200 rounded-2xl h-40 w-full"></div>
    ))}
  </div>
);

export default function NewsPage() {
  const { data: news, isLoading: newsLoading, error: newsError } = useNews();

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-8 md:px-16">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8">          
          <h1 className="mt-1 text-3xl font-bold text-gray-800">
            All News and Announcements
          </h1>          
        </header>

        {newsLoading ? (
          <NewsLoading />
        ) : newsError ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-red-600">
            <p className="font-semibold text-lg">
              Oops, something went wrong!
            </p>
            <p className="text-sm mt-2">
              There was an error loading the News and Announcements. Please try
              refreshing the page.
            </p>
          </div>
        ) : news && news.length > 0 ? (
          <div className="grid grid-cols-1 gap-5">
            {news.map((item, index) => (
              <NewsCard
                key={`news-${item?.id ?? item?.link ?? `${item?.title ?? item?.Title ?? "entry"}-${index}`}`}
                item={item}
              />
            ))}
          </div>
        ) : (
          <div className="mt-12 rounded-xl bg-white px-6 py-10 text-center text-gray-500 shadow-sm">
            <p className="text-lg">No News and Announcements found.</p>
          </div>
        )}
      </div>
    </main>
  );
}