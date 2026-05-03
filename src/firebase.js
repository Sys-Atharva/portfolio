// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_FIREBASE_APPID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENTID,
};

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

// Initialize variables outside the scope
let app;
let db = null; // Initialize as null to avoid "undefined" reference errors

if (missingKeys.length > 0) {
  console.error(
    "❌ Firebase Critical Error: Missing environment variables:",
    missingKeys.join(", "),
    "\nCheck your GitHub Secrets and .env file names."
  );
} else {
  // Only initialize if we have all required keys
  try {
    app = initializeApp(firebaseConfig);
    if (typeof window !== "undefined") {
      getAnalytics(app);
    }
    db = getFirestore(app);
    console.log("✅ Firebase & Firestore initialized successfully.");
  } catch (error) {
    console.error("❌ Firebase initialization failed:", error);
  }
}

// Export db so other components can import it
export { db };