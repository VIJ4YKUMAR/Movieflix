const FAVORITES_KEY = "favorites";


export const getFavoriteMovies = (): number[] => {
  const storedFavorites = localStorage.getItem(FAVORITES_KEY);
  return storedFavorites ? JSON.parse(storedFavorites) : [];
}

export const addFavoriteMovie = (movieId: number) => {
  const favorites = getFavoriteMovies();
  if (!favorites.includes(movieId)) {
    favorites.push(movieId);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
}

export const removeFavoriteMovie = (movieId: number) => {
  const favorites = getFavoriteMovies();
  const updatedFavorites = favorites.filter((id) => id !== movieId);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
}

export const isFavoriteMovie = (movieId: number) => {
  const favorites = getFavoriteMovies();
  return favorites.includes(movieId);
}