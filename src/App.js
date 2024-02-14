
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Stories from "./components/Stories";
import Dashboard from "./components/Dashboard";
import LandingPage from "./components/LandingPage.jsx";

import ListBlogs from "./components/ListBlogs";
import Vocabulary from "./components/Vocabulary.jsx";
import Login from "./components/Login.jsx";
import NoMatch from "./components/NoMatch.jsx";
import SingleBlog from "./components/SingleBlog.jsx";
import Logout from "./components/Logout.jsx";
import User from "./components/UserProfile.jsx";
import Register from "./components/Register.jsx";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/Stories" element={<Stories />} />
          <Route path="/Blogs" element={<ListBlogs />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Vocabulary" element={<Vocabulary />} />
          <Route path="/User" element={<User />} />
          
          <Route path="/Blogs/:id" element={<SingleBlog />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />

          <Route path="/Logout" element={<Logout />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Router>      
    </div>
  );
}

export default App;
