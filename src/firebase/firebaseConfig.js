import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

export const rrfConfig = {};

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyAFqpeBVOLLu3uIx3MEMTf1MGfxtHrVtRI',
  authDomain: 'kdz-kasiorka.firebaseapp.com',
  databaseURL: 'https://kdz-kasiorka.firebaseio.com',
  projectId: 'kdz-kasiorka',
  storageBucket: 'kdz-kasiorka.appspot.com',
  messagingSenderId: '387062103498',
  appId: '1:387062103498:web:c551b41e08978b212ae333',
  measurementId: 'G-SC8CBENHXX',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore();
firebase.analytics();

export default firebase;
