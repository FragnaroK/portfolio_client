import React, { createContext, ReactNode, useEffect, useMemo, useState } from 'react';
import { initializeApp } from "firebase/app";
import { Analytics, getAnalytics } from "firebase/analytics";
import { DatabaseReference, get, getDatabase, onValue, ref } from "firebase/database";
import Logger from 'node-logger-web';
import { DatabaseSnap } from '@Types/DatabaseTypes';

// Define the shape of your context data
interface FirebaseContextData {
  analytics: Analytics;
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

  const log = new Logger("Firebase", import.meta.env.VITE_DEBUG_MODE);

  const firebaseConfig = {
    apiKey: "AIzaSyASObg06sWoA7wV-v7enka0m8ejvcO275s",
    authDomain: "francocanalejo-fragnarok.firebaseapp.com",
    databaseURL: "https://francocanalejo-fragnarok-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "francocanalejo-fragnarok",
    storageBucket: "francocanalejo-fragnarok.appspot.com",
    messagingSenderId: "960659338948",
    appId: "1:960659338948:web:fc4a315e58e48a3dc8fb91",
    measurementId: "G-N0Y6G89KWH"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const db = getDatabase(app);
  const dbRef = ref(db, `${import.meta.env.VITE_DB_ENDPOINT}`)

  log.d("Firebase instance generated ", app, analytics, db, dbRef);

  return useMemo(() => ({ app, analytics, dbRef }), []);
}

export const FirebaseContextProvider: React.FC<FirebaseContextProviderProps> = ({ children }) => {

  const log = new Logger("FirebaseContext", import.meta.env.VITE_DEBUG_MODE);

  const { analytics, dbRef } = useFirebase();
  const [database, setDatabase] = useState<FirebaseContextData["database"]>({ ref: dbRef })


  const updateDatabase = (data: DatabaseSnap) => {
    log.d("Incoming change -> ", data)
    setDatabase({ ref: dbRef, snap: data });
  }

  useEffect(() => {

    if (!dbRef) return;

    get(dbRef).then((snap) => {
      if (!snap.exists()) return;
      updateDatabase(snap.val());
    }).catch((err) => {
      log.d("Error gettin db -> ", err);
    })

  }, [])

  const contextValue: FirebaseContextData = useMemo(() => ({
    analytics,
    database
  }), [analytics, database]);

  return <FirebaseContext.Provider value={contextValue}>{children}</FirebaseContext.Provider>;
};
