import { initializeApp } from "firebase/app";
import "firebase/compat/firestore"; // Import Firestore compat
import "firebase/compat/auth"; // Import Auth compat
import firebase from "firebase/compat/app"; // Import the compat app

const firebaseConfig = {
  apiKey: "AIzaSyDKe7qc45KbQSJ7Gte8-OkyLQNA-k4tmik",
  authDomain: "clone-c20d2.firebaseapp.com",
  projectId: "clone-c20d2",
  storageBucket: "clone-c20d2.firebasestorage.app",
  messagingSenderId: "208209363530",
  appId: "1:208209363530:web:e7bbfa7dc74ba52f981cb3",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig); // Use firebase.initializeApp
export const auth = firebase.auth(); // Export auth
export const db = firebase.firestore(); // Export db
export default app;
