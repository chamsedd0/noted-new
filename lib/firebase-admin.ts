import "server-only";
import admin, { ServiceAccount } from "firebase-admin";



const serviceAccount = {
  "type": "service_account",
  "project_id": "firo-f9739",
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY,
  "client_email": "firebase-adminsdk-h86s9@firo-f9739.iam.gserviceaccount.com",
  "client_id": "106272992932041868757",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-h86s9%40firo-f9739.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}


if (!admin.apps.length) {
  
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount),
  });
}
const db = admin.firestore();
const auth = admin.auth();



export { auth, db };
