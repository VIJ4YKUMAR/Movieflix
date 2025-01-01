import { useState, useEffect } from "react";
import { getFavoriteMovies } from "../utilities/favorites";
import MovieCard from "../Atoms/MovieCard";

const API_URL = "https://api.themoviedb.org/3/movie";
const API_KEY = import.meta.env.VITE_API_KEY;

const Favorites = () => {
  const [favoriteMovies, setFavoriteMovies] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchFavoriteMovies = async () => {
    const favoriteIds = getFavoriteMovies();

    if (favoriteIds.length === 0) {
      setFavoriteMovies([]);
      setIsLoading(false);
      return;
    }

    const movieDetails = await Promise.all(
      favoriteIds.map(async (id) => {
        const response = await fetch(`${API_URL}/${id}?api_key=${API_KEY}`);
        if (response.ok) {
          return response.json();
        }
        return null;
      })
    );

    setFavoriteMovies(movieDetails.filter((movie) => movie !== null));
    setIsLoading(false);
  };

  useEffect(() => {
    fetchFavoriteMovies();
  }, []);

  return (
    <div>
      <h1 className="text-center text-2xl font-bold my-5">My Favorite Movies</h1>
      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : favoriteMovies.length === 0 ? (
        <div className="text-center text-gray-500">No favorite movies found.</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {favoriteMovies.map((movie) => (
            <MovieCard key={movie.id} movieCardProps={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
