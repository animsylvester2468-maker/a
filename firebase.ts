// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqHKbmKKh1d26jxtT77tzIf2GEm5A09mo",
  authDomain: "quantum-gold-security.firebaseapp.com",
  // databaseURL is for the Realtime Database, not Firestore. Removing it to avoid potential conflicts.
  // databaseURL: "https://quantum-gold-security-default-rtdb.firebaseio.com",
  projectId: "quantum-gold-security",
  storageBucket: "quantum-gold-security.firebasestorage.app",
  messagingSenderId: "736734723886",
  appId: "1:736734723886:web:87baa5ffbfafc83f4b84bf",
  measurementId: "G-C8QH6Y39TH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
