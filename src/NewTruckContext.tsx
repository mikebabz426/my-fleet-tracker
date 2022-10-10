import * as React from "react";
import { useState, createContext, useContext } from "react";

const NewTruckContext = createContext<
  | {
      newTruck: boolean;
      setNewTruck: React.Dispatch<React.SetStateAction<boolean>>;
    }
  | undefined
>(undefined);

export const useNewTruckContext = () => {
  const context = useContext(NewTruckContext);
  if (context === undefined) {
    throw new Error(
      "useAuthenticationContext must be used within a NewTruckContext Provider"
    );
  }
  return context;
};

export const NewTruckProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [newTruck, setNewTruck] = useState(false);

  return (
    <NewTruckContext.Provider value={{ newTruck, setNewTruck }}>
      {children}
    </NewTruckContext.Provider>
  );
};
