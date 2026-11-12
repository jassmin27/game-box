import { createContext } from "react";

export type DataMode = "live" | "demo";

export interface DataModeContextType {
  dataMode: DataMode;
  setDataMode: (mode: DataMode) => void;
}

export const DataModeContext = createContext<DataModeContextType | null>(null);
