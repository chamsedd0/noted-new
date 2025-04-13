import { initializeApp, getApps } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLNjp0w2PesKAU1cxkxqYA2p2f0gDjKf0",
  authDomain: "smart-notes-ai.firebaseapp.com",
  projectId: "smart-notes-ai",
  storageBucket: "smart-notes-ai.firebasestorage.app",
  messagingSenderId: "543408347905",
  appId: "1:543408347905:web:9e114c073a2cb85bb99900",
  measurementId: "G-Y708KB7KS5"
};

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app);
// Use local persistence (survives browser restart)
setPersistence(auth, browserLocalPersistence);
const googleProvider = new GoogleAuthProvider();

// Auth functions
export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return await result.user.getIdToken();
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
}


export async function signOutUser() {
  return signOut(auth);
}

export { auth, googleProvider };
