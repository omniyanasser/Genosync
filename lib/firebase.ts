import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDo2R40lS-XPat0a9139OD1z90tDdYBGVI",
  authDomain: "genosync-app.firebaseapp.com",
  projectId: "genosync-app",
  storageBucket: "genosync-app.firebasestorage.app",
  messagingSenderId: "795275191707",
  appId: "1:795275191707:web:b7722ab965a461bf322d3e",
  measurementId: "G-Q8H0JP6DLB"
};


const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();


const db = getFirestore(app);

export { db };