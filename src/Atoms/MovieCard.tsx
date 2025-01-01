import toast, { Toaster } from "react-hot-toast";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import MovieInfoType from "../types/MovieInfoType";

const MAX_FAVORITE_LIMIT = 5;

const MovieCard = ({ movieCardProps }: { movieCardProps?: MovieInfoType }) => {
  // const dispatch = useDispatch();
  // const favorites = useSelector(
  //   (state: RootState) => state.countries.favorites
  // );

  const { original_title, id, title, poster_path, release_date, vote_average } = movieCardProps || {};

  const imageBaseUrl = "https://image.tmdb.org/t/p/";
  const imageSize = "w500"; // or 'original'
  const fullImageUrl = `${imageBaseUrl}${imageSize}${poster_path}`;


  // const navigate = useNavigate();

  // const isFavorite = favorites.some(
  //   (fav) => fav.name.common === data?.name.common
  // );

  // const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.stopPropagation();
  //   e.preventDefault();

  //   if (data) {
  //     if (isFavorite) {
  //       dispatch(removeFromFavorites(data));
  //     } else {
  //       if (favorites?.length === MAX_FAVORITE_LIMIT) {
  //         return toast.error("maximum limit reached", {
  //           duration: 2000,
  //           position: "bottom-center",
  //           style: { background: "white" },
  //         });
  //       }
  //       dispatch(addToFavorites(data));
  //     }
  //   }
  // };

  // const handleCardClick = () => {
  //   navigate(`/country/${encodeURIComponent(data?.name?.common || "")}`, { state: { country: data } });
  // };

  return (
    <div
      className="flex flex-col border-white/40 p-2 bg-white/30 backdrop-blur-md shadow-md hover:shadow-lg cursor-pointer"
    // onClick={handleCardClick}
    >
      <div className="shadow-md rounded-lg">
        <img
          className="rounded-lg w-full h-52 sm:h-auto object-fit"
          src={fullImageUrl}
          alt="movie-poster"
        />
      </div>
      <div className="font-mono mt-3">
        <p className="font-bold">{title}</p>
        <div className="flex gap-8 text-sm items-center">
          <p className="text-gray-700">{release_date}</p>
          <p className="text-gray-700">
            <span className="text-yellow-400 text-lg">★</span>
            {" "}{vote_average}
          </p>
        </div>
      </div>
      <button
        className="self-end"
      // className={`self-end ${isFavorite ? "text-red-500" : "text-gray-500"}`}
      // onClick={handleFavoriteClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          // fill={isFavorite ? "currentColor" : "none"}
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
      <Toaster />
    </div>
  );
};

export default MovieCard;
