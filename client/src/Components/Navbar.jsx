import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "./Wrappers/Buttons";

const HamburgerIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="w-4 h-5"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [activeItem, setActiveItem] = React.useState("Home");
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 640);
  const menuItems = ["Home", "Work", "About", "Contact"];

  const getPath = (item) => {
    switch (item) {
      case "Home": return "/";
      case "Work": return "/work";
      case "About": return "/about";
      case "Contact": return "/contact";
      default: return "/";
    }
  };

  const getItemFromPath = (path) => {
    switch (path) {
      case "/": return "Home";
      case "/work": return "Work";
      case "/about": return "About";
      case "/contact": return "Contact";
      default: return "Home";
    }
  };

  const toggleMenu = () => {
    const newMenuState = !isMenuOpen;
    setIsMenuOpen(newMenuState);
  };

  const handleMenuClick = (item) => {
    setActiveItem(item);
    setIsMenuOpen(false);

    // Navigate to route
    const path = getPath(item);
    if (location.pathname !== path) {
      navigate(path);
    }
  };

  React.useEffect(() => {
    // Set active item based on current location
    setActiveItem(getItemFromPath(location.pathname));

    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest(".navbar-container")) {
        setIsMenuOpen(false);
        document.querySelector(".menu-text").textContent = "MENU";
        document.querySelectorAll(".arrow").forEach((arrow) => {
          arrow.classList.remove("rotate-180");
        });
      }
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleResize);
    };
  }, [isMenuOpen, location.pathname]);

  return (
    <div className="navbar-container">
      {/* Fixed Site Name */}
      <div
        className="fixed top-3 left-5 sm:top-5 sm:left-14 z-[40] text-foreground font-poppins text-[1.4rem] sm:text-2xl font-bold"
        // style={{ mixBlendMode: "difference", color: "rgb(255, 255, 255)" }}
      >
        SITE NAME
      </div>
      <div
        onClick={toggleMenu}
        className="fixed top-4 right-4 sm:top-8 sm:right-14 z-[41]"
      >
        <Button variant="gradient" icon={<HamburgerIcon />}>
          {isMenuOpen ? "Close" : "Menu"}
        </Button>
      </div>

      <div
        className="fixed bg-[var(--color-contrast)] z-[39] rounded-[20px] sm:rounded-[17px] overflow-hidden"
        style={{
          top: isMenuOpen ? (isMobile ? "3px" : "5px") : (isMobile ? "20px" : "30px"),
          right: isMenuOpen ? (isMobile ? "4px" : "5px") : (isMobile ? "60px" : "50px"),
          width: isMenuOpen ? (isMobile ? "min(300px, 90vw)" : "350px") : "0px",
          height: isMenuOpen ? (isMobile ? "350px" : "450px") : "0px",
          padding: isMenuOpen ? (isMobile ? "20px" : "32px") : "0px",
          transformOrigin: "top right",
          transition: isMenuOpen
            ? "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
            : isMobile ? "width 0.5s cubic-bezier(0.55, 0.06, 0.68, 0.49) 0.15s, height 0.6s cubic-bezier(0.55, 0.06, 0.68, 0.19), top 0.6s cubic-bezier(0.55, 0.06, 0.68, 0.19), right 0.9s cubic-bezier(0.55, 0.06, 0.68, 0.19), padding 0.5s cubic-bezier(0.55, 0.06, 0.68, 0.19)" : "width 0.5s cubic-bezier(0.55, 0.06, 0.68, 0.19) 0.15s, height 0.6s cubic-bezier(0.55, 0.06, 0.68, 0.19), top 0.6s cubic-bezier(0.55, 0.06, 0.68, 0.19), right 0.6s cubic-bezier(0.55, 0.06, 0.68, 0.19), padding 0.5s cubic-bezier(0.55, 0.06, 0.68, 0.19)",
        }}
      >
        <div className="flex pt-8 sm:pt-14 flex-col items-end text-right">
          {menuItems.map((item, index) => (
            <div
              key={item}
              className="relative flex items-center gap-2 sm:gap-3 text-[var(--color-bg)] font-poppins text-3xl sm:text-5xl pt-4 sm:pt-6 cursor-pointer transition-all duration-300 whitespace-nowrap group"
              onClick={() => handleMenuClick(item)}
              style={{
                transform: isMenuOpen ? "translateY(0)" : "translateY(0)",
                opacity: isMenuOpen ? 1 : 0,
                transition: isMenuOpen
                  ? `transform 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${
                      0.3 + index * 0.1
                    }s, opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${
                      0.3 + index * 0.1
                    }s`
                  : "opacity 0.2s ease-out",
              }}
            >
              {activeItem === item && (
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              )}
              <span className="hover:opacity-60  w-full transition-opacity duration-300">
                {item}
              </span>
            </div>
          ))}
          <div
            className="text-[var(--color-bg)] text-lg sm:text-xl pt-4 cursor-pointer hover:opacity-60 transition-all duration-300"
            onClick={(e) => {
              e.stopPropagation();
              document.documentElement.classList.toggle("dark");
            }}
            style={{
              opacity: isMenuOpen ? 1 : 0,
              transition: isMenuOpen
                ? `opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${
                    0.3 + menuItems.length * 0.1
                  }s`
                : "opacity 0.2s ease-out",
            }}
          >
            <div className="text-[1rem] opacity-70 pt-4">Dark / Light</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;