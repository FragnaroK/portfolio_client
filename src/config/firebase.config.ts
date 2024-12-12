import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";
import { getStorage } from "firebase/storage";
import { una_forma, matata, de_ser } from "../utils/helpers";

// This is just a playful example and not meant to be secure. 
// No worries though, as my Firebase rules and permissions are properly configured.
// Just make sure to secure yours...
// ---
// FYI this is from a disney song: https://www.youtube.com/watch?v=sfXPGuZ68HM&ab_channel=DisneyStudiosLA
const hakuna = matata(una_forma(de_ser));

// Initialize Firebase
const fireApp = initializeApp(hakuna);
const db = getDatabase(fireApp);
const storage = getStorage(fireApp);
const dbRef = ref(db, `${import.meta.env.VITE_DB_ENDPOINT}/${import.meta.env.VITE_DB_VERSION}`);


export { fireApp, db, dbRef, storage }