import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./Layout/Layout";
import Movies from "./Movies/Movies";
function App() {

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Movies />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App;
