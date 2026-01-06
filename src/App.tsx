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
import type { GameQuery, Genre, Platform } from "./types";
import "react-loading-skeleton/dist/skeleton.css";
import { SkeletonTheme } from "react-loading-skeleton";
import GenreList from "./components/GenreList/GenreList";
import PlatformSelector from "./components/PlatformSelector/PlatformSelector";
import SortSelector from "./components/SortSelector/SortSelector";
import GameHeading from "./components/GameHeading/GameHeading";

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

  const handlePlatformSelect = (platform: Platform | null) => {
    setGameQuery((prevQuery) => ({ ...prevQuery, platform }));
  };

  const handleSortSelect = (sortOrder: string | null) => {
    setGameQuery((prevQuery) => ({ ...prevQuery, sortOrder }));
  };

  const handleSearch = (searchText: string) => {
    setGameQuery((prevQuery) => ({ ...prevQuery, searchText }));
  };

  const [gameQuery, setGameQuery] = useState<GameQuery>({});

  return (
    <SkeletonTheme
      baseColor="var(--skeleton-base)"
      highlightColor="var(--skeleton-highlight)"
    >
      <div className={styles["app"]}>
        <NavBar
          theme={theme}
          onThemeToggle={toggleTheme}
          onSearch={handleSearch}
        />
        <div className={styles.content}>
          <aside>
            <h2>Genres</h2>
            <GenreList onGenreSelect={handleGenreSelect} />
          </aside>
          <main>
            <GameHeading gameQuery={gameQuery} />
            <div className={styles.selectors}>
              <SortSelector onSelect={handleSortSelect} />
              <PlatformSelector onSelect={handlePlatformSelect} />
            </div>
            <GameContainer gameQuery={gameQuery} />
          </main>
        </div>
      </div>
    </SkeletonTheme>
  );
}

export default App;
