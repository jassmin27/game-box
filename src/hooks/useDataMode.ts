import { useContext } from "react";
import { DataModeContext } from "../contexts/DataModeContext";

export function useDataMode() {
  const context = useContext(DataModeContext);

  if (!context) {
    throw new Error("useDataMode must be used within DataModeProvider");
  }

  return context;
}
