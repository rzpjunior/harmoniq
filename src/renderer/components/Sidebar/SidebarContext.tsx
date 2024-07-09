import React, { createContext, useState, useContext, ReactNode } from 'react';

interface SidebarContextProps {
  isSidebarMinimized: boolean;
  toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error();
  }
  return context;
};

interface SidebarProviderProps {
  children: ReactNode;
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({ children }) => {
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarMinimized((prev) => !prev);
  };

  return (
    <SidebarContext.Provider value={{ isSidebarMinimized, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};
