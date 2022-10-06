// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite'
import { getEnvironments } from "../helpers";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const {
  VITE_APIKEY,
  VITE_AUTHDOMAIN,
  VITE_PROJECTID,
  VITE_STORAGEBUCKET,
  VITE_MESSAGINGSENDERID,
  VITE_APPID,
} = getEnvironments();

//Dev/prod
// const firebaseConfig = {
  // apiKey: "AIzaSyDPLhHrWZph134sbXNyxW7zkKFei7fFqsc",
  // authDomain: "react-pruebas-6720b.firebaseapp.com",
  // projectId: "react-pruebas-6720b",
  // storageBucket: "react-pruebas-6720b.appspot.com",
  // messagingSenderId: "165492238623",
  // appId: "1:165492238623:web:c9195d472d9b943d77e82a"
// };

//Testing
const firebaseConfig = {
  apiKey: VITE_APIKEY,
  authDomain: VITE_AUTHDOMAIN,
  projectId: VITE_PROJECTID,
  storageBucket: VITE_STORAGEBUCKET,
  messagingSenderId: VITE_MESSAGINGSENDERID,
  appId: VITE_APPID
};


// Initialize Firebase
export const FireBaseApp  = initializeApp(firebaseConfig);
export const FireBaseAuth = getAuth( FireBaseApp );
export const FireBaseDB   = getFirestore( FireBaseApp );
