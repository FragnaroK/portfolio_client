import { useContext } from "react";
import { UtilsContext } from ".";

export const useUtilsContext = () => {
    const context = useContext(UtilsContext);
    if (!context) {
      throw new Error('useUtilsContext must be used within a UtilsContextProvider');
    }
    return context;
  };