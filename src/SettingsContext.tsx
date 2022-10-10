import * as React from "react";
import { useState, createContext, useContext } from "react";

const SettingsContext = createContext<
  | {
      settings: boolean;
      setSettings: React.Dispatch<React.SetStateAction<boolean>>;
    }
  | undefined
>(undefined);

export const useSettingsContext = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error(
      "useSettingsContext must be used within a SettingsContext Provider"
    );
  }
  return context;
};

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [settings, setSettings] = useState(false);

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};
