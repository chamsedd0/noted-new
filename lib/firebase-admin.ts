import "server-only";
import admin, { ServiceAccount } from "firebase-admin";
import serviceAccount from "./serverAccount.json";



if (!admin.apps.length) {
  
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount),
  });
}
const db = admin.firestore();
const auth = admin.auth();



export { auth, db };
