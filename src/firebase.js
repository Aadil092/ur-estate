// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ur-estate-87335.firebaseapp.com",
  projectId: "ur-estate-87335",
  storageBucket: "ur-estate-87335.firebasestorage.app",
  messagingSenderId: "556814052315",
  appId: "1:556814052315:web:f4234b11d7e27fba73d5fe"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);