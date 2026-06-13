import React, { useState, useEffect } from "react";
import FilterObj from "../types/FilterObj";

interface HeaderProps {
  toParent: (query: string, filters: FilterObj) => void;
}

export default function SearchHeader({ toParent }: HeaderProps) {
  const [query, setQuery] = useState<string>("");

  const [filters, setFilters] = useState<FilterObj>({
    sort_by: "",
    sort_dir: "",
    game_category: [],
    sales: false,
    demo: false,
    format: "",
    console: "",
    availability: [],
    price_range: 0,
  });

  // when filters are modified, call toParent() to execute api call...
  useEffect(() => {
    toParent(query, filters);
  }, [filters]);

  return (
    <>
      <div className="w-screen text-center my-6 border border-blue-200">
        <span className="text-blue-500 border border-blue-700 px-4 py-2 rounded-2xl">
          eShop Scraper
        </span>
        <div className="sm:container mx-auto xl:w-3xl p-2 border border-blue-200">
          <form className="relative">
            <div className="join w-full">
              {/* Search Input */}
              <div className="relative flex-1">
                <label className="input input-bordered flex items-center gap-2 w-full join-item">
                  {/* Search Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 opacity-70"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 01-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search..."
                    className="grow outline-none bg-transparent"
                  />

                  {/* Clear Button (X) */}
                  {query && (
                    <button
                      type="button"
                      onClick={() => {
                        setQuery("");
                      }}
                      className="btn btn-ghost btn-circle btn-sm absolute right-2 hover:bg-base-200"
                    >
                      ✕
                    </button>
                  )}
                </label>
              </div>

              {/* Search Button */}
              <button
                type="button"
                className="btn btn-primary join-item"
                onClick={() => {
                  toParent(query, filters);
                }}
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
