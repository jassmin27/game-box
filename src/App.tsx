import { useEffect, useState } from "react";
import styles from "./App.module.css";
import NavBar from "./components/NavBar/NavBar";

function App() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div className="app">
      <NavBar theme={theme} onThemeToggle={toggleTheme} />
      <div className={styles.content}>
        <aside>Genres</aside>
        <main>Games</main>
      </div>
    </div>
  );
}

export default App;
