/* 
  App.tsx is the main container of the app.
  - Holds the central state for gameQuery (filters like genre, platform, sort, search).
  - Provides handlers to update the filters when the user interacts with the UI.
  - Passes gameQuery to GameContainer to fetch and display filtered games.
*/

import { useEffect, useState } from "react";
import styles from "./App.module.css";
import NavBar from "./components/NavBar/NavBar";
import GameContainer from "./components/GameContainer/GameContainer";
import type { GameQuery, Genre } from "./types";
import "react-loading-skeleton/dist/skeleton.css";
import { SkeletonTheme } from "react-loading-skeleton";
import GenreList from "./components/GenreList/GenreList";
import PlatformSelector from "./components/GenreListItem/PlatformSelector/PlatformSelector";

function App() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const handleGenreSelect = (genre: Genre) => {
    setGameQuery((prevQuery) => ({ ...prevQuery, genre }));
  };

  const handlePlatformSelect = (platformId: number | null) => {
    setGameQuery((prevQuery) => ({ ...prevQuery, platformId }));
  };

  const [gameQuery, setGameQuery] = useState<GameQuery>({});

  return (
    <SkeletonTheme
      baseColor="var(--skeleton-base)"
      highlightColor="var(--skeleton-highlight)"
    >
      <div className={styles["app"]}>
        <NavBar theme={theme} onThemeToggle={toggleTheme} />
        <div className={styles.content}>
          <aside>
            <GenreList onGenreSelect={handleGenreSelect} />
          </aside>
          <main>
            <PlatformSelector onSelect={handlePlatformSelect} />
            <GameContainer gameQuery={gameQuery} />
          </main>
        </div>
      </div>
    </SkeletonTheme>
  );
}

export default App;
