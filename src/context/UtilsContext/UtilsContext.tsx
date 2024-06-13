import Logger from 'node-logger-web';
import React, { createContext, ReactNode, useMemo, useState } from 'react';

interface UtilsContextData {
   currentSection: string;
   setSection: (section: string) => void
}

export const UtilsContext = createContext<UtilsContextData | undefined>(undefined);

interface UtilsContextProviderProps {
  children: ReactNode; 
}

export const UtilsContextProvider: React.FC<UtilsContextProviderProps> = ({ children }) => {
  
  const log = new Logger("UtilsContext", import.meta.env.VITE_DEBUG_MODE);
  const [currentSection, setCurrentSection] = useState<string>("Introduction");

  const setSection = (section: string) => {
    log.d(`Setting section to ${section}`)
    setCurrentSection((prevSection) => prevSection != section ? section : prevSection)
  }
  

  const contextValue = useMemo(() => ({
    currentSection,
    setSection
  }), [currentSection])

  return <UtilsContext.Provider value={contextValue}>{children}</UtilsContext.Provider>;
};
