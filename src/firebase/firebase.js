import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyBy0kgN4wIWf-3KEp0oOel3nLRxYNTd6dk",
  authDomain: "alemeno-assignment-c1f1c.firebaseapp.com",
  projectId: "alemeno-assignment-c1f1c",
  storageBucket: "alemeno-assignment-c1f1c.appspot.com",
  messagingSenderId: "656313664039",
  appId: "1:656313664039:web:6d433ceac8b78818904402"
};

const app = initializeApp(firebaseConfig);
export const auth= getAuth(app)
const firestore=getFirestore(app)
export default firestore;