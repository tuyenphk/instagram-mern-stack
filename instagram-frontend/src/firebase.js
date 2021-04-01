import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyA_aV21gpikKe3JRnby6PTD_k9CQljDDC0",
    authDomain: "instagram-clone-1597b.firebaseapp.com",
    databaseURL: "https://instagram-clone-1597b-default-rtdb.firebaseio.com",
    projectId: "instagram-clone-1597b",
    storageBucket: "instagram-clone-1597b.appspot.com",
    messagingSenderId: "591561084620",
    appId: "1:591561084620:web:6ef6039330c3e12ba33c69",
    measurementId: "G-63TXYKNJYF"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db, auth, storage};