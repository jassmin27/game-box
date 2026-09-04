import styles from "../App.module.css";
import GameContainer from "../components/GameContainer/GameContainer";
import GameHeading from "../components/GameHeading/GameHeading";
import PlatformSelector from "../components/PlatformSelector/PlatformSelector";
import SortSelector from "../components/SortSelector/SortSelector";

function GamesPage() {
  return (
    <>
      <GameHeading />
      <div className={styles.selectors}>
        <SortSelector />
        <PlatformSelector />
      </div>
      <GameContainer />
    </>
  );
}

export default GamesPage;
