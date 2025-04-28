// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// for authenticating users, create account, sign-in and logout
import { getAuth } from "firebase/auth";

// for working with databases
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAX5qMeR5Q0Q4MIi002hpbSQGewUDAUh4A",
  authDomain: "gab-d91f5.firebaseapp.com",
  projectId: "gab-d91f5",
  storageBucket: "gab-d91f5.firebasestorage.app",
  messagingSenderId: "289953125650",
  appId: "1:289953125650:web:3045ea9b08f3ec39c8cfcb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// connect our app authentication
export const auth = getAuth(app);

// connect our app to firestore
export const db = getFirestore(app);
