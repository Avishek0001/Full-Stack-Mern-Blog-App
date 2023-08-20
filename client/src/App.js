
import './App.css';
import Header from './components/Header';
import { Routes, Route } from "react-router-dom"
import Blogs from "../src/pages/Blogs"
import Login from './pages/Login';
import Register from './pages/Register';
import UserBlogs from './pages/userBlogs';
import CreateBlogs from './pages/CreateBlogs';
import BlogDetails from './pages/BlogDetails';
import Single_Post from './pages/Single_Post';
import { Toaster } from 'react-hot-toast';


function App() {

  return (
    <div className="main">
      <Header />
      <Toaster />
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/my-blogs" element={<UserBlogs />} />
        <Route path="/get-blog/:id" element={<Single_Post />} />
        <Route path="/blog-details/:id" element={<BlogDetails />} />
        <Route path="/create-blogs" element={<CreateBlogs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

    </div>

  );
}

export default App;
