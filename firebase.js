import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: " ",
  authDomain: "internship-tracker-c6477.firebaseapp.com",
  projectId: "internship-tracker-c6477",
  storageBucket: "internship-tracker-c6477.firebasestorage.app",
  messagingSenderId: " ",
  appId: " "
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
