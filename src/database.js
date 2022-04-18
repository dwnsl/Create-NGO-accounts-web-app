import { initializeApp,} from "firebase/app";
import {getAuth,  createUserWithEmailAndPassword} from 'firebase/auth';
import { getFunctions } from "firebase/functions";
import { getFirestore} from "firebase/firestore";
import 'firebase/functions';



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA2XMiiA1GQjl2ATz5AIayTK8VE77_KLOk",
  authDomain: "gondola-9b941.firebaseapp.com",
  projectId: "gondola-9b941",
  storageBucket: "gondola-9b941.appspot.com",
  messagingSenderId: "76052677850",
  appId: "1:76052677850:web:e9b893d5051da59fe751e3",
  measurementId: "G-LHQ1E5P0DZ"
};


export const app = initializeApp(firebaseConfig)

export const functions = getFunctions(app)

export const db = getFirestore(app)

export const auth = getAuth(app)


