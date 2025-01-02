export const getFavoriteMovies = (): number[] => {
  const user = localStorage.getItem("user");
  if (!user) return [];

  const storedFavorites = localStorage.getItem(`${user}-favorites`);
  return storedFavorites ? JSON.parse(storedFavorites) : [];
}

export const addFavoriteMovie = (movieId: number) => {
  const user = localStorage.getItem("user");
  if (!user) return;

  const favorites = getFavoriteMovies();
  if (!favorites.includes(movieId)) {
    favorites.push(movieId);
    localStorage.setItem(`${user}-favorites`, JSON.stringify(favorites));
  }
}

export const removeFavoriteMovie = (movieId: number) => {
  const user = localStorage.getItem("user");
  if (!user) return;

  const favorites = getFavoriteMovies();
  const updatedFavorites = favorites.filter((id) => id !== movieId);
  localStorage.setItem(`${user}-favorites`, JSON.stringify(updatedFavorites));
}

export const isFavoriteMovie = (movieId: number) => {
  const favorites = getFavoriteMovies();
  return favorites.includes(movieId);
}