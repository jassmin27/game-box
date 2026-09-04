import ReactSelect from "react-select";
import usePlatforms from "../../hooks/usePlatforms";
import type { PlatformOption } from "../../types";
import { getSelectStyles } from "../../services/select-styles";
import useGameQueryStore from "../../store";

function PlatformSelector() {
  const { data, error } = usePlatforms();
  const options = data?.results.map((platform) => {
    return {
      value: platform.id,
      label: platform.name,
      slug: platform.slug,
    };
  });

  const selectedPlatformId = useGameQueryStore((s) => s.gameQuery.platformId);
  const selectedPlatform = options?.find(
    (option) => option.value === selectedPlatformId,
  );

  const setPlatformId = useGameQueryStore((s) => s.setPlatformId);

  if (error) return null;

  return (
    <ReactSelect<PlatformOption>
      styles={getSelectStyles<PlatformOption>()}
      value={selectedPlatform ?? null}
      onChange={(option) => setPlatformId(option?.value ?? null)}
      placeholder="Platforms"
      options={options}
      isClearable
    />
  );
}

export default PlatformSelector;
