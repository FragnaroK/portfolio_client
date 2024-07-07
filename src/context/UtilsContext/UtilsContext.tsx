import Logger from 'node-logger-web';
import './UtilsContext.css';
import React, { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';

interface UtilsContextData {
   currentSection: string;
   isOnTop: boolean;
   setSection: (section: string) => void
}

export const UtilsContext = createContext<UtilsContextData | undefined>(undefined);

interface UtilsContextProviderProps {
  children: ReactNode; 
}

export const UtilsContextProvider: React.FC<UtilsContextProviderProps> = ({ children }) => {
  
  const log = new Logger("UtilsContext", import.meta.env.DEV);
  const [currentSection, setCurrentSection] = useState<string>("Introduction");
  const [isOnTop, setIsOnTop] = useState<boolean>(true);

  const onScroll = useCallback(() => {
    if (document.documentElement.scrollTop < 150) {
      setIsOnTop(true);
    } else {
      setIsOnTop(false);
    }
  }, [])

  const setSection = useCallback((section: string) => {
    if (currentSection === section) return;
    log.d(`Setting section to ${section}`)
    setCurrentSection((prevSection) => prevSection !== section ? section : prevSection)
  }, [currentSection])

  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });

    document.addEventListener('scroll', onScroll);

    return () => {
      document.removeEventListener('scroll', onScroll);
    }
  }, [onScroll])

  const contextValue = useMemo(() => ({
    currentSection,
    isOnTop,
    setSection
  }), [isOnTop, currentSection])

  return <UtilsContext.Provider value={contextValue}>
    <div className="utilsWrapper">
    {children}
    </div>
  </UtilsContext.Provider>;
};
