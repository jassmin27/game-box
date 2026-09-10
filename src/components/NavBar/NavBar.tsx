import { BsSunFill } from "react-icons/bs";
import { TbMoonStars } from "react-icons/tb";
import styles from "./NavBar.module.css";
import SearchInput from "../SearchInput/SearchInput";
import { Link } from "react-router";
import useGameQueryStore from "../../store";

interface Props {
  theme: string;
  onThemeToggle: () => void;
}

function NavBar({ theme, onThemeToggle }: Props) {
  const resetGameQuery = useGameQueryStore((s) => s.resetGameQuery);

  return (
    <header className={styles.navbar}>
      <Link to="/" className={styles.logo} onClick={resetGameQuery}>
        <span className={styles.game}>GAME</span>
        <span className={styles.box}>BOX</span>
      </Link>
      <SearchInput />
      <button
        type="button"
        className={styles["theme-btn"]}
        onClick={onThemeToggle}
        aria-label={
          theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
        }
      >
        {theme === "dark" ? (
          <TbMoonStars className={styles["theme-icon"]} aria-hidden="true" />
        ) : (
          <BsSunFill className={styles["theme-icon"]} aria-hidden="true" />
        )}
      </button>
    </header>
  );
}

export default NavBar;
