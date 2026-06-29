import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "TA_VRAIE_API_KEY",
  authDomain: "smart-teacher-toolkit.firebaseapp.com",
  projectId: "smart-teacher-toolkit",
  storageBucket: "smart-teacher-toolkit.appspot.com",
  messagingSenderId: "TON_VRAI_MESSAGING_SENDER_ID",
  appId: "TON_VRAI_APP_ID"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
