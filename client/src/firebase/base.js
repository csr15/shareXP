import firebase from "firebase/app";
import "firebase/storage";
import "firebase/analytics"

const firebaseConfig = {
  server_url: "XXXXXXXXXXXXXXX",
  apiKey: "XXXXXXXXXXXXXXX",
  authDomain: "XXXXXXXXXXXXXXX",
  databaseURL: "XXXXXXXXXXXXXXX",
  projectId: "XXXXXXXXXXXXXXX",
  storageBucket: "XXXXXXXXXXXXXXX",
  messagingSenderId: "659687712689",
  appId: "XXXXXXXXXXXXXXX",
  measurementId: "XXXXXXXXXXXXXXX",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;
