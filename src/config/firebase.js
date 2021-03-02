import firebase from 'firebase/app';
import 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyC79EBEgrIGKpJH1EJY37Dcn2Uo6OwVcFk",
    authDomain: "knight-rider-cabs.firebaseapp.com",
    databaseURL: "https://knight-rider-cabs.firebaseio.com",
    projectId: "knight-rider-cabs",
    storageBucket: "knight-rider-cabs.appspot.com",
    messagingSenderId: "584765511924",
    appId: "1:584765511924:web:63a07ed91724165f99a6a1",
    measurementId: "G-TF44SL3HTR"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  //firebase.analytics();

export default firebase;