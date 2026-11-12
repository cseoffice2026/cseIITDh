import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchInput() {
  const [query, setQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;

    setIsSearchOpen(false);
    navigate(`/search?q=${encodeURIComponent(trimmedQuery)}`);
  };

  return (
    <div className="relative shrink-0">
      <form
        role="search"
        onSubmit={handleSubmit}
        className="hidden items-center gap-1 lg:flex"
      >
        <label className="sr-only" htmlFor="site-search">
          Search the CSE website
        </label>
        <input
          id="site-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search"
          className="w-28 rounded-md border border-gray-300 px-2 py-1.5 text-sm text-gray-800 outline-none focus:border-brand-700 focus:ring-2 focus:ring-brand-200 xl:w-36"
        />
        <button
          type="submit"
          aria-label="Search"
          className="flex h-9 w-9 items-center justify-center rounded-md text-brand-800 hover:bg-brand-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
        >
          <SearchIcon />
        </button>
      </form>

      <button
        type="button"
        aria-label={isSearchOpen ? "Close search" : "Open search"}
        aria-expanded={isSearchOpen}
        aria-controls="compact-site-search"
        onClick={() => setIsSearchOpen((open) => !open)}
        className="flex h-9 w-9 items-center justify-center rounded-md text-brand-800 hover:bg-brand-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700 lg:hidden"
      >
        <SearchIcon />
      </button>

      {isSearchOpen && (
        <form
          id="compact-site-search"
          role="search"
          onSubmit={handleSubmit}
          className="absolute right-0 top-full z-[110] mt-2 flex w-[min(20rem,calc(100vw-2rem))] items-center gap-2 rounded-lg border border-gray-200 bg-white p-3 shadow-lg lg:hidden"
        >
          <label className="sr-only" htmlFor="compact-search-input">
            Search the CSE website
          </label>
          <input
            id="compact-search-input"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search"
            autoFocus
            className="min-w-0 flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-800 outline-none focus:border-brand-700 focus:ring-2 focus:ring-brand-200"
          />
          <button
            type="submit"
            className="rounded-md bg-[#19007B] px-3 py-2 text-sm font-semibold text-white hover:bg-[#140063] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
          >
            Search
          </button>
        </form>
      )}
    </div>
  );
}

function SearchIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" strokeWidth="2" />
      <path d="m20 20-4-4" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
