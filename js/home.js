import { refreshList } from "./productUtils.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { auth } from "./firebase.js";
onAuthStateChanged(auth, (user) => {
  refreshList(true);
});
