<template>
  <main class="main">
    <div class="main__img">
        <img src="../assets/images/loginimg.png" alt="">
    </div>
    <form class="main__form">
        <div class="registered">
            <h2>¡Bienvenidx de nuevo!</h2>

            <div class="data">
                <div class="data__field">
                    <label>Correo electrónico</label>
                    <input class="inputField" placeholder="Correo electrónico" type="email" v-model="email">
                </div>
                <div class="data__field">
                    <label>Contraseña</label>
                    <input class="inputField" placeholder="Contraseña" type="password" v-model="password" autocomplete="current-password">
                </div>
            </div>

            <button @click="e => signIn(e)" class="submitBtn">
                <span>Iniciar Sesión</span>
            </button>
        </div>
        <div class="notRegistered">
            <span class="notRegisteredText">¿Aún no tienes cuenta?</span>
            <router-link class="registerBtn" to="/register" >
                <span>Registrarse</span>
            </router-link>
        </div>
    </form>
  </main>
</template>

<script>
import { mapStores } from 'pinia'
import { useAuthenticationStore } from '../stores/authentication'
import { useUiStore } from '../stores/uiStore.js';
export default {
    data() {
        return {
            email: '',
            password: '',
        }
    },
    computed: {
        ...mapStores(useAuthenticationStore, useUiStore),
        userInfo(){
            return this.authenticationStore.getUserInfo;
        },
        isSidebarExpanded() {
            return this.uiStore.showSidebar;
        }
    },
    created() {
        this.uiStore.toggleSidebar(false);  // Ocultar el sidebar
    },
    methods: {
        async signIn(e){
            e.preventDefault();
            console.log('signing in')
            try {
                await this.authenticationStore.signIn(this.email, this.password)
                this.uiStore.toggleSidebar(true);
                this.$router.push('/')
            } catch (error) {
                console.error('Failed to sign in:', error);
            }
        },
    },
}
</script>

<style scoped lang="scss">
    .main{
        height: 100vh;
        width: 100%;
        display: flex;
        flex-direction: row;

        &__img{
            width: 50%;
            overflow: hidden;
            img{
                height: 100%;
                width: 100%;
                object-fit: cover;
            }
        }
        &__form{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 50%;
            padding: 5vw 10vw;

            .registered{
                display: flex;
                flex-direction: column;
                width: 100%;
                margin-bottom: 2vw;
                position: relative;
                padding-bottom: 3vw;

                &::after {
                    content: "";
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: .125vw; // Este será el grosor de tu línea. Ajusta según necesites.
                    background-color: #aaaaaa;
                }
                h2{
                    text-align: center;
                    font-size: 1.875vw;
                    font-weight: 600;
                    margin-bottom: 2vw;
                }

                .data{
                    display: flex;
                    flex-direction: column;
                    &__field{
                        display: flex;
                        flex-direction: column;
                        margin-bottom: 1vw;

                        label{
                            font-size: .8vw;
                            font-weight: 600;
                            margin-bottom: .5vw;
                        }

                        .inputField{
                            padding: .5vw;
                            border-radius: .2vw;
                            border-color: #6A6A6A;
                        }
                    }
                }
                .submitBtn{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: .5vw;
                    border: none;
                    border-radius: .2vw;
                    background-color: #666666;
                    margin-top: 1vw;
                    span{
                        color: white;
                        font-size: .8vw;
                    }
                }
            }

            .notRegistered{
                display: flex;
                flex-direction: column;
                align-items: center;
                .notRegisteredText{
                    font-size: .8vw;
                    font-weight: normal;
                    margin-bottom: .5vw;
                }

                .registerBtn{
                    color: black;
                    font-size: 1vw;
                    font-weight: 600;
                }
            }
        }
    }
</style>