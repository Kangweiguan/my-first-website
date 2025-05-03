// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: "my-ai-web-dev-project.firebaseapp.com",
    projectId: "my-ai-web-dev-project",
    storageBucket: "my-ai-web-dev-project.firebasestorage.app",
    messagingSenderId: "624392705284",
    appId: "1:624392705284:web:d175c1e1a9dd0991d4ac51"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Firebase Authentication
const auth = getAuth(app);

export { db, auth };