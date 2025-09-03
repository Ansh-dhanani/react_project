import { useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Transition from "../Components/Transition";

// Import pages
import Home from "../Pages/home";
import Work from "../Pages/work";
import About from "../Pages/about";
import Contact from "../Pages/contact";

export default function MainLayout() {
  const location = useLocation();
  const [triggerTransition, setTriggerTransition] = useState(false);
  const [displayedPage, setDisplayedPage] = useState(null);
  const mainRef = useRef(null);

  const getPageComponent = (path) => {
    switch (path) {
      case "/":
        return <Home />;
      case "/work":
        return <Work />;
      case "/about":
        return <About />;
      case "/contact":
        return <Contact />;
      default:
        return <Home />;
    }
  };

  useEffect(() => {
    // On initial load, set the displayed page
    if (!displayedPage) {
      setDisplayedPage(getPageComponent(location.pathname));
      return;
    }

    // On route change, trigger transition
    setTriggerTransition(true);

    // After transition completes, update the displayed page
    const timer = setTimeout(() => {
      setDisplayedPage(getPageComponent(location.pathname));
      setTriggerTransition(false);
    }, 1100); // Duration of animation

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="bg-[var(--color-background)] w-full min-h-screen relative px-5 py-16 sm:px-15 sm:py-15 lg:px-15 lg:py-15">
      <Transition trigger={triggerTransition} />
      <Navbar />
      <main ref={mainRef} className="">
        {displayedPage}
      </main>
      <Footer />
    </div>
  );
}
