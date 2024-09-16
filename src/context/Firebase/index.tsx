import React, { createContext, ReactNode, Reducer, useEffect, useMemo, useReducer } from 'react';
import { child, DatabaseReference, get } from "firebase/database";
import Logger from 'node-logger-web';
import { DatabaseStructure } from '@Types';
import { dbRef } from '@Firebase';
import { DB_ITERATION_PATH, LS_DB_DATA, LS_DB_ITERATION } from '@Constants/const';


// Define the shape of your context data
interface FirebaseContextData {
  database: {
    ref?: DatabaseReference,
    snap?: DatabaseStructure.DatabaseSnap,
    iteration?: string,
  };
}

// Create a context with an initial value
export const FirebaseContext = createContext<FirebaseContextData | undefined>(undefined);


// Define props for your context provider
interface FirebaseContextProviderProps {
  children: ReactNode; // ReactNode allows any valid React children
}

interface FirebaseContextStateAction {
  type: 'update_db' | 'increment_iteration' | 'update_ref',
  value?: FirebaseContextData["database"]
}
const firebaseContextStateReducer: Reducer<FirebaseContextData["database"], FirebaseContextStateAction> = (prev, action) => {
  switch (action.type) {
    case 'increment_iteration':
      return { ...prev, iteration: action.value?.iteration ?? prev.iteration }
    case 'update_db':
      if (action.value?.snap || prev.snap) localStorage.setItem(LS_DB_DATA, JSON.stringify(action.value?.snap ?? prev.snap))
      return { ...prev, snap: action.value?.snap ?? prev.snap };
    case 'update_ref':
      return { ...prev, ref: action.value?.ref ?? prev.ref };
  }
}

const useFirebase = () => {

  const log = new Logger("Firebase::hook", import.meta.env.DEV);
  const initalState = { ref: dbRef, iteration: localStorage.getItem(LS_DB_ITERATION) ?? undefined }
  const [database, dispatch] = useReducer<Reducer<FirebaseContextData["database"], FirebaseContextStateAction>>(firebaseContextStateReducer, initalState)

  useEffect(() => {
    if (!dbRef) return;

    const savedIteration = localStorage.getItem(LS_DB_ITERATION);
    const updateDatabase = (data: DatabaseStructure.DatabaseSnap) => {
      log.d("Incoming change -> ", data)
      dispatch({ type: 'update_db', value: { snap: data } });
    }

    const fetchData = () => {
      get(dbRef).then((snap) => {
        if (!snap.exists()) return;
        if (database.iteration) localStorage.setItem(LS_DB_ITERATION, database.iteration)
        updateDatabase(snap.val());
      }).catch((err) => {
        log.d("Error gettin db -> ", err);
      })
    }

    if (database.iteration && database.iteration === savedIteration) {
      const savedData = localStorage.getItem(LS_DB_DATA);
      if (savedData && savedData !== undefined && savedData !== '' && savedData !== null) {
        updateDatabase(JSON.parse(savedData))
        return;
      }
    }

    log.d("Old or no data detected. Getting new data from database.")
    fetchData();

  }, [database.iteration])

  useEffect(() => {
    get(child(dbRef, DB_ITERATION_PATH))
      .then((snap) => {
        log.d("Incoming iteration change -> ", snap.val())
        if (initalState.iteration && `${snap.val()}` === initalState.iteration) return;
        log.d(`Getting new data iteration from db (i${initalState.iteration} -> i${snap.val()})`)
        dispatch({ type: 'increment_iteration', value: { iteration: `${snap.val()}` } })
      })
      .catch((err) => {
        log.d("Error gettin db iteration -> ", err);
      })
  }, [])


  return useMemo(() => ({ database }), [database]);
}

export const FirebaseContextProvider: React.FC<FirebaseContextProviderProps> = ({ children }) => {

  const { database } = useFirebase();

  const contextValue: FirebaseContextData = useMemo(() => ({
    database
  }), [database]);

  return <FirebaseContext.Provider value={contextValue}>{children}</FirebaseContext.Provider>;
};
