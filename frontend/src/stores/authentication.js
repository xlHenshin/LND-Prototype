import { defineStore } from "pinia";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, deleteUser } from "firebase/auth";
import { auth } from "../firebase/config";
import { db } from "../firebase/config";
import { collection, doc, setDoc, getDocs, deleteDoc } from "firebase/firestore";

export const useAuthenticationStore = defineStore("authentication", {
    state: () => ({
        user:null,
        userInfo: {}
    }),
    actions: {
        signIn(email, password) {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
            const user = userCredential.user;
            console.log('Logged User: ', user)
            })
            .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(error)
            });
        },
        logOut(){
            signOut(auth)
                .then(()=>{
                console.log('Usuario Logged Out')
                }).catch((error)=>{
                alert(error)
                })
        },
        async eliminateUser(){
            const user = auth.currentUser;
            console.log("usuario a borrar: "+user);
    
            await deleteDoc(doc(db,"users",auth.currentUser.uid))
    
            deleteUser(user).then(()=>{
                alert("¡Usuario eliminado!")
            }).catch((error)=>{
                console.log(error)
            })
        },
        async getUserData(){
            const collectionRef = collection(db, "users");
                const { docs } = await getDocs(collectionRef);
    
                const userData = docs.map((doc) => {
                    return {
                    id: doc.id,
                    ...doc.data()
                    };
                });
                console.log(auth.currentUser.uid)
                let currentUser
                for (let index = 0; index < userData.length; index++) {
                    if(auth.currentUser.email === userData[index].email){
                    currentUser = userData[index]
                    }
                }
                this.userInfo=currentUser
                console.log(this.userInfo)
        },
        getData(){
            return this.userInfo
        },
        async newUserAwait(username, email, password, favCategoria) {
                try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password)
                this.user = userCredential.user;
                const isAdmin = false;
                const id = userCredential.user.uid;
                const userData = {
                    id: id,
                    username: username,
                    email: email,
                    password: password,
                    admin: isAdmin,
                    favCategoria: favCategoria
                }
                const ref = doc(db, "users", "users_list", "registered_list", id);
                await setDoc(ref, userData);
            
                // Crear perfil de categoría para el usuario
                const categoryProfile = {
                    id: id
                };
                const categories = [
                    'Social y Político',
                    'Entretenimiento',
                    'Educación',
                    'Género y Feminismo',
                    'Deportes',
                    'Comunicación',
                    'Arte, cultura y literatura'
                ];
            
                categories.forEach(category => {
                    categoryProfile[category] = {
                    views: 0,
                    shares: 0,
                    likes: 0,
                    score: favCategoria.includes(category) ? 10 : 0
                    };
                });
            
                const categoryProfileRef = doc(db, "users", "users_list", "category_profile", id);
                await setDoc(categoryProfileRef, categoryProfile);
            
                console.log('Usuario creado: ', userCredential.user)
                } catch (error) {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage);
                }
            },
    },
});