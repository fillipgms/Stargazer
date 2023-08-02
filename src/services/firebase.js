import { initializeApp } from "firebase/app";
import { doc, setDoc, getFirestore, getDoc } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "stargazer-ef227.firebaseapp.com",
    projectId: "stargazer-ef227",
    storageBucket: "stargazer-ef227.appspot.com",
    messagingSenderId: "1012246247499",
    appId: "1:1012246247499:web:58c3cf24dcf6b8ecab75ce",
    measurementId: "G-2TFJ8TELTH",
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
