import { useState } from "react";
import ReactSelect from "react-select";
import usePlatforms from "../../../hooks/usePlatforms";

interface Option {
  value: number;
  label: string;
}

interface Props {
  onSelect: (platformId: number | null) => void;
}

function PlatformSelector({ onSelect }: Props) {
  const [selectedPlatform, setSelectedPlatform] = useState<Option | null>(null);
  const { platforms, error } = usePlatforms();

  const options = platforms.map((platform) => {
    return {
      value: platform.id,
      label: platform.name,
    };
  });

  if (error) return null;

  return (
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
