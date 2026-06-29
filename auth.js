import { auth, googleProvider } from "./firebase-config.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const messageBox = document.getElementById("auth-message");

function showMessage(message, type = "error") {
  if (!messageBox) return;

  messageBox.textContent = message;
  messageBox.className = "auth-message " + type;
  messageBox.style.display = "block";
}

function redirectAfterLogin() {
  const savedPage = sessionStorage.getItem("redirectAfterLogin");
  sessionStorage.removeItem("redirectAfterLogin");

  if (
    savedPage &&
    !savedPage.includes("login.html") &&
    !savedPage.includes("signup.html") &&
    !savedPage.includes("index.html")
  ) {
    window.location.href = savedPage;
  } else {
    window.location.href = "home.html";
  }
}

/* LOGIN EMAIL */
const loginForm = document.getElementById("login-form");

if (loginForm) {
  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      showMessage("Connexion réussie. Redirection...", "success");
      setTimeout(redirectAfterLogin, 800);
    } catch (error) {
      showMessage("Erreur de connexion. Vérifie ton email et ton mot de passe.");
      console.error(error);
    }
  });
}

/* SIGNUP EMAIL */
const signupForm = document.getElementById("signup-form");

if (signupForm) {
  signupForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("signup-name").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value;

    if (password.length < 6) {
      showMessage("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      if (name) {
        await updateProfile(userCredential.user, {
          displayName: name
        });
      }

      showMessage("Compte créé avec succès. Redirection...", "success");
      setTimeout(redirectAfterLogin, 800);
    } catch (error) {
      showMessage("Erreur d'inscription. Cet email est peut-être déjà utilisé.");
      console.error(error);
    }
  });
}

/* GOOGLE LOGIN / SIGNUP */
const googleButtons = document.querySelectorAll(
  "#google-login, #google-signup, [data-google-auth]"
);

googleButtons.forEach(function (button) {
  button.addEventListener("click", async function () {
    try {
      await signInWithPopup(auth, googleProvider);
      showMessage("Connexion Google réussie. Redirection...", "success");
      setTimeout(redirectAfterLogin, 800);
    } catch (error) {
      showMessage("Connexion Google impossible. Vérifie Firebase et le domaine autorisé.");
      console.error(error);
    }
  });
});

/* SI DÉJÀ CONNECTÉ */
onAuthStateChanged(auth, function (user) {
  const currentPage = window.location.pathname.split("/").pop();

  if (user && (currentPage === "login.html" || currentPage === "signup.html")) {
    setTimeout(redirectAfterLogin, 500);
  }
});
