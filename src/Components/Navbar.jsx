import { useTheme } from "../Context/ThemeProvider";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="bg-background text-foreground p-4 flex justify-between">
      <h1 className="text-brand">Nav-bar</h1>
      <button
        onClick={toggleTheme}
        className="btn"
      >
        Switch to {theme === "light" ? "Dark" : "Light"}
      </button>
    </nav>
  );
}
