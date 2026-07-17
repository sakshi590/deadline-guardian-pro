import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Added this missing import
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCOukQ6WwT2gYIkmatuju-ZumBWcWdvlBs",
  authDomain: "deadline-guardian-pro.firebaseapp.com",
  projectId: "deadline-guardian-pro",
  storageBucket: "deadline-guardian-pro.firebasestorage.app",
  messagingSenderId: "656334817380",
  appId: "1:656334817380:web:f89c0cd3314aed6c58f771",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize and export services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
