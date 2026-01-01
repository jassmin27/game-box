import { useState } from "react";
import ReactSelect from "react-select";
import styles from "./SortSelector.module.css";

const sortOptions = [
  { value: "", label: "Relevance" },
  { value: "-added", label: "Date added" },
  { value: "name", label: "Name" },
  { value: "-released", label: "Release date" },
  { value: "-metacritic", label: "Popularity" },
  { value: "-rating", label: "Average rating" },
];

interface Option {
  value: string;
  label: string;
}
interface Props {
  onSelect: (sortOrder: string | null) => void;
}

function SortSelector({ onSelect }: Props) {
  const [selectedSortOrder, setSelectedSortOrder] = useState<Option | null>(
    null
  );
  return (
    <div className={styles.sortWrapper}>
      <span>Order by:</span>
      <ReactSelect<Option>
        styles={{
          control: (base) => ({
            ...base,
            backgroundColor: "var(--select-bg)",
          }),
          singleValue: (base) => ({
            ...base,
            color: "var(--text-color)",
          }),
          placeholder: (base) => ({
            ...base,
            color: "var(--text-color)",
          }),
          menu: (base) => ({
            ...base,
            backgroundColor: "var(--select-bg)",
          }),
          option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected
              ? "var(--select-option-active)"
              : state.isFocused
              ? "var(--select-option-hover)"
              : "transparent",
            color: "var(--select-text)",
            cursor: "pointer",
            ":active": {
              backgroundColor: "var(--select-option-active)",
            },
          }),
        }}
        value={selectedSortOrder ?? sortOptions[0]}
        onChange={(option) => {
          setSelectedSortOrder(option);
          onSelect(option?.value ?? null);
        }}
        options={sortOptions}
      />
    </div>
  );
}

export default SortSelector;
