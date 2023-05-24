import { defineStore } from "pinia";
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, deleteUser } from "firebase/auth";
import { auth } from "../firebase/config";
import { db } from "../firebase/config";
import { collection, doc, setDoc, getDocs, deleteDoc, updateDoc, getDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";

export const useAuthenticationStore = defineStore("authentication", {
    state: () => ({
        user:null,
        userInfo: {}
    }),
    getters: {
        getUserInfo: (state) =>[state.userInfo]
    },
    actions: {
        authState() {
            return new Promise((resolve, reject) => {
                onAuthStateChanged(auth, (user) => {
                    if (user) {
                        this.user = user;
                        resolve(user);
                    } else {
                        this.user = null;
                        resolve(null);
                    }
                });
            });
        },
        signIn(email, password) {
            return signInWithEmailAndPassword(auth, email, password)
                .then(async (userCredential) => {
                    const user = userCredential.user;
                    console.log('Logged User: ', user);
                    this.user = user; // Actualizamos el usuario aquí.
                    await this.getUserData(); // Llamada a getUserData después de la autenticación del usuario
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
            return new Promise(async (resolve, reject) => {
                if(auth.currentUser !== null){
                    const userDocRef = doc(db, "users", auth.currentUser.uid);
                    const userDoc = await getDoc(userDocRef);
        
                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        this.userInfo = JSON.parse(JSON.stringify(userData));
                        console.log('User data: ', this.userInfo);
                        resolve();
                    } else {
                        console.log(`No user found with id: ${auth.currentUser.uid}`);
                        reject(`No user found with id: ${auth.currentUser.uid}`);
                    }
                } else {
                    reject('No current user');
                }
            });
        },
        async newUserAwait(username, email, password, favCategoria) {
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password)
                this.user = userCredential.user;
                const isAdmin = false;
                const id = userCredential.user.uid;
        
                // Crear perfil de categoría para el usuario
                const categoryProfile = {};
        
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
                    const initialScore = favCategoria.includes(category) ? 100 / favCategoria.length : 0;
                    categoryProfile[category] = {
                    views: 0,
                    shares: 0,
                    likes: 0,
                    score: initialScore
                    };
                });
        
                // Combinar userData y categoryProfile
                const userData = {
                    id: id,
                    username: username,
                    email: email,
                    password: password,
                    admin: isAdmin,
                    favCategoria: favCategoria,
                    category_profile: categoryProfile // ahora category_profile es parte del mismo documento del usuario
                }
        
                const ref = doc(db, "users", id); // cambiar la ruta para apuntar directamente al documento del usuario
                await setDoc(ref, userData);
        
                console.log('Usuario creado: ', userCredential.user)
            } catch (error) {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage);
            }
        },        
            
        async updateUsername(newUsername) {
            const userId = auth.currentUser.uid;
            const userRef = doc(db, "users", userId);
            await updateDoc(userRef, { username: newUsername });
            this.userInfo.username = newUsername;
        },
            
        async updateProfilePicture(file) {
            const userId = auth.currentUser.uid;
            const storageRef = ref(getStorage(), 'user_profiles/' + userId + '/profile_picture.jpg');
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on('state_changed', 
                (snapshot) => {
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                    }
                }, 
                (error) => {
                    console.error('Error during upload', error);
                }, 
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    console.log('File available at', downloadURL);
        
                    const userRef = doc(db, "users", userId);
                    const userSnapshot = await getDoc(userRef);
        
                    if (userSnapshot.exists()) {
                        await updateDoc(userRef, {
                            url: downloadURL,
                            fileRefURL: uploadTask.snapshot.ref.fullPath
                        });
                    } else {
                        console.log(`No user found with id: ${userId}`);
                    }
                }
            );
        },

        async deleteUserImage() {
            this.isImageLoading = true;
            const userId = auth.currentUser.uid;
            const userDocRef = doc(db, "users", userId);
            const userDocData = await getDoc(userDocRef);
            
            if (userDocData.exists()) {
                const imageRef = ref(getStorage(), 'user_profiles/' + userId + '/profile_picture.jpg');
                await deleteObject(imageRef);
                
                await updateDoc(userDocRef, {
                url: "",
                });
                
                await this.getUserData();
                this.isImageLoading = false;
            } else {
                console.log(`No user found with id: ${userId}`);
                this.isImageLoading = false;
            }
        }
    },
});