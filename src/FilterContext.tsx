import * as React from "react";
import { useState, createContext, Dispatch, SetStateAction } from "react";

const initialState = {
  team: "All",
  day: "All",
};

type ContextType = { team: string; day: string };

export const FilterContext = createContext<
  [ContextType, Dispatch<SetStateAction<ContextType>>] | undefined
>(undefined);

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [filters, setFilters] = useState(initialState);

  return (
    <FilterContext.Provider value={[filters, setFilters]}>
      {children}
    </FilterContext.Provider>
  );
};
