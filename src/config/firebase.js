import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyDnsH4Y_eLpxwwf6uB3XDBtVlnltWEtGpU",
    authDomain: "absents-a4cde.firebaseapp.com",
    projectId: "absents-a4cde",
    storageBucket: "absents-a4cde.appspot.com",
    messagingSenderId: "85791535771",
    appId: "1:85791535771:web:de50705812df76529a0c3e",
    measurementId: "G-40YWQHGB3W"
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export {db};