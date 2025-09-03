
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import MainLayout from "./Layouts/MainLayout.jsx";
import Loading from "./Pages/loading";

// admin pages
import Admin from "./Pages/admin";
import Login from "./Pages/admin/Login";
import NotFound from "./Pages/404";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <Loading onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <Routes>
      {/* Main public pages with shared layout */}
      <Route path="/" element={<MainLayout />} />
      <Route path="/work" element={<MainLayout />} />
      <Route path="/about" element={<MainLayout />} />
      <Route path="/contact" element={<MainLayout />} />

      {/* Admin routes (separate, no public navbar) */}
      <Route path="/admin" element={<Admin />} />
      <Route path="/admin/login" element={<Login />} />

      {/* 404 fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
