import { Routes, Route } from "react-router-dom";
import MainLayout from "./Layouts/MainLayout.jsx";

// pages
import Home from "./Pages/home";
import Work from "./Pages/work";
import About from "./Pages/about";
import Contact from "./Pages/contact";

// admin pages
import Admin from "./Pages/admin";
import Login from "./pages/Admin/login";
import NotFound from "./pages/404";

function App() {
  return (
    <Routes>
      {/* Main public pages with shared layout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* Admin routes (separate, no public navbar) */}
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin/login" element={<Login />} />

      {/* 404 fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
