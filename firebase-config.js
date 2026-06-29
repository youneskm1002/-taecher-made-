import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0FUpy_VX1I8j9AX285t4fvqDPvndNn3s",
  authDomain: "smart-teacher-toolkit.firebaseapp.com",
  projectId: "smart-teacher-toolkit",
  storageBucket: "smart-teacher-toolkit.firebasestorage.app",
  messagingSenderId: "191719425389",
  appId: "1:191719425389:web:a7efec0a81c428480ac664",
  measurementId: "G-7QRQEE8EML"
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
