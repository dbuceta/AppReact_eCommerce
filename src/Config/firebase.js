import firebase from 'firebase/compat/app'
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

// Mi Web App Firebase configuracion

const firebaseConfig = {
  apiKey: "AIzaSyDcHz62XS33fJ8BKOwX8QJPZ-h4Q1o0lC8",
  authDomain: "mifactoria-1.firebaseapp.com",
  projectId: "mifactoria-1",
  storageBucket: "mifactoria-1.appspot.com",
  messagingSenderId: "509826704839",
  appId: "1:509826704839:web:74cfc053ef9e0232de25e2"
};

// Inicializo Firebase
const app = firebase.initializeApp(firebaseConfig)
const auth = getAuth(app)
firebase.auth = firebase.auth()
const projectStorage = firebase.storage()
const firebaseDB = firebase.firestore()

// timestamp upload data in firestore
const timestamp = firebase.firestore.FieldValue.serverTimestamp()

export { auth, projectStorage, firebaseDB, timestamp, onAuthStateChanged }