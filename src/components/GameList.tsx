import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import axiosApi from "../../services/axios";
import Game from "../types/Game";
import FilterObj from "../types/FilterObj";

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
      <div className="m-auto container border border-blue-400">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
          {allGames.map((gameObj, gameIndex) => (
            <div className="card bg-base-100 shadow-sm" key={gameIndex}>
              <figure>
                <img
                  src={
                    gameObj.photo_gallery[0]?.src ||
                    "https://via.placeholder.com/150"
                  }
                  alt="First Photo"
                  className="w-full object-cover aspect-video"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{gameObj.title}</h2>
                {gameObj.sale_price && (
                  <p>
                    <span className="text-lg font-bold">
                      ${gameObj.sale_price}
                    </span>
                  </p>
                )}
                {gameObj.regular_price && (
                  <p>
                    <span className="text-lg font-bold">
                      ${gameObj.regular_price}
                    </span>
                  </p>
                )}
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Buy Now</button>
                </div>
              </div>
            </div>
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
