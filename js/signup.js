import { app } from "./firebase.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";

const auth = getAuth(app);

const submitButton = document.getElementById(`submit2`);

console.log(email, password);
// on clicking submit set text as loading and create user with email and password
submitButton.addEventListener(`click`, (e) => {
  e.preventDefault();
  submitButton.innerText = `Loading...`;

  // get email and password from form
  const email = document.getElementById(`email`).value;
  const password = document.getElementById(`password`).value;
  const firstName = document.getElementById(`firstname`).value;
  const lastName = document.getElementById(`lastname`).value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      updateProfile(user, {
        displayName: `${firstName} ${lastName}`,
      });
      window.location.pathname = `/login.html`;
    })
    .catch((error) => {
      console.error(error);
      alert("Error: " + JSON.stringify(error.code));
    })
    .finally(() => {
      submitButton.innerText = `Submit`;
    });
});
