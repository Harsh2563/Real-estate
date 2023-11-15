// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-ce685.firebaseapp.com",
  projectId: "real-estate-ce685",
  storageBucket: "real-estate-ce685.appspot.com",
  messagingSenderId: "555932937666",
  appId: "1:555932937666:web:2e5b54eb436d3ac1f57a5b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
