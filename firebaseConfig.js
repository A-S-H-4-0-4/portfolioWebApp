// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import  "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKCQ83KF_xVl_DiEsnuCMHz1kDJXKNtZw",
  authDomain: "storage-portfolio.firebaseapp.com",
  projectId: "storage-portfolio",
  storageBucket: "storage-portfolio.appspot.com",
  messagingSenderId: "520924721248",
  appId: "1:520924721248:web:a21b16de8ee9be4a55d305"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const storage = firebase.storage()
export {app,storage}