import { app } from "./firebase.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
// get firebase currentUser using authstate
const auth = getAuth(app);
let user;
onAuthStateChanged(auth, (u) => {
  if (u) {
    const names = document.getElementsByClassName(`nameDisplay`);
    for (let i = 0; i < names.length; i++) {
      names[i].innerText = u.displayName;
    }
  }
});
