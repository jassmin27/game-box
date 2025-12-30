import ReactSelect from "react-select";

const sortOptions = [
  { value: "", label: "Relevance" },
  { value: "-added", label: "Date added" },
  { value: "name", label: "Name" },
  { value: "-released", label: "Release date" },
  { value: "-metacritic", label: "Popularity" },
  { value: "-rating", label: "Average rating" },
];

function SortSelector() {
  return (
    <ReactSelect
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
      placeholder="Order by: Relevance"
      options={sortOptions}
      isClearable
    />
  );
}

export default SortSelector;
