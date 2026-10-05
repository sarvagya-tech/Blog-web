import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import BlogDetails from "./pages/BlogDetails";
import CreateBlog from "./pages/CreateBlog";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ArticlesPage from "./pages/ArticlesPage";
import AboutPage from "./pages/AboutPage";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-amber-400 selection:text-slate-950">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<ArticlesPage />} />
        <Route path="/blog/create" element={<CreateBlog />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<AboutPage />} />
        {/* Fallback */}
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
