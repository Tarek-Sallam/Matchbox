// frontend/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDqwQx3DoxmD0lyFbP9YJEQGu1HL6JhGXY",
    authDomain: "matchbox-2c411.firebaseapp.com",
    projectId: "matchbox-2c411",
    storageBucket: "matchbox-2c411.appspot.com",
    messagingSenderId: "740102847056",
    appId: "1:740102847056:web:73ec0dd906772fe83eaf55"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };