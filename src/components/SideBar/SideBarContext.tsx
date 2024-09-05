import type { PropsWithChildren } from 'react';
import { createContext, useContext, useState } from 'react';

type SideBarContextType = {
  isSideBarOpen: boolean;
  openSideBar: () => void;
  closeSideBar: () => void;
};
const SideBarContext = createContext<SideBarContextType | null>(null);

export const SideBarProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openSideBar = () => setIsOpen(true);
  const closeSideBar = () => setIsOpen(false);

  return (
    <SideBarContext.Provider
      value={{ isSideBarOpen: isOpen, openSideBar, closeSideBar }}>
      {children}
    </SideBarContext.Provider>
  );
};

export const useSideBar = () => {
  const context = useContext(SideBarContext);
  if (!context) {
    throw new Error('useSideBar must be used within a SideBarProvider');
  }
  return context;
};
