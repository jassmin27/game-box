import { IoSearchOutline } from "react-icons/io5";
import { BsSunFill } from "react-icons/bs";
import { TbMoonStars } from "react-icons/tb";
import logo from "../../assets/logo.webp";
import styles from "./NavBar.module.css";

interface Props {
  theme: string;
  onThemeToggle: () => void;
}

function NavBar({ theme, onThemeToggle }: Props) {
  return (
    <header className={styles.navbar}>
      <img src={logo} alt="GameBox Logo" className={styles.logo} />
      <div className={styles["search-group"]}>
        <IoSearchOutline className={styles["search-icon"]} />
        <input
          name="search"
          type="text"
          autoComplete="off"
          className={styles["search-bar"]}
          placeholder="Search games"
        />
      </div>
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
