// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCf5_6sEY9TXs0j2lwOS2iegKH94KYrSMY",
  authDomain: "blacktail.firebaseapp.com",
  projectId: "blacktail",
  storageBucket: "blacktail.appspot.com",
  messagingSenderId: "314897328339",
  appId: "1:314897328339:web:723920dc0a7b2b3e9e8c26",
  measurementId: "G-1H6NTVYCQE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleprovider = new GoogleAuthProvider();
export { auth, googleprovider };
