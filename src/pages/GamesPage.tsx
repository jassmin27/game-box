import styles from "../App.module.css";
import GameContainer from "../components/GameContainer/GameContainer";
import GameHeading from "../components/GameHeading/GameHeading";
import PlatformSelector from "../components/PlatformSelector/PlatformSelector";
import SortSelector from "../components/SortSelector/SortSelector";
import { useSearchParams } from "react-router";

function GamesPage() {
  const [searchParams] = useSearchParams();
  const isSearching = Boolean(searchParams.get("search"));

  return (
    <>
      <GameHeading />
      {!isSearching && (
        <div className={styles.selectors}>
          <SortSelector />
          <PlatformSelector />
        </div>
      )}
      <GameContainer />
    </>
  );
}

export default GamesPage;
