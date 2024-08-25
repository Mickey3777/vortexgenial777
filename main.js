// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDVt69850TkHcHgG6p7MwR0LNtnukbzWlM",
  authDomain: "webrtcvortex.firebaseapp.com",
  projectId: "webrtcvortex",
  storageBucket: "webrtcvortex.appspot.com",
  messagingSenderId: "273908842571",
  appId: "1:273908842571:web:711fc8cdc91291d1fe0dce",
  measurementId: "G-C2KD00NCPQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
