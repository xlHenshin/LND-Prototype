import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAuthenticationStore } from "../stores/authentication";
import firebaseCredentials from "./credentials.js";

const app = initializeApp(firebaseCredentials);
const auth = getAuth(app);
const db = getFirestore(app);

onAuthStateChanged(auth, (user)=>{
        const authStore = useAuthenticationStore()
        if (user) {
        const uid = user.uid;
    
        authStore.user = user
        console.log(authStore.user)
        }else{
        authStore.user = null;
        console.log(authStore.user)
        }
    })

export {auth}
export {db}