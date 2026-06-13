import React, { useState, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import SearchHeader from "./components/SearchHeader";
import GameList from "./components/GameList";
import FilterObj from "./types/FilterObj";

const queryClient = new QueryClient();

const defaultFilters: FilterObj = {
  sort_by: "",
  sort_dir: "",
  game_category: [],
  sales: false,
  demo: false,
  format: "",
  console: "",
  availability: [],
  price_range: 0,
};

export default function App() {
  const [query, setQuery] = useState<string>("");
  const [filters, setFilters] = useState<FilterObj>(defaultFilters);

  const receiveSearchHeader = (query: string, filters: FilterObj) => {
    setQuery(query);
    setFilters(filters);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <SearchHeader toParent={receiveSearchHeader} />

      {/* Suspense shows fallback while GameList fetches */}
      <Suspense
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
