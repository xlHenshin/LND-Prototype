import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { useAuthenticationStore } from "../stores/authentication";
import firebaseCredentials from "./credentials.js";

const app = initializeApp(firebaseCredentials);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {auth, db, storage}