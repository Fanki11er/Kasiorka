import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/analytics';
import Rebase from 're-base';

export const rrfConfig = {};

// Real Config
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

//? Tests config
/*var firebaseConfig = {
  apiKey: 'AIzaSyBaxRNGRtjo1QxemrtnBm3RaWxfEIdkasw',
  authDomain: 'kdz-kasiorka-tests.firebaseapp.com',
  databaseURL: 'https://kdz-kasiorka-tests.firebaseio.com',
  projectId: 'kdz-kasiorka-tests',
  storageBucket: 'kdz-kasiorka-tests.appspot.com',
  messagingSenderId: '702909063651',
  appId: '1:702909063651:web:ad791a9ffc7b32a23d00d6',
  measurementId: 'G-3XGN40L7JZ',
};*/

//? Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();
firebase.analytics();
const dataBase = Rebase.createClass(db);
export { dataBase };
export default firebase;
