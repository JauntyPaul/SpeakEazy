// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCRGzmRt51CZf690KR_aOvoQHROfGPYcsg",
  authDomain: "speakeazy-eee78.firebaseapp.com",
  projectId: "speakeazy-eee78",
  storageBucket: "speakeazy-eee78.firebasestorage.app",
  messagingSenderId: "1003136291382",
  appId: "1:1003136291382:web:53f0039b0f510c09257e97",
  measurementId: "G-KRK3G8QW36"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
