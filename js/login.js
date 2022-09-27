//login using email and password with firebase
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { app } from "./firebase.js";

const auth = getAuth(app);

// on clicking submit set text as loading and create user with email and password
const submitButton = document.getElementById(`submit`);
submitButton.addEventListener(`click`, (e) => {
  e.preventDefault();
  submitButton.innerText = `Loading...`;

  // get email and password from form
  const email = document.getElementById(`email`).value;
  const password = document.getElementById(`password`).value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      window.location.pathname = `/profile.html`;
    })
    .catch((error) => {
      console.error(error);
      alert("Error: " + JSON.stringify(error.code));
    })
    .finally(() => {
      submitButton.innerText = `Submit`;
    });
});
