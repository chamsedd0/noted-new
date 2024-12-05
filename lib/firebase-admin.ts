import "server-only";
import admin, { ServiceAccount } from "firebase-admin";

const serviceAccount = {
  type: "service_account",
  project_id: "firo-f9739",
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY,
  client_email: "firebase-adminsdk-h86s9@firo-f9739.iam.gserviceaccount.com",
  client_id: "106272992932041868757",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-h86s9%40firo-f9739.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount),
  });
}
const db = admin.firestore();
const auth = admin.auth();
const FieldValue = admin.firestore.FieldValue;

const verifyIdToken = async (idToken: string) => {
  try {
    const decodedToken = await auth.verifyIdToken(idToken);
    // Get user data to include account setup status
    const user = await db.collection('users').doc(decodedToken.uid).get();
    const userData = user.data();
    
    return {
      ...decodedToken,
      accountSetup: userData?.accountSetup || null
    };
  } catch {
    throw new Error("Unauthorized");
  }
};

export { auth, db, verifyIdToken, FieldValue };
