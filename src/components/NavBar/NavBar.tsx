import { BsSunFill } from "react-icons/bs";
import { TbMoonStars } from "react-icons/tb";
import styles from "./NavBar.module.css";
import SearchInput from "../SearchInput/SearchInput";

interface Props {
  theme: string;
  onThemeToggle: () => void;
  onSearch: (searchText: string) => void;
}

function NavBar({ theme, onThemeToggle, onSearch }: Props) {
  return (
    <header className={styles.navbar}>
      <div className={styles.logo}>
        <span className={styles.game}>GAME</span>
        <span className={styles.box}>BOX</span>
      </div>
      <SearchInput onSearch={onSearch} />
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
