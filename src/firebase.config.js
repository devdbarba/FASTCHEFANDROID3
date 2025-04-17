import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyBvLAzozKLoeoC1TUbJxN6yDWD61vyQH4U",
  authDomain: "fastchef-f37ed.firebaseapp.com",
  projectId: "fastchef-f37ed",
  storageBucket: "fastchef-f37ed.firebasestorage.app",
  messagingSenderId: "68262428347",
  appId: "1:68262428347:web:d8c4334919c3b21bf9339e",
  measurementId: "G-86B7WERDSR"
};

export const firebase = initializeApp(firebaseConfig);
export const auth = getAuth(firebase);