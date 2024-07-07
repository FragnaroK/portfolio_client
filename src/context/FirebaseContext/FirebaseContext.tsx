import React, { createContext, ReactNode, useEffect, useMemo, useState } from 'react';
import { DatabaseReference, get } from "firebase/database";
import Logger from 'node-logger-web';
import { DatabaseSnap } from '@Types/DatabaseTypes';
import { dbRef } from '@/firebase';

// Define the shape of your context data
interface FirebaseContextData {
  database: {
    ref: DatabaseReference,
    snap?: DatabaseSnap
  };
}

// Create a context with an initial value
export const FirebaseContext = createContext<FirebaseContextData | undefined>(undefined);


// Define props for your context provider
interface FirebaseContextProviderProps {
  children: ReactNode; // ReactNode allows any valid React children
}

const useFirebase = () => {

  const log = new Logger("Firebase", import.meta.env.DEV);
  const [database, setDatabase] = useState<FirebaseContextData["database"]>({ ref: dbRef })

  useEffect(() => {
    if (!dbRef) return;

    const updateDatabase = (data: DatabaseSnap) => {
      log.d("Incoming change -> ", data)
      setDatabase({ ref: dbRef, snap: data });
    }

    get(dbRef).then((snap) => {
      if (!snap.exists()) return;
      updateDatabase(snap.val());
    }).catch((err) => {
      log.d("Error gettin db -> ", err);
    })

  }, [])
  

  return useMemo(() => ({ database }), [database]);
}

export const FirebaseContextProvider: React.FC<FirebaseContextProviderProps> = ({ children }) => {

  // const log = new Logger("FirebaseContext", import.meta.env.DEV);
  const { database } = useFirebase();

  const contextValue: FirebaseContextData = useMemo(() => ({
    database
  }), [database]);

  return <FirebaseContext.Provider value={contextValue}>{children}</FirebaseContext.Provider>;
};
