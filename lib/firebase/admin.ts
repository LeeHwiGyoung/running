import admin from 'firebase-admin';
import { getApps } from "firebase-admin/app";

if (!getApps().length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY,
    }),
  });
}

const firestoreAdmin = admin.firestore();
const authAdmin = admin.auth();
const storageAdmin = admin.storage();

export { firestoreAdmin, authAdmin, storageAdmin };