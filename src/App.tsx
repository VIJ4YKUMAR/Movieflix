import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./Layout/Layout";
import Movies from "./Movies/Movies";
import FavoriteMovies from "./Movies/FavoriteMovies";
import MovieDetails from "./Movies/MovieDetails";
import SignUp from "./Login/Signup";
import Login from "./Login/Login";
import ProtectedRoute from "./ProtectedRoutes";

const App = () => {

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Movies />
              </ProtectedRoute>
            }
          />
          <Route path="/favorite-movies" element={<FavoriteMovies />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App;
