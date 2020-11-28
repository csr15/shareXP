import firebase from "firebase/app";
import "firebase/storage";
import "firebase/analytics"

const firebaseConfig = {
  server_url: "http://localhost:8080",
  apiKey: "AIzaSyDqqMYPWwyOI-fpfkB9rzejtlEb_h7a4DU",
  authDomain: "sharexp-15.firebaseapp.com",
  databaseURL: "https://sharexp-15.firebaseio.com",
  projectId: "sharexp-15",
  storageBucket: "sharexp-15.appspot.com",
  messagingSenderId: "659687712689",
  appId: "1:659687712689:web:65ea5371425e6588d67f90",
  measurementId: "G-Q3D8TY9HLW",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;
