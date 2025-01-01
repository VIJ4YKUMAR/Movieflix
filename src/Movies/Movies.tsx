import { useQuery } from "@tanstack/react-query";
import MovieCard from "../Atoms/MovieCard";
import MovieInfoType from "../types/MovieInfoType";

type Movies = {
  page: Number;
  results: MovieInfoType[];
  totalPages: Number;
  total_results: Number;
}

const API_KEY = import.meta.env.VITE_API_KEY;
const API_URl = "https://api.themoviedb.org/3/discover/movie";
const accessToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNmI0YjcxZGYwNDY0NTRjODQ1YWU4MDJjODk1ZjZlMCIsIm5iZiI6MTczNTcxNzM3NS45MDksInN1YiI6IjY3NzRmMWZmMDVjNDZhYjNmYzkyZTViZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YP3X5uTeP_Wg1rmtJM025bBhjxZsyd0LAf58mK2u4hY"



const Movies = () => {

  const fetchMovies = async (): Promise<Movies> => {
    const response = await fetch(`${API_URl}?apikey=${API_KEY}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      }
    });
    if (!response.ok) {
      throw new Error("failed to fetch movies");
    }
    return response.json();
  };

  const { data: allMovies } = useQuery<Movies, Error>({
    queryKey: ["movies"],
    queryFn: async () => {
      const data = await fetchMovies();
      return data;
    },
  });

  const movies = allMovies?.results;
  return (
    movies && movies.map((movie) => (
      <MovieCard key={movie.id} movieCardProps={movie} />
    ))
  )
};

export default Movies;
