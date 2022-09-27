import { app } from "./firebase.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import "./protectedPage.js";
// get firebase currentUser using authstate
const auth = getAuth(app);
let user;
onAuthStateChanged(auth, (u) => {
  if (u) {
    const name = document.getElementById(`name`);
    name.innerText = u.displayName;
  }
});
