import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./Layout/Layout";
import Movies from "./Movies/Movies";
import FavoriteMovies from "./Movies/FavoriteMovies";
import MovieDetails from "./Movies/MovieDetails";
function App() {

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Movies />} />
          <Route path="/favorite-movies" element={<FavoriteMovies />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App;
