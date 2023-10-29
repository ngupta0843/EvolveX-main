// Import the functions you need from the SDKs you need
import firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCk-9dxcPOjsgpMGz0ZqBx0pNlawHbS-vI",
  authDomain: "growx-c1c6d.firebaseapp.com",
  projectId: "growx-c1c6d",
  storageBucket: "growx-c1c6d.appspot.com",
  messagingSenderId: "93345830219",
  appId: "1:93345830219:web:adb1c956e7591f1c8c44ce",
  measurementId: "G-VG66C7GV40",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export default app;
