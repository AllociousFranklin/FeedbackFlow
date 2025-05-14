// @ts-ignore
// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDPv3F_XRAtoP9fR8pB5jdmcWuQgO7mQjk",
  authDomain: "feedbackflow-kbixj.firebaseapp.com",
  projectId: "feedbackflow-kbixj",
  storageBucket: "feedbackflow-kbixj.firebasestorage.app",
  messagingSenderId: "141375732408",
  appId: "1:141375732408:web:9e62c486a292b2a6e0524d"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
