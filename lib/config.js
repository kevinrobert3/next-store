import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

var config = {
  apiKey: "AIzaSyA6I6BWHE1h6Nkt3FYPHFbcwj7veZqVTtM",
  authDomain: "agilehutdev.firebaseapp.com",
  databaseURL: "https://agilehutdev.firebaseio.com",
  projectId: "agilehutdev",
  storageBucket: "agilehutdev.appspot.com",
  messagingSenderId: "829177803606",
  appId: "1:829177803606:web:881be4fcabe44bd670dcf7",
  measurementId: "G-0NPBENKYEZ",
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}


export default firebase;
export const auth = firebase.auth();
export const db = firebase.firestore();

