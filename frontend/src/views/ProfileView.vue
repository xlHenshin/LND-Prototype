<template>
    <main class="main">
        <div class="main__title">
            <h1>Mi perfil</h1>
            <span>{{userInfo[0].username}}</span>
        </div>

        <section class="userProfile">
            <aside class="userProfile__imgConfig">
                <div class="userImg">
                    <div v-if="isImageLoading" class="loading-indicator"></div>
                    <img v-else :src="userInfo.length > 0 && userInfo[0].url ? userInfo[0].url : defaultProfilePic" alt="Imagen de perfil" />
                </div>
                <div class="imgOptions">
                    <input type="file" ref="fileInput" @change="handleFileUpload" style="display: none" />
                    <button class="optionsBtn" @click="triggerFileUpload">
                        <span>Subir foto</span>
                    </button>
                    <button class="optionsBtn" @click="deleteUserImage">
                        <span>Eliminar foto</span>
                    </button>
                </div>
            </aside>
            <div class="userProfile__data">
                <div class="username">
                    <label>Nombre de usuario</label>
                    <div class="username__input">
                        <input type="text" v-model="newUsername" @input="usernameChanged">
                        <button @click="saveNewUsername" v-if="isUsernameChanged">Guardar</button>
                    </div>
                </div>
                <div class="email">
                    <label>Correo</label>
                    <span>{{userInfo[0].email}}</span>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
import { mapStores } from 'pinia';
import { useAuthenticationStore } from '../stores/authentication';
import defaultProfilePic from '../assets/images/DefaultUser.png';
export default {
    computed: {
        ...mapStores(useAuthenticationStore),
        userIsLogged(){
                return this.authenticationStore.user !== null
            },
        userInfo(){
            return this.authenticationStore.getUserInfo;
        }
    },
    data() {
        return {
            isUsernameChanged: false,
            isImageLoading: false,
            newUsername: '',
            defaultProfilePic
        };
    },

    async mounted() {
        await this.loadUserData();
    },
    watch: {
        userInfo: {
            immediate: true,
            handler(newValue) {
                if (newValue.length > 0) {
                    this.newUsername = newValue[0].username;
                }
            }
        }
    },
    methods: {
        usernameChanged(){
            this.isUsernameChanged = this.newUsername !== this.userInfo[0].username;
        },
        saveNewUsername(){
            this.authenticationStore.updateUsername(this.newUsername)
                .then(() => {
                    console.log('Nombre de usuario actualizado con éxito');
                    this.currentUsername = this.newUsername;
                    this.isUsernameChanged = false;
                })
                .catch((error) => {
                    console.error('Error al actualizar el nombre de usuario:', error);
                });
        },
        deleteUserImage(){
            this.isImageLoading = true;
            this.authenticationStore.deleteUserImage()
                .then(async () => {
                    // Actualizar los datos del usuario para que la nueva imagen de perfil se muestre inmediatamente
                    await this.authenticationStore.getUserData();
                    this.isImageLoading = false;
                })
                .catch((error) => {
                    console.error('Error al eliminar la imagen de perfil:', error);
                    this.isImageLoading = false;
                });
        },
        triggerFileUpload() {
            this.$refs.fileInput.click();
        },
        async handleFileUpload(event) {
            const file = event.target.files[0];
            if (file) {
                this.isImageLoading = true;
                await this.authenticationStore.updateProfilePicture(file)
                    .then(async () => {
                        // Actualizar los datos del usuario para que la nueva imagen de perfil se muestre inmediatamente
                        await this.authenticationStore.getUserData();
                        this.isImageLoading = false;
                    })
                    .catch((error) => {
                        console.error('Error al actualizar la imagen de perfil:', error);
                        this.isImageLoading = false;
                    });
            }
        },

        async loadUserData() {
            if(this.userIsLogged){
                this.isImageLoading = true;
                try {
                    await this.authenticationStore.getUserData();
                } catch (error) {
                    console.error('Error cargando datos del usuario:', error);
                } finally {
                    this.isImageLoading = false;
                }
            }
        },
    }
}
</script>

<style scoped lang="scss">
    .main{
        width: 100%;
        height: 100vh;
        padding: 5vw 10vw 5vw 10vw;
        background-color: #F5F5F5;

        &__title{
            display: flex;
            flex-direction: row;
            align-items: baseline;

            h1{
                font-size: 4vw;
                font-weight: 600;
                margin-bottom: 1.5vw;
                margin-right: 3vw;
            }

            span {
                font-size: 1.5vw;
                font-weight: normal;
            }
        }
    }

    .userProfile{
        display: flex;
        flex-direction: row;

        &__imgConfig{
            display: flex;
            flex-direction: column;
            margin-right: 2vw;

            .userImg{
                width: 14vw;
                height: 14vw;
                border-radius: 0.5vw;
                overflow: hidden;
                margin-bottom: 2vw;
                display: flex;
                justify-content: center;
                align-items: center;
                position: relative;
                .loading-indicator {
                    position: absolute;
                    display: flex;
                    width: 2.5vw;
                    height: 2.5vw;
                    border: .3vw solid rgba(0,0,0,.3);
                    border-radius: 50%;
                    border-top-color: #000;
                    animation: spin 1s ease-in-out infinite;
                }

                @keyframes spin {
                    to { 
                        transform: rotate(360deg); 
                    }
                }
                img{
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }

            .imgOptions{
                display: flex;
                flex-direction: column;
            }
        }

        &__data{
            display: flex;
            flex-direction: column;

            .username, .email{
                display: flex;
                flex-direction: column;
                
                &__input{
                    flex-direction: row;
                }
            }
        }
    }
</style>