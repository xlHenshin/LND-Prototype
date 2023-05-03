import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import firebaseCredentials from "./credentials.js";

const app = initializeApp(firebaseCredentials);

const db = getFirestore(app);

export {db}