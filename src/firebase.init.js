// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBXaMSX74Y1yjljy7w0HflG0nRAK88ILpE",
    authDomain: "ema-john-simple-5fa63.firebaseapp.com",
    projectId: "ema-john-simple-5fa63",
    storageBucket: "ema-john-simple-5fa63.appspot.com",
    messagingSenderId: "543517976177",
    appId: "1:543517976177:web:d192132d03ed71399d1dd0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;