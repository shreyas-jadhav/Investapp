// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHH-d7UMnvCd9Uizqg47I65CokmDP6t7Y",
  authDomain: "entreapp-1ef4c.firebaseapp.com",
  databaseURL: "https://entreapp-1ef4c-default-rtdb.firebaseio.com",
  projectId: "entreapp-1ef4c",
  storageBucket: "entreapp-1ef4c.appspot.com",
  messagingSenderId: "231372584976",
  appId: "1:231372584976:web:8baff2ff3703ea9efd7295",
  measurementId: "G-EZ405Z2BTQ",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
