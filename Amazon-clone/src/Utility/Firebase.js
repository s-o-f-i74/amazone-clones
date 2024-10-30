
import firebase  from "firebase/compat/app";
import {getAuth} from "firebase/auth"
import "firebase/compat/firestore"
import "firebase/compat/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzJBObBT2Nk9moUZab1lr2p1P8TSFB4Ko",
  authDomain: "e-clone-b02d9.firebaseapp.com",
  projectId: "e-clone-b02d9",
  storageBucket: "e-clone-b02d9.appspot.com",
  messagingSenderId: "888302695010",
  appId: "1:888302695010:web:e723be022f90629b12573b",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth =getAuth(app);
export const db = app.firestore();