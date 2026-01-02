import { IoSearchOutline } from "react-icons/io5";
import styles from "./SearchInput.module.css";

function SearchInput() {
  return (
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
  );
}

export default SearchInput;
