import { defineStore } from "pinia";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, deleteUser } from "firebase/auth";
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
        signIn(email, password) {
            return signInWithEmailAndPassword(auth, email, password)
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
            if(auth.currentUser !== null){
                const collectionRef = collection(db, "/users/users_list/registered_list");
                const contentSnapshot = await getDocs(collectionRef);
        
                const userData = contentSnapshot.docs.map(doc => doc.data());
                console.log('userlist: ', userData)
                let currentUser
                for (let index = 0; index < userData.length; index++) {
                    if(auth.currentUser.email === userData[index].email){
                    currentUser = userData[index]
                    }
                }
                this.userInfo = currentUser
            }
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
                    const initialScore = favCategoria.includes(category) ? 100 / favCategoria.length : 0;
                    categoryProfile[category] = {
                    views: 0,
                    shares: 0,
                    likes: 0,
                    score: initialScore
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
            
        async updateUsername(newUsername) {
            const userId = auth.currentUser.uid;
            const userRef = doc(db, "users", "users_list", "registered_list", userId);
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
        
                    const userRef = doc(db, "users", "users_list", "registered_list", userId);
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
            const userDocRef = doc(db, "users", "users_list", "registered_list", userId);
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