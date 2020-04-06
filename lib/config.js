import firebase from "firebase/app";
import "firebase/firestore";

export const loadDB = () => {
  try {
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
    firebase.initializeApp(config);
  } catch (err) {
    // we skip the "already exists" message which is
    // not an actual error when we're hot-reloading
    if (!/already exists/.test(err.message)) {
      console.error("Firebase initialization error", err.stack);
    }
  }

  return firebase;
};
