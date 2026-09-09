import { IoSearchOutline } from "react-icons/io5";
import styles from "./SearchInput.module.css";
import { useRef } from "react";
import useGameQueryStore from "../../store";
import { useNavigate, useSearchParams } from "react-router";

function SearchInput() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const ref = useRef<HTMLInputElement>(null);

  const resetGameQuery = useGameQueryStore((s) => s.resetGameQuery);

  const searchText = searchParams.get("search") ?? "";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const search = ref.current?.value.trim() ?? "";
        resetGameQuery();
        navigate(search ? `/?search=${encodeURIComponent(search)}` : "/");
      }}
    >
      <div className={styles["search-group"]}>
        <IoSearchOutline className={styles["search-icon"]} />
        <input
          key={searchText}
          ref={ref}
          name="search"
          type="search"
          defaultValue={searchText}
          autoComplete="off"
          className={styles["search-bar"]}
          placeholder="Search"
          onChange={(e) => {
            if (e.target.value === "") {
              resetGameQuery();
              navigate("/");
            }
          }}
        />
      </div>
    </form>
  );
}

export default SearchInput;
