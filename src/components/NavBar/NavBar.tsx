import { BsSunFill } from "react-icons/bs";
import { TbMoonStars } from "react-icons/tb";
import styles from "./NavBar.module.css";
import SearchInput from "../SearchInput/SearchInput";
import { Link } from "react-router";

interface Props {
  theme: string;
  onThemeToggle: () => void;
}

function NavBar({ theme, onThemeToggle }: Props) {
  return (
    <header className={styles.navbar}>
      <Link to="/" className={styles.logo}>
        <span className={styles.game}>GAME</span>
        <span className={styles.box}>BOX</span>
      </Link>
      <SearchInput />
      <button
        type="button"
        className={styles["theme-btn"]}
        onClick={onThemeToggle}
      >
        {theme === "dark" ? (
          <TbMoonStars className={styles["theme-icon"]} />
        ) : (
          <BsSunFill className={styles["theme-icon"]} />
        )}
      </button>
    </header>
  );
}

export default NavBar;
