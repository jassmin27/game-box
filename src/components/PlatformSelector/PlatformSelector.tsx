import ReactSelect from "react-select";
import usePlatforms from "../../hooks/usePlatforms";
import { getSelectStyles } from "../../services/select-styles";
import type { Platform } from "../../types";

interface Option {
  value: number;
  label: string;
  slug: string;
}

interface Props {
  onSelect: (platform: Platform | null) => void;
  selectedPlatform?: Platform | null;
}

function PlatformSelector({ onSelect, selectedPlatform }: Props) {
  const { data: platforms, error } = usePlatforms();

  const options = platforms?.map((platform) => {
    return {
      value: platform.id,
      label: platform.name,
      slug: platform.slug,
    };
  }) ?? [];

  const selectedPlatformOption = options.find(option => option.value === selectedPlatform?.id) ?? null;

  if (error) return null;

  return (
    <ReactSelect<Option>
      styles={getSelectStyles<Option>()}
      value={selectedPlatformOption}
      onChange={(option) => {
        const selectedPlatform = option ? {
          id: option.value,
          name: option.label,
          slug: option.slug,
        } : null;
        onSelect(selectedPlatform);
      }}
      placeholder="Platforms"
      options={options}
      isClearable
    />
  );
}

export default PlatformSelector;
