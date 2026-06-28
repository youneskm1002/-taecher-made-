import { auth } from "./firebase-config.js";

import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/12.13.0/firebase-auth.js";

onAuthStateChanged(auth, function (user) {
  if (!user) {
    sessionStorage.setItem("redirectAfterLogin", window.location.href);
    window.location.href = "login.html";
    return;
  }

  document.documentElement.classList.add("auth-ready");

  const userNameElements = document.querySelectorAll("[data-user-name]");
  userNameElements.forEach(function (element) {
    element.textContent = user.displayName || user.email;
  });
});

const logoutButtons = document.querySelectorAll("[data-logout]");

logoutButtons.forEach(function (button) {
  button.addEventListener("click", async function (e) {
    e.preventDefault();

    await signOut(auth);
    window.location.href = "login.html";
  });
});
