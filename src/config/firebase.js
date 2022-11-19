import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCNwm6qgqyt5iqmgmwiKpFaCmwLO0R0Mbk",
    authDomain: "absent-757d0.firebaseapp.com",
    projectId: "absent-757d0",
    storageBucket: "absent-757d0.appspot.com",
    messagingSenderId: "829663037331",
    appId: "1:829663037331:web:597f311b85b4ca8976ca66"
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export {db};