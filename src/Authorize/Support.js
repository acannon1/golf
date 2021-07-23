import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";
import "firebase/analytics";
import Key from './Key.js'

export const  firebaseConfig = {
    apiKey: Key(),
    authDomain: "golf-40e5a.firebaseapp.com",
    projectId: "golf-40e5a",
    storageBucket: "golf-40e5a.appspot.com",
    messagingSenderId: "1051998659599",
    appId: "1:1051998659599:web:0a462c09edc471ef396f7a",
    measurementId: "G-8SLJ5575TL"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const analytics = firebase.analytics();