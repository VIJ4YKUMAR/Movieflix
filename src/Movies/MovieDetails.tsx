import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const ProfileCard = ({ profileData }: { profileData: any }) => {
  if (!profileData?.profile_path) {
    return null;
  }

  return (
    <div className="flex flex-col text-center rounded-lg shadow-lg text-sm pb-2">
      <img
        src={`https://image.tmdb.org/t/p/w500${profileData.profile_path}`}
        alt={profileData.title || profileData.name}
        className="mb-3"
      />
      <p>{profileData.name}</p>
      {profileData?.character && (
        <>
          <p className="text-gray-400">as</p>
          <p className="mb-2">{profileData.character}</p>
        </>
      )}
    </div>
  );
};

const MovieDetails = () => {
  const [cast, setCast] = useState<any[]>([]);
  const [crew, setCrew] = useState<any[]>([]);

  const location = useLocation();
  const { movieCardProps } = location.state || {};

  if (!movieCardProps) {
    return (
      <div className="text-center mt-10 text-red-500">
        No movie data available.
      </div>
    );
  }

  const rating = Math.round(movieCardProps?.vote_average * 10) / 10;

  const API_KEY = import.meta.env.API_KEY;
  const MOVIE_ID = movieCardProps?.id;
  const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;

  const getCastAndCrew = async (movieId: number) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();

      setCast(data.cast);
      setCrew(data.crew);
    } catch (error) {
      console.error("Error fetching cast and crew data:", error);
    }
  };

  useEffect(() => {
    if (MOVIE_ID) {
      getCastAndCrew(MOVIE_ID);
    }
  }, [MOVIE_ID]);

  return (
    <>
      <div className="flex flex-col md:flex-row justify-center items-center p-5">
        <div className="md:w-1/3">
          <img
            src={`https://image.tmdb.org/t/p/w500${movieCardProps.poster_path}`}
            alt={movieCardProps.title}
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="md:w-2/3 md:ml-8 mt-5 md:mt-0">
          <h1 className="text-3xl font-bold mb-4">{movieCardProps.title}</h1>
          <div className="flex items-center text-sm mb-4">
            <span className="mr-3">
              {movieCardProps.release_date.split("-")[0]}
            </span>
            <span className="mr-3">{movieCardProps.runtime} min</span>
            <span>{movieCardProps.genres?.join(", ")}</span>
          </div>
          <p className="mb-5">{movieCardProps.overview}</p>
          <div className="flex items-center">
            <span className="font-bold mr-2">Rating:</span>
            <span className="text-green-500 font-bold text-lg">
              {rating}
            </span>
          </div>
          <div className="flex gap-4 mt-5">
            <button className="px-4 py-2 rounded">Watch Trailer</button>
            <button className="px-4 py-2 rounded">Watch Movie</button>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <p className="text-bold text-xl">Cast</p>
        <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-8 gap-3 mt-10">
          {cast &&
            cast.map((item) => (
              <ProfileCard key={item.id} profileData={item} />
            ))}
        </div>
      </div>
      <div className="mt-10">
        <p className="text-bold text-xl">Crew</p>
        <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-8 gap-3 mt-10">
          {crew &&
            crew.map((item) => (
              <ProfileCard key={item.id} profileData={item} />
            ))}
        </div>
      </div>
    </>
  );
};

export default MovieDetails;
