// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-flashcards-748cf.firebaseapp.com",
  projectId: "ai-flashcards-748cf",
  storageBucket: "ai-flashcards-748cf.appspot.com",
  messagingSenderId: "8219662944",
  appId: "1:8219662944:web:83f085caf27525caf4c105",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default { app, db };
