// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWCkZvkvk1Bx6dDK1XwjOrT6YNf4wqhOo",
  authDomain: "pasindi-itp-25042401.firebaseapp.com",
  projectId: "pasindi-itp-25042401",
  storageBucket: "pasindi-itp-25042401.appspot.com",
  messagingSenderId: "835142756795",
  appId: "1:835142756795:web:8f91e44af851689885bc9e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;
