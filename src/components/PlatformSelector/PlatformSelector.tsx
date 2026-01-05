import { useState } from "react";
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
}

function PlatformSelector({ onSelect }: Props) {
  const [selectedPlatform, setSelectedPlatform] = useState<Option | null>(null);
  const { data: platforms, error } = usePlatforms();

  const options = platforms.map((platform) => {
    return {
      value: platform.id,
      label: platform.name,
      slug: platform.slug,
    };
  });

  if (error) return null;

  return (
    <ReactSelect<Option>
      styles={getSelectStyles<Option>()}
      value={selectedPlatform}
      onChange={(option) => {
        setSelectedPlatform(option);
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
