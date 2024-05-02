import { useContext } from "react";
import { FirebaseContext } from "./FirebaseContext";

export const useFirebaseContext = () => {
    const context = useContext(FirebaseContext);
    if (!context) {
      throw new Error('useFirebaseContext must be used within a FirebaseContextProvider');
    }
    return context;
  };