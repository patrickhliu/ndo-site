import React, { useState, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import SearchHeader from "./components/SearchHeader";
import GameList from "./components/GameList";
import FilterHeader from "./components/FilterHeader";
import FilterObj from "./types/FilterObj";

const queryClient = new QueryClient();

const defaultFilters: FilterObj = {
  sort_by: "",
  sort_dir: "",
  game_category: "",
  sales: false,
  demo: false,
  coming_soon: false,
  pre_order: false,
  format: "",
  console: "",
  availability: 0,
  price_range: 0,
};

export default function App() {
  const [query, setQuery] = useState<string>("");
  const [filters, setFilters] = useState<FilterObj>(defaultFilters);

  const receiveSearchHeader = (query: string) => {
    setQuery(query);
  };

  const receiveFilterHeader = (filters: FilterObj) => {
    setFilters(filters);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <SearchHeader toParent={receiveSearchHeader} />
      <FilterHeader
        filtersFromParent={defaultFilters}
        toParent={receiveFilterHeader}
      />
      {/* Suspense shows fallback while GameList fetches */}
      <Suspense
        key={JSON.stringify(filters) + query} // ← forces remount on change
        fallback={
          <div className="spinner-container">
            <div className="spinner">
              <div className="bounce1"></div>
              <div className="bounce2"></div>
              <div className="bounce3"></div>
            </div>
          </div>
        }
      >
        <GameList query={query} filters={filters} />
      </Suspense>
    </QueryClientProvider>
  );
}
