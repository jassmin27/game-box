import { IoSearchOutline } from "react-icons/io5";
import styles from "./SearchInput.module.css";
import { useRef } from "react";
import useGameQueryStore from "../../store";
import { useNavigate } from "react-router";

function SearchInput() {
  const navigate = useNavigate();
  const ref = useRef<HTMLInputElement>(null);
  const setSearchText = useGameQueryStore((s) => s.setSearchText);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSearchText(ref.current?.value.trim() || null);
        navigate("/");
      }}
    >
      <div className={styles["search-group"]}>
        <IoSearchOutline className={styles["search-icon"]} />
        <input
          ref={ref}
          name="search"
          type="search"
          autoComplete="off"
          className={styles["search-bar"]}
          placeholder="Search"
        />
      </div>
    </form>
  );
}

export default SearchInput;
