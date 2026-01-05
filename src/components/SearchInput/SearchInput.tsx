import { IoSearchOutline } from "react-icons/io5";
import styles from "./SearchInput.module.css";
import { useRef } from "react";

interface Props {
  onSearch: (searchText: string) => void;
}

function SearchInput({ onSearch }: Props) {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSearch(ref.current?.value ?? '');
      }}
    >
      <div className={styles["search-group"]}>
        <IoSearchOutline className={styles["search-icon"]} />
        <input
          ref={ref}
          name="search"
          type="text"
          autoComplete="off"
          className={styles["search-bar"]}
          placeholder="Search games"
        />
      </div>
    </form>
  );
}

export default SearchInput;
