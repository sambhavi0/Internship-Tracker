import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAKOfylQxyErfcGO61DEJ4xUNTrCFm0AQY",
  authDomain: "internship-tracker-c6477.firebaseapp.com",
  projectId: "internship-tracker-c6477",
  storageBucket: "internship-tracker-c6477.firebasestorage.app",
  messagingSenderId: "548693213999",
  appId: "1:548693213999:web:f0801ae48fb8360c0957da"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
