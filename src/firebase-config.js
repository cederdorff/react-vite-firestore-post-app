import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

// firebaseConfig object copied from project in Firebase Console
const firebaseConfig = {
    apiKey: "AIzaSyBgjTep383GcPB_9wjl5-CkpKas6_g1gaA",
    authDomain: "race-post-app.firebaseapp.com",
    projectId: "race-post-app",
    storageBucket: "race-post-app.appspot.com",
    messagingSenderId: "15104463620",
    appId: "1:15104463620:web:1ab034b7a6cab7c3ba3651"
};
const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);

export const usersRef = collection(db, "users"); // reference to users collection i firestore
export const postsRef = collection(db, "posts"); // reference to posts collection i firestore
