import { useState, type ReactNode } from "react";
import { DataModeContext, type DataMode } from "./DataModeContext";

export function DataModeProvider({ children }: { children: ReactNode }) {
  const [dataMode, setDataMode] = useState<DataMode>("live");

  return (
    <DataModeContext.Provider value={{ dataMode, setDataMode }}>
      {children}
    </DataModeContext.Provider>
  );
}
