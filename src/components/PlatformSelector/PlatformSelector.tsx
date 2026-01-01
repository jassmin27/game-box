import { useState } from "react";
import ReactSelect from "react-select";
import usePlatforms from "../../hooks/usePlatforms";
import { getSelectStyles } from "../../services/select-styles";

interface Option {
  value: number;
  label: string;
}

interface Props {
  onSelect: (platformId: number | null) => void;
}

function PlatformSelector({ onSelect }: Props) {
  const [selectedPlatform, setSelectedPlatform] = useState<Option | null>(null);
  const { data: platforms, error } = usePlatforms();

  const options = platforms.map((platform) => {
    return {
      value: platform.id,
      label: platform.name,
    };
  });

  if (error) return null;

  return (
    <ReactSelect<Option>
      styles={getSelectStyles<Option>()}
      value={selectedPlatform}
      onChange={(option) => {
        setSelectedPlatform(option);
        onSelect(option?.value ?? null);
      }}
      placeholder="Platforms"
      options={options}
      isClearable
    />
  );
}

export default PlatformSelector;
