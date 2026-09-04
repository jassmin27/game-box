import ReactSelect from "react-select";
import type { SortOption } from "../../types";
import { getSelectStyles } from "../../services/select-styles";
import useGameQueryStore from "../../store";

const sortOptions = [
  { value: "", label: "Relevance" },
  { value: "-added", label: "Date added" },
  { value: "name", label: "Name" },
  { value: "-released", label: "Release date" },
  { value: "-metacritic", label: "Popularity" },
  { value: "-rating", label: "Average rating" },
];

function SortSelector() {
  const selectedSortOrder = useGameQueryStore((s) => s.gameQuery.sortOrder);
  const selectedSortOption =
    sortOptions.find((option) => option.value === selectedSortOrder) ??
    sortOptions[0];

  const setSortOrder = useGameQueryStore((s) => s.setSortOrder);

  return (
    <ReactSelect<SortOption>
      styles={getSelectStyles<SortOption>()}
      value={selectedSortOption}
      onChange={(option) => setSortOrder(option?.value || null)}
      options={sortOptions}
    />
  );
}

export default SortSelector;
