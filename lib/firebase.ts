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
  apiKey: "AIzaSyC8lo3amCw3tbIF4ZDte88wr0lT_EKncy4",
  authDomain: "firo-f9739.firebaseapp.com",
  projectId: "firo-f9739",
  storageBucket: "firo-f9739.firebasestorage.app",
  messagingSenderId: "687041022206",
  appId: "1:687041022206:web:34938743dc517d9bdbfdaf",
  measurementId: "G-0T47HFHQEB",
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
