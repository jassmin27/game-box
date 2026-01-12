import { useState } from "react";
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
}

function SortSelector({ onSelect }: Props) {
  const [selectedSortOrder, setSelectedSortOrder] = useState<Option | null>(
    null
  );
  return (
    <ReactSelect<Option>
      styles={getSelectStyles<Option>()}
      value={selectedSortOrder ?? sortOptions[0]}
      onChange={(option) => {
        setSelectedSortOrder(option);
        onSelect(option?.value ?? null);
      }}
      options={sortOptions}
    />
  );
}

export default SortSelector;
