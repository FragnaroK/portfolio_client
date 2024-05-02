import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of your context data
interface COMPONENT_NAMEData {
  // Define your context properties here
}

// Create a context with an initial value
const COMPONENT_NAME = createContext<COMPONENT_NAMEData | undefined>(undefined);

// Create a custom hook to easily access the context
export const useCOMPONENT_NAME = () => {
  const context = useContext(COMPONENT_NAME);
  if (!context) {
    throw new Error('useCOMPONENT_NAME must be used within a COMPONENT_NAMEProvider');
  }
  return context;
};

// Define props for your context provider
interface COMPONENT_NAMEProviderProps {
  children: ReactNode; // ReactNode allows any valid React children
}

// Define your context provider component
export const COMPONENT_NAMEProvider: React.FC<COMPONENT_NAMEProviderProps> = ({ children }) => {
  // Define your state and any methods/functions needed

  const [contextData, setContextData] = useState<COMPONENT_NAMEData>({
    // Initialize your context data here
  });

  // Define any functions to update context data

  const updateContextData = (newData: Partial<COMPONENT_NAMEData>) => {
    setContextData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  // Pass the context value to provider
  const contextValue: COMPONENT_NAMEData = {
    // Pass your state, methods, and any other data needed through context value
  };

  return <COMPONENT_NAME.Provider value={contextValue}>{children}</COMPONENT_NAME.Provider>;
};
