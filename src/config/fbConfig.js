import firebase from "firebase/app";
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBroBFLa3lwCbneXe4pIFiC18K99WZfQb8",
    authDomain: "plan-tracker-258c9.firebaseapp.com",
    projectId: "plan-tracker-258c9",
    storageBucket: "plan-tracker-258c9.appspot.com",
    messagingSenderId: "305050078843",
    appId: "1:305050078843:web:885a711d0525bf8c615cde",
    measurementId: "G-QGSSFSHYMM"
  };

  firebase.initializeApp(firebaseConfig);
  firebase.firestore().settings({
    timestampsInSnapshots: true
  })

  export default firebase;
//   firebase.analytics();