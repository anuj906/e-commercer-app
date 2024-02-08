import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAG6vFD-0MT99aKYUihuv_pCrT8uiggBWU",
  authDomain: "ai-mobile-app-3993c.firebaseapp.com",
  projectId: "ai-mobile-app-3993c",
  storageBucket: "ai-mobile-app-3993c.appspot.com",
  messagingSenderId: "425269221613",
  appId: "1:425269221613:web:a68cd59d50953e7d6254e4",
  measurementId: "G-KDR500VXJL",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth();
export { auth, app };
