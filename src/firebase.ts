import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";
import { getStorage } from "firebase/storage";
import { una_forma, matata, de_ser } from "./utils/helpers";


const hakuna = matata(una_forma(de_ser));

// Initialize Firebase
const fireApp = initializeApp(hakuna);
const db = getDatabase(fireApp);
const storage = getStorage(fireApp);
const dbRef = ref(db, `${import.meta.env.VITE_DB_ENDPOINT}/${import.meta.env.VITE_DB_VERSION}`);


export { fireApp, db, dbRef, storage }