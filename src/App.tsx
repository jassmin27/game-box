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
import type { GameQuery } from "./types";
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

  const handleGenreSelect = (genreId: number) => {
    setGameQuery((prevQuery) => ({ ...prevQuery, genreId }));
  };

  const handlePlatformSelect = (platformId: number | null) => {
    setGameQuery((prevQuery) => ({ ...prevQuery, platformId }));
  };

  const handleSortSelect = (sortOrder: string | null) => {
    setGameQuery((prevQuery) => ({ ...prevQuery, sortOrder }));
  };

  const handleSearch = (searchText: string) => {
    setGameQuery((prevQuery) => ({ ...prevQuery, searchText }));
  };

  const [gameQuery, setGameQuery] = useState<GameQuery>({
    genreId: null,
    platformId: null,
    sortOrder: null,
    searchText: null,
  });

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
            <GenreList
              gameQuery={gameQuery}
              onGenreSelect={handleGenreSelect}
            />
          </aside>
          <main>
            <GameHeading gameQuery={gameQuery} />
            <div className={styles.selectors}>
              <SortSelector selectedSortOrder={gameQuery.sortOrder} onSelect={handleSortSelect} />
              <PlatformSelector selectedPlatformId={gameQuery.platformId} onSelect={handlePlatformSelect} />
            </div>
            <GameContainer gameQuery={gameQuery} />
          </main>
        </div>

        <MobileGenreList
          gameQuery={gameQuery}
          onGenreSelect={handleGenreSelect}
        />
      </div>
    </SkeletonTheme>
  );
}

export default App;
