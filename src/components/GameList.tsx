import React, { useState, useEffect } from "react";
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
  const { data, fetchNextPage, hasNextPage } = useSuspenseInfiniteQuery({
    queryKey: ["games", query, filters],
    queryFn: ({ pageParam }) => fetchGames({ pageParam, query, filters }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.nextPage : undefined,
  });

  const allGames: Game[] = data.pages.flatMap((page) => page.games);

  return (
    <>
      <div className="m-auto container ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
          {allGames.map((gameObj, gameIndex) => (
            <GameCard key={gameIndex} gameObj={gameObj}></GameCard>
          ))}
        </div>

        {hasNextPage && (
          <button
            type="button"
            className="btn btn-warning w-full"
            onClick={() => fetchNextPage()}
          >
            Load More
          </button>
        )}
      </div>
    </>
  );
}
