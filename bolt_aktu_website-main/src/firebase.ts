import { initializeApp } from 'firebase/app';
import { getAuth/*, connectAuthEmulator*/ } from 'firebase/auth';
import { getFirestore/*, connectFirestoreEmulator*/ } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

/**
 * Firebase configuration object constructed from environment variables
 * All variables must be prefixed with VITE_ to be accessible in the client
 */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

/**
 * Validates that all required Firebase configuration variables are present
 * Throws an error if any required configuration is missing or empty
 */
const validateFirebaseConfig = () => {
  const requiredFields = [
    'VITE_FIREBASE_API_KEY',
    'VITE_FIREBASE_AUTH_DOMAIN',
    'VITE_FIREBASE_PROJECT_ID',
    'VITE_FIREBASE_STORAGE_BUCKET',
    'VITE_FIREBASE_MESSAGING_SENDER_ID',
    'VITE_FIREBASE_APP_ID'
  ];

  const missingFields = requiredFields.filter(field => {
    const value = import.meta.env[field];
    return !value || value.trim() === '';
  });
  
  if (missingFields.length > 0) {
    throw new Error(
      `Missing or empty Firebase configuration: ${missingFields.join(', ')}`
    );
  }

  // Log configuration status for debugging (without exposing sensitive values)
  console.log('Firebase configuration validated successfully');
  console.log('Project ID:', import.meta.env.VITE_FIREBASE_PROJECT_ID);
  console.log('Auth Domain:', import.meta.env.VITE_FIREBASE_AUTH_DOMAIN);
};

// Validate configuration before initializing Firebase
validateFirebaseConfig();

/**
 * Initialize Firebase app with configuration
 */
const app = initializeApp(firebaseConfig);

/**
 * Initialize Firebase Authentication
 * This will be used throughout the application for auth operations
 */
export const auth = getAuth(app);

/**
 * Initialize Firestore
 */
export const db = getFirestore(app);

/**
 * Initialize Firebase Storage
 */
export const storage = getStorage(app);

/**
 * Connect to Firebase emulators in development mode
 * Disabled for now (commented out)
 */
// if (import.meta.env.DEV) {
//   try {
//     connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
//     connectFirestoreEmulator(db, 'localhost', 8080);
//   } catch (error) {
//     console.log('Firebase emulators already connected or not available');
//   }
// }

/**
 * Export the initialized Firebase app for potential future use
 */
export default app;

