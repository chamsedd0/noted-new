import "server-only";
import admin, { ServiceAccount } from "firebase-admin";

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  try {
    // Use environment variables for credentials
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY ? 
      process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') : undefined;

    console.log("Initializing Firebase Admin with project:", projectId);

    admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        clientEmail,
        privateKey,
      } as ServiceAccount),
    });
    
    console.log("Firebase Admin initialized successfully");
  } catch (error) {
    console.error("Firebase admin initialization error", error);
    throw error; // Rethrow to make issues visible
  }
}

const db = admin.firestore();
const auth = admin.auth();
const FieldValue = admin.firestore.FieldValue;

export { auth, db, FieldValue };
