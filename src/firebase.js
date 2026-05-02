// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXrjkVdno7XQl0OzU4RBmxhhcPlgmkLPY",
  authDomain: "atharva-portfolio-c3fbe.firebaseapp.com",
  projectId: "atharva-portfolio-c3fbe",
  storageBucket: "atharva-portfolio-c3fbe.firebasestorage.app",
  messagingSenderId: "604064243531",
  appId: "1:604064243531:web:8183e2288a91806e30d2ce",
  measurementId: "G-CBMPF0RJQ9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore
export const db = getFirestore(app);