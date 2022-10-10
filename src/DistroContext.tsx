import * as React from "react";
import { useState, createContext, useContext } from "react";

const DistroContext = createContext<
  | {
      distro: boolean;
      setDistro: React.Dispatch<React.SetStateAction<boolean>>;
    }
  | undefined
>(undefined);

export const useDistroContext = () => {
  const context = useContext(DistroContext);
  if (context === undefined) {
    throw new Error(
      "useDistroContext must be used within a DistroContext Provider"
    );
  }
  return context;
};

export const DistroProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [distro, setDistro] = useState(false);

  return (
    <DistroContext.Provider value={{ distro, setDistro }}>
      {children}
    </DistroContext.Provider>
  );
};
