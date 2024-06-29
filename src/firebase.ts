import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";
import Logger from "node-logger-web";

const log = new Logger("Firebase", import.meta.env.VITE_DEBUG_MODE);

const firebaseConfig = {
    apiKey: import.meta.env.VITE_DB_API_KEY,
    authDomain: "francocanalejo-fragnarok.firebaseapp.com",
    databaseURL: "https://francocanalejo-fragnarok-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "francocanalejo-fragnarok",
    storageBucket: "francocanalejo-fragnarok.appspot.com",
    messagingSenderId: "960659338948",
    appId: "1:960659338948:web:fc4a315e58e48a3dc8fb91",
    measurementId: "G-N0Y6G89KWH"
};

// Initialize Firebase
const fireApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(fireApp);
const db = getDatabase(fireApp);
const dbRef = ref(db, `${import.meta.env.VITE_DB_ENDPOINT}`);


    export { fireApp, analytics, db, dbRef }