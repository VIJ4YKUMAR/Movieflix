import { useNavigate } from "react-router-dom";
import MovieInfoType from "../types/MovieInfoType";
import {
  addFavoriteMovie,
  removeFavoriteMovie,
  isFavoriteMovie,
} from "../utilities/favorites";
import { useState } from "react";

const MovieCard = ({ movieCardProps }: { movieCardProps?: MovieInfoType }) => {

  const {
    id = 0,
    title,
    poster_path,
    release_date,
    vote_average = 0,
  } = movieCardProps || {};

  const imageBaseUrl = "https://image.tmdb.org/t/p/";
  const imageSize = "w500";
  const fullImageUrl = `${imageBaseUrl}${imageSize}${poster_path}`;

  const rating = Math.round(vote_average * 10) / 10;

  const [favorite, setFavorite] = useState<boolean>(isFavoriteMovie(id));

  const toggleFavorite = () => {
    if (favorite) {
      removeFavoriteMovie(id);
    } else {
      addFavoriteMovie(id);
    }
    setFavorite(!favorite);
  };

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/movie/${id}`, { state: { movieCardProps } });
  };

  // const handleCardClick = () => {
  //   navigate(`/country/${encodeURIComponent(data?.name?.common || "")}`, { state: { country: data } });
  // };

  return (
    <div
      className="flex flex-col items-center border-white/40 p-2 bg-white/30 rounded-lg shadow-md hover:shadow-lg cursor-pointer"
      onClick={handleNavigate}
    >
      <div className="shadow-md rounded-lg">
        <img
          className="rounded-lg w-full h-52 sm:h-auto object-fit"
          src={fullImageUrl}
          alt="movie-poster"
        />
      </div>
      <div className="flex flex-col items-center font-mono mt-3">
        <p className="font-bold text-sm sm:text-lg text-center">{title}</p>
        <p className="text-sm text-gray-700">{release_date}</p>
        <p className="text-sm text-gray-700">
          <span className="text-yellow-400 text-lg">★</span> {rating}
        </p>
      </div>
      <button
        className={`self-end ${favorite ? "text-red-500" : "text-gray-500"}`}
        onClick={toggleFavorite}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill={favorite ? "currentColor" : "none"}
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
          />
        </svg>
      </button>
    </div>
  );
};

export default MovieCard;
