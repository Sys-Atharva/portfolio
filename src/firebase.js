// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const getFirebaseEnv = (underscoreName, noUnderscoreName) =>
  import.meta.env[underscoreName] ?? import.meta.env[noUnderscoreName];

const rawFirebaseConfig = {
  apiKey: getFirebaseEnv("VITE_FIREBASE_API_KEY", "VITE_FIREBASE_APIKEY"),
  authDomain: getFirebaseEnv("VITE_FIREBASE_AUTH_DOMAIN", "VITE_FIREBASE_AUTHDOMAIN"),
  projectId: getFirebaseEnv("VITE_FIREBASE_PROJECT_ID", "VITE_FIREBASE_PROJECTID"),
  storageBucket: getFirebaseEnv("VITE_FIREBASE_STORAGE_BUCKET", "VITE_FIREBASE_STORAGEBUCKET"),
  messagingSenderId: getFirebaseEnv("VITE_FIREBASE_MESSAGING_SENDER_ID", "VITE_FIREBASE_MESSAGINGSENDERID"),
  appId: getFirebaseEnv("VITE_FIREBASE_APP_ID", "VITE_FIREBASE_APPID"),
  measurementId: getFirebaseEnv("VITE_FIREBASE_MEASUREMENT_ID", "VITE_FIREBASE_MEASUREMENTID"),
};

const requiredKeys = [
  "apiKey",
  "authDomain",
  "projectId",
  "storageBucket",
  "messagingSenderId",
  "appId",
];

const formatEnvNames = (key) =>
  [`VITE_FIREBASE_${key.toUpperCase()}`, `VITE_FIREBASE_${key.toUpperCase().replace(/_/g, "")}`];

const missingKeys = requiredKeys.filter((key) => !rawFirebaseConfig[key]);
if (missingKeys.length > 0) {
  console.error(
    "Firebase configuration is missing environment variables. Define one of each of the following:",
    missingKeys
      .map((key) => formatEnvNames(key).join(" or "))
      .join(", "),
    "\nMake sure these variables are defined in .env and in GitHub Secrets."
  );
}

const firebaseConfig = Object.fromEntries(
  Object.entries(rawFirebaseConfig).map(([key, value]) => [
    key,
    value ?? `MISSING_${key.toUpperCase()}`,
  ])
);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore
export const db = getFirestore(app);