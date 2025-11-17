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

function App() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const [gameQuery, setGameQuery] = useState<GameQuery>({});

  return (
    <div className="app">
      <NavBar theme={theme} onThemeToggle={toggleTheme} />
      <div className={styles.content}>
        <aside>Genres</aside>
        <main>
          <GameContainer gameQuery={gameQuery} />
        </main>
      </div>
    </div>
  );
}

export default App;
