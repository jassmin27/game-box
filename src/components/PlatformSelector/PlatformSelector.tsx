import ReactSelect from "react-select";
import usePlatforms from "../../hooks/usePlatforms";
import type { SelectOption } from "../../types";
import { getSelectStyles } from "../../services/select-styles";

interface Props {
  onSelect: (platformId: number | null) => void;
  selectedPlatformId: number | null;
}

function PlatformSelector({ onSelect, selectedPlatformId }: Props) {
  const { data, error } = usePlatforms();
  const options = data?.results.map((platform) => {
    return {
      value: platform.id,
      label: platform.name,
      slug: platform.slug,
    };
  });

  if (error) return null;

  return (
    <ReactSelect<SelectOption>
      styles={getSelectStyles<SelectOption>()}
      value={options?.find(option => option.value === selectedPlatformId)}
      onChange={(option) => {
        onSelect(option?.value ?? null);
      }}
      placeholder="Platforms"
      options={options}
      isClearable
    />
  );
}

export default PlatformSelector;
