// to store and save all the data in this file


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4Ar_Pf2SlrWHJQ6Uf62QANveYhg2xx4Y",
  authDomain: "personal-finance-tracker-bafc1.firebaseapp.com",
  projectId: "personal-finance-tracker-bafc1",
  storageBucket: "personal-finance-tracker-bafc1.appspot.com",
  messagingSenderId: "1066100592219",
  appId: "1:1066100592219:web:140da60997293a04fa397e",
  measurementId: "G-NGNCRP6XZS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };

//db auth and provider we are exporting and using again and again in our project