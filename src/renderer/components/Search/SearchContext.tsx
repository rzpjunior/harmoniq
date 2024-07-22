import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SearchContextProps {
  isSearchActive: boolean;
  setIsSearchActive: (value: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error();
  }
  return context;
};

interface SearchProviderProps {
  children: ReactNode;
}

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SearchContext.Provider value={{ isSearchActive, setIsSearchActive, searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
};
