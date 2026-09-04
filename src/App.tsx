/*
  App.tsx is the main layout/composition component.
  Game query state is managed globally with Zustand.
*/
import { useEffect, useState } from "react";
import styles from "./App.module.css";
import NavBar from "./components/NavBar/NavBar";
import GameContainer from "./components/GameContainer/GameContainer";
import "react-loading-skeleton/dist/skeleton.css";
import { SkeletonTheme } from "react-loading-skeleton";
import GenreList from "./components/GenreList/GenreList";
import PlatformSelector from "./components/PlatformSelector/PlatformSelector";
import SortSelector from "./components/SortSelector/SortSelector";
import GameHeading from "./components/GameHeading/GameHeading";
import MobileGenreList from "./components/MobileGenreList/MobileGenreList";

const THEME_KEY = "gamebox-theme";

function App() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem(THEME_KEY) || "dark",
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <SkeletonTheme
      baseColor="var(--skeleton-base)"
      highlightColor="var(--skeleton-highlight)"
    >
      <div className={styles["app"]}>
        <NavBar theme={theme} onThemeToggle={toggleTheme} />

        <div className={styles.content}>
          <aside>
            <h2>Genres</h2>
            <GenreList />
          </aside>
          <main>
            <GameHeading />
            <div className={styles.selectors}>
              <SortSelector />
              <PlatformSelector />
            </div>
            <GameContainer />
          </main>
        </div>

        <MobileGenreList />
      </div>
    </SkeletonTheme>
  );
}

export default App;
