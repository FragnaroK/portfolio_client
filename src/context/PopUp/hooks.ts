import { useContext } from "react";
import { PopUpContext } from ".";

export const usePopUpContext = () => {
    const context = useContext(PopUpContext);
    if (!context) {
      throw new Error('usePopUpContext must be used within a PopUpContextProvider');
    }
    return context;
  };
  