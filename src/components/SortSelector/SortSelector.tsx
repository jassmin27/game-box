import ReactSelect from "react-select";
import { getSelectStyles } from "../../services/select-styles";

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
  selectedSortOrder?: string | null;
}

function SortSelector({ onSelect, selectedSortOrder }: Props) {
  const selectedSortOption =
    sortOptions.find((option) => option.value === selectedSortOrder) ??
    sortOptions[0];

  return (
    <ReactSelect<Option>
      styles={getSelectStyles<Option>()}
      value={selectedSortOption}
      onChange={option => onSelect(option?.value ?? null)}
      options={sortOptions}
    />
  );
}

export default SortSelector;
