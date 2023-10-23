import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';

export const config = {
    apiKey: "AIzaSyDLXD0RK6jzQA0yTT683lYCWLEm8xpo4j4",
    authDomain: "math-8d8cf.firebaseapp.com",
    projectId: "math-8d8cf",
    storageBucket: "math-8d8cf.appspot.com",
    messagingSenderId: "55507240288",
    appId: "1:55507240288:web:747118ecc8228ac99b4a05",
    measurementId: "G-RVRRP7JPK8"
};

const firebaseApp = initializeApp(config);
export const firebaseAuth = getAuth();
export default firebaseApp;

console.log('ccc', firebaseAuth.currentUser, 'ddd');
