import React, { useState, useEffect, useRef } from "react";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import axiosApi from "../../services/axios";
import Game from "../types/Game";
import FilterObj from "../types/FilterObj";
import GameCard from "./GameCard";

interface GameListProps {
  query: string;
  filters: FilterObj;
}

async function fetchGames({
  pageParam,
  query,
  filters,
}: {
  pageParam: number;
  query: string;
  filters: FilterObj;
}) {
  const params = new URLSearchParams({
    q: query.trim(),
    current_page: String(pageParam),
    filters: JSON.stringify(filters),
  });
  const res = await axiosApi.get(`/nintendo/all?${params}`);
  return res.data;
}

export default function GameList({ query, filters }: GameListProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery({
      queryKey: ["games", query, filters],
      queryFn: ({ pageParam }) => fetchGames({ pageParam, query, filters }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) =>
        lastPage.hasMore ? lastPage.nextPage : undefined,
    });

  const sentinelRef = useRef<HTMLDivElement>(null);
  const allGames: Game[] = data.pages.flatMap((page) => page.games);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        /* console.log(
          "intersecting:",
          entries[0].isIntersecting,
          "hasNextPage:",
          hasNextPage,
        ); */
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0, rootMargin: "200px" },
    );

    if (sentinelRef.current) observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <>
      <div className="m-auto container ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
          {allGames.map((gameObj, gameIndex) => (
            <GameCard key={gameIndex} gameObj={gameObj}></GameCard>
          ))}
        </div>

        {/* Sentinel div — triggers next page load when visible */}
        <div ref={sentinelRef} className="h-1" />

        {isFetchingNextPage && (
          <div className="flex justify-center p-4">
            <span className="loading loading-spinner loading-md" />
          </div>
        )}

        {/* {hasNextPage && (
          <button
            type="button"
            className="btn btn-warning w-full"
            onClick={() => fetchNextPage()}
          >
            Load More
          </button>
        )} */}
      </div>
    </>
  );
}
