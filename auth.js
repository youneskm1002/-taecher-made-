import { auth, googleProvider } from "./firebase-config.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  onAuthStateChanged,
  signOut
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

  if (savedPage && !savedPage.includes("index.html")) {
    window.location.href = savedPage;
  } else {
    window.location.href = "home.html";
  }
}

const loginForm = document.getElementById("login-form");

if (loginForm) {
  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      showMessage("Login successful. Redirecting...", "success");
      setTimeout(redirectAfterLogin, 700);
    } catch (error) {
      showMessage("Login failed. Please check your email and password.");
    }
  });
}

const signupForm = document.getElementById("signup-form");

if (signupForm) {
  signupForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("signup-name").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value;

    if (password.length < 6) {
      showMessage("Password must contain at least 6 characters.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      if (name) {
        await updateProfile(userCredential.user, {
          displayName: name
        });
      }

      showMessage("Account created successfully. Redirecting...", "success");
      setTimeout(redirectAfterLogin, 700);
    } catch (error) {
      showMessage("Account creation failed. This email may already be used.");
    }
  });
}

const googleButtons = document.querySelectorAll("[data-google-auth]");

googleButtons.forEach(function (button) {
  button.addEventListener("click", async function () {
    try {
      await signInWithPopup(auth, googleProvider);
      showMessage("Google login successful. Redirecting...", "success");
      setTimeout(redirectAfterLogin, 700);
    } catch (error) {
      showMessage("Google login failed. Please try again.");
    }
  });
});

onAuthStateChanged(auth, function (user) {
  const currentPage = window.location.pathname.split("/").pop();

  if (user && (currentPage === "" || currentPage === "index.html")) {
    setTimeout(redirectAfterLogin, 500);
  }
});

const logoutButtons = document.querySelectorAll("[data-logout]");

logoutButtons.forEach(function (button) {
  button.addEventListener("click", async function (e) {
    e.preventDefault();

    await signOut(auth);
    window.location.href = "index.html";
  });
});
