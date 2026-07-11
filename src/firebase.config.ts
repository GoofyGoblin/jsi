import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBfMCC48ZWYZAQFa5Y7vKsaON9OaNlhNDE",
  authDomain: "dotfiles-configurator.firebaseapp.com",
  projectId: "dotfiles-configurator",
  storageBucket: "dotfiles-configurator.firebasestorage.app",
  messagingSenderId: "730855020520",
  appId: "1:730855020520:web:a18330fb3cabaf5fa9b65d",
  measurementId: "G-V639YDYRS8",
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);

console.log("Firebase Initialized", app.name);
