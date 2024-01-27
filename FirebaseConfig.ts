// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
//import * as firebase from 'firebase';
//import { getAnalytics } from "firebase/analytics";
//import { getAuth } from "firebase/auth";
//import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
/*
const firebaseConfig = {
  apiKey: "AIzaSyDzCs_P0bEaYCoisHZ6un-dl-3OoqB23Rg",
  authDomain: "mobileappaplt.firebaseapp.com",
  projectId: "mobileappaplt",
  storageBucket: "mobileappaplt.appspot.com",
  messagingSenderId: "921669849815",
  appId: "1:921669849815:web:9e47221ebf446a41a6d692",
  measurementId: "G-HP1ZCW8DQ0"
};
*/
// Initialize Firebase
/*export const FIREBASE_APP = initializeApp(firebaseConfig);
//const analytics = getAnalytics(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);*/

/*
let app;
if (firebase.apps.length === 0 ){
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}
const auth = firebase.auth();
export {auth};
*/

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzCs_P0bEaYCoisHZ6un-dl-3OoqB23Rg",
  authDomain: "mobileappaplt.firebaseapp.com",
  projectId: "mobileappaplt",
  storageBucket: "mobileappaplt.appspot.com",
  messagingSenderId: "921669849815",
  appId: "1:921669849815:web:9e47221ebf446a41a6d692",
  measurementId: "G-HP1ZCW8DQ0"
};

// Initialize Firebase
//initializeApp(firebaseConfig);
//const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
//getAnalytics(app);
//export default app;
export const FIREBASE_APP = initializeApp(firebaseConfig);
//const analytics = getAnalytics(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
//export const FIREBASE_DB = getFirestore(FIREBASE_APP);