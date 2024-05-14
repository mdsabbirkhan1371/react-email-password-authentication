// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBGJtFwU3YRgRliv3OzIu780Am6lvpj0W0",
  authDomain: "email-password-auth-2bf8a.firebaseapp.com",
  projectId: "email-password-auth-2bf8a",
  storageBucket: "email-password-auth-2bf8a.appspot.com",
  messagingSenderId: "446318920041",
  appId: "1:446318920041:web:ce2873230d944365ebbdf8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
export default auth;