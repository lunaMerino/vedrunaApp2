// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyApI8FBdOOwTvtW8g2PK4PcO8BBrDVpPjU",
  authDomain: "vedrunaapp-3e4c5.firebaseapp.com",
  projectId: "vedrunaapp-3e4c5",
  storageBucket: "vedrunaapp-3e4c5.firebasestorage.app",
  messagingSenderId: "898501268793",
  appId: "1:898501268793:web:1d2d21a1acbb67772384e8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);