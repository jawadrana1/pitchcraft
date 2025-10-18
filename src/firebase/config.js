// src/firebase/config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: "pitchcraft.firebaseapp.com",
//   projectId: "pitchcraft",
//   storageBucket: "pitchcraft.appspot.com",
//   messagingSenderId: "YOUR_ID",
//   appId: "YOUR_APP_ID",
// };

const firebaseConfig = {
  apiKey: "AIzaSyCP0UC5y8olTvwa7sYvmaPGX4HAHkaFTYo",
  authDomain: "pitchcraft-a62cc.firebaseapp.com",
  projectId: "pitchcraft-a62cc",
  storageBucket: "pitchcraft-a62cc.firebasestorage.app",
  messagingSenderId: "518684976009",
  appId: "1:518684976009:web:e9e64b51fe12787576f758"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
