// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration 
// Note: Ensure these match the underscore-free names in your GitHub Secrets
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_FIREBASE_APPID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENTID,
};

// Diagnostic Log - This will show "FAILED" in the browser console (F12) if secrets aren't loading
console.log('Firebase Init Check:', import.meta.env.VITE_FIREBASE_PROJECTID || 'FAILED');

// Validation check to prevent initialization with missing data
const requiredKeys = [
  "apiKey",
  "authDomain",
  "projectId",
  "storageBucket",
  "messagingSenderId",
  "appId",
];

const missingKeys = requiredKeys.filter((key) => !firebaseConfig[key]);

// Initialize variables with null to avoid "undefined" reference errors in components
let app = null;
export let db = null;

if (missingKeys.length > 0) {
  console.error(
    "❌ Firebase Critical Error: Missing environment variables:",
    missingKeys.join(", "),
    "\nIf you see this on GitHub Pages, check your deploy.yml and Environment Secrets."
  );
} else {
  try {
    // Only initialize if we have all required keys
    app = initializeApp(firebaseConfig);
    
    // Initialize Analytics only in a browser environment
    if (typeof window !== "undefined") {
      getAnalytics(app);
    }
    
    // Initialize Firestore
    db = getFirestore(app);
    console.log("✅ Firebase & Firestore initialized successfully.");
  } catch (error) {
    console.error("❌ Firebase initialization failed:", error);
  }
}