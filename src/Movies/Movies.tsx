// @ts-nocheck

import { useInfiniteQuery } from "@tanstack/react-query";
import MovieCard from "../Atoms/MovieCard";
import MovieInfoType from "../types/MovieInfoType";
import { useRef, useCallback, useState, useEffect } from "react";
import { getFavoriteMovies } from "../utilities/favorites";

type Movies = {
  page: number;
  results: MovieInfoType[];
  total_pages: number;
  total_results: number;
};

const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = "https://api.themoviedb.org/3/discover/movie";

const accessToken = import.meta.env.VITE_ACCESS_TOKEN;

const Movies = () => {
  const [query, setQuery] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);
    return () => {
      clearTimeout(handler);
    }
  }, [query]);

  const fetchMovies = async ({
    pageParam = 1,
    queryKey
  }: {
    pageParam: number;
    queryKey: [string, string];
  }): Promise<Movies> => {
    const endpoint = query.trim()
      ? `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
        query
      )}&page=${pageParam}`
      : `${API_URL}?api_key=${API_KEY}&page=${pageParam}`;
    const response = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }
    return response.json();
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    refetch,
  } = useInfiniteQuery<Movies, Error>({
    queryKey: ["movies", debouncedQuery],
    queryFn: fetchMovies,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
  });

  const observerRef = useRef<HTMLDivElement | null>(null);

  const lastMovieRef = useCallback(
    (node: HTMLDivElement) => {
      if (isFetchingNextPage) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );

  const movies = data?.pages.flatMap((page) => page.results) || [];

  const favoriteIds = getFavoriteMovies();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    refetch();
  };

  return (
    <div>
      <div className="mb-5 font-mono">
        <form onSubmit={handleSearch} className="flex justify-center mb-5">
          <input
            type="text"
            placeholder="Search for a movie..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg w-2/3 focus:outline-none focus:ring-2 focus:ring-indigo-600"
          />
        </form>
        <p className="font-extralight text-center text-3xl">All Movies</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-10">
        {movies.map((movie, index) => {
          if (movies.length === index + 1) {
            return (
              <div ref={lastMovieRef} key={movie.id}>
                <MovieCard movieCardProps={movie} />
              </div>
            );
          }
          return (
            <MovieCard
              key={movie.id}
              movieCardProps={{
                ...movie,
                isFavorite: favoriteIds.includes(movie.id),
              }}
            />
          );
        })}
      </div>
      {status === "loading" && (
        <div className="flex justify-center items-center">
          <p>Loading...</p>
        </div>
      )}
      {isFetching && !isFetchingNextPage && (
        <div className="flex justify-center items-center">
          <p>Fetching more movies...</p>
        </div>
      )}
    </div>
  );
};

export default Movies;
