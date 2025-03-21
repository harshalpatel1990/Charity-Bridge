
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'



const firebaseConfig = {
  apiKey: "AIzaSyDyYoGOwMt8QM5_YCbgdtn5bHt7W3pmE2A",
  authDomain: "charity-bridge-b4306.firebaseapp.com",
  projectId: "charity-bridge-b4306",
  storageBucket: "charity-bridge-b4306.firebasestorage.app",
  messagingSenderId: "753527644934",
  appId: "1:753527644934:web:d4eef350fd7d618613b487",
  measurementId: "G-X98VFZ9GSQ"
};



const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
