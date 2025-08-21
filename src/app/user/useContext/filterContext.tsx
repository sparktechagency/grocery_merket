// FilterContext.tsx
import React, { createContext, useState, useContext } from "react";

const FilterContext = createContext<any>(null);

export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState<string[]>([]);

  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = () => useContext(FilterContext);

export default FilterProvider;
