import { useNavigate, useSearchParams } from "react-router-dom";
import Loading from "../components/Loading";
import slugMap from "../constant/searchRoutes";
import useSearchResult from "../hooks/useSearchResult";

function SearchResults() {
  const [searchParams] = useSearchParams();

  const query = searchParams.get("q");

  const { data: results, isLoading, isError, error } = useSearchResult(query);

  const navigate = useNavigate();

  const handleResultClick = (category) => {
    const categoryKey = category.trim().toLowerCase().replace(/\s+/g, "_");
    const targetSlug = slugMap[categoryKey];
    if (typeof targetSlug === "string") {
      navigate(`/${targetSlug}`);
    } else {
      console.warn(`No slug mapping found for category: ${category}`);
    }
  };

  if (!query?.trim()) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center px-4 text-center">
        <p className="text-gray-600">Enter a search term to find department content.</p>
      </div>
    );
  }

  if (isLoading) return <Loading />;
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh]">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg shadow-md flex flex-col items-center">
          <svg
            className="w-12 h-12 mb-2 text-red-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <title>Error</title>
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8v4m0 4h.01"
            />
          </svg>
          <h2 className="text-xl font-bold mb-1">
            Oops! Something went wrong.
          </h2>
          <p className="mb-2 text-center">
            We couldn't fetch your search results. Please try again later.
          </p>
          <details className="text-xs text-gray-600">
            <summary className="cursor-pointer">Show error details</summary>
            <pre className="whitespace-pre-wrap">
              {error?.message || String(error)}
            </pre>
          </details>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-6">
        Search Results for: "{query}"
      </h1>

      {!results ? (
        <NoResultFound query={query} />
      ) : (
        <div>
          {Object.entries(results).map(([category, items]) => (
            <div key={category} className="mb-8">
              <h2 className="text-xl font-semibold mb-4 capitalize">
                {category.replace(/_/g, " ")}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((item, index) => (
                  <div
                    key={
                      item.id ??
                      item.documentId ??
                      `${category}-${item.Title ?? item.Name ?? index}`
                    }
                    className="bg-white p-4 rounded-lg shadow-md border border-gray-100"
                  >
                    <h3 className="font-semibold text-lg mb-1">
                      {category === "peoples"
                        ? item.Name || item.title
                        : item.Title || item.Name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">
                      {category === "peoples"
                        ? item.Designation || item.Role
                        : ""}
                    </p>
                    <button
                      type="button"
                      onClick={() => handleResultClick(category)}
                      className="text-blue-500 hover:underline text-sm focus:outline-none"
                    >
                      Read more
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function NoResultFound({ query }) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <svg
        className="w-16 h-16 text-gray-300 mb-4"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
      >
        <title>No results found</title>
        <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
        <line
          x1="21"
          y1="21"
          x2="16.65"
          y2="16.65"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="8.5"
          y1="10.5"
          x2="13.5"
          y2="10.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <span className="text-xl font-semibold text-gray-700 mb-2">
        No results found
      </span>
      <span className="text-md text-gray-500 mb-2">
        We couldn't find any results for{" "}
        <span className="font-medium text-gray-800">"{query}"</span>
      </span>
      <span className="text-sm text-gray-400 text-center">
        Please try a different keyword or check your spelling.
      </span>
    </div>
  );
}

export default SearchResults;
