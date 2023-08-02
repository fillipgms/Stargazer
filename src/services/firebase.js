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

export const createUserDocument = async (user, additionalData) => {
    if (!user || !user.uid) {
        console.log("Invalid user object or missing UID.");
        return;
    }

    if (
        !additionalData ||
        !additionalData.displayName ||
        additionalData.isAdmin === undefined
    ) {
        console.log(
            "Invalid additional data or missing displayName or isAdmin."
        );
        return;
    }

    try {
        const db = getFirestore(app);
        const userRef = doc(db, "usuarios", user.uid);
        console.log("userRef:", userRef);

        const snapshot = await getDoc(userRef);
        console.log("snapshot.exists:", snapshot.exists());

        if (!snapshot.exists()) {
            const { email } = user;
            const { displayName, isAdmin } = additionalData;

            await setDoc(userRef, {
                displayName: displayName,
                email: email,
                isAdmin: isAdmin,
            });

            console.log("User document created successfully!");
        } else {
            console.log("User document already exists.");
        }
    } catch (error) {
        console.log("Error in creating user document:", error);
    }
};
