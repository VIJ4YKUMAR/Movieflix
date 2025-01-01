import { useInfiniteQuery } from "@tanstack/react-query";
import MovieCard from "../Atoms/MovieCard";
import MovieInfoType from "../types/MovieInfoType";
import { useRef, useCallback } from "react";
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
  const fetchMovies = async ({ pageParam = 1 }: { pageParam: number }): Promise<Movies> => {
    const response = await fetch(`${API_URL}?apikey=${API_KEY}&page=${pageParam}`, {
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
  } = useInfiniteQuery<Movies, Error>({
    queryKey: ["movies"],
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

  return (
    <div>
      <div className="mb-5 font-mono">
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
          return <MovieCard key={movie.id} movieCardProps={{ ...movie, isFavorite: favoriteIds.includes(movie.id) }} />;
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
