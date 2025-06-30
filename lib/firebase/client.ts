// lib/firebase/client.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// 2단계에서 설정한 환경 변수를 사용해 config 객체를 만듭니다.
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Next.js에서 중복 초기화를 방지하는 코드
// Next.js는 개발 모드에서 파일이 변경될 때마다 전체를 다시 로드하므로
// 앱이 이미 초기화되었는지 확인하는 로직이 중요합니다.
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// 필요한 Firebase 서비스의 인스턴스를 가져옵니다.
const auth = getAuth(app);
const firestore = getFirestore(app);
// const storage = getStorage(app); // Storage를 사용한다면 추가

// 다른 컴포넌트나 훅에서 사용할 수 있도록 export합니다.
export { app, auth, firestore };