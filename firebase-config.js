import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "COLLE_ICI_API_KEY",
  authDomain: "COLLE_ICI_AUTH_DOMAIN",
  projectId: "COLLE_ICI_PROJECT_ID",
  storageBucket: "COLLE_ICI_STORAGE_BUCKET",
  messagingSenderId: "COLLE_ICI_MESSAGING_SENDER_ID",
  appId: "COLLE_ICI_APP_ID"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
