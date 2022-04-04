import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCup-tRIy6TMOJUIm8udVM_SOAe9KLkTcg",
  authDomain: "houselet-9b984.firebaseapp.com",
  projectId: "houselet-9b984",
  storageBucket: "houselet-9b984.appspot.com",
  messagingSenderId: "995891612234",
  appId: "1:995891612234:web:0126f63ebd26989d1eb4b3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore();