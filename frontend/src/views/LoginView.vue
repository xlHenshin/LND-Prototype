<template>
  <main class="main">
    <form class="main__form">
        <div class="main__form registered">
            <h2>¡Bienvenidx de nuevo!</h2>

            <div class="main__form data">
                <div>
                    <span>Correo electrónico</span>
                    <input type="email" v-model="email">
                </div>
                <div>
                    <span>Contraseña</span>
                    <input type="password" v-model="email">
                </div>
            </div>

            <button @click="signIn" class="main__button">
                <span>Iniciar Sesión</span>
            </button>
        </div>
        <div class="main__form notRegistered">
            <span>¿Aún no tienes cuenta?</span>
            <router-link class="main__button" to="/register" >
                <span>Registrarse</span>
            </router-link>
        </div>
    </form>
  </main>
</template>

<script>
import { mapStores } from 'pinia'
import { useAuthenticationStore } from '../stores/authentication'
export default {
    computed: {
        ...mapStores(useAuthenticationStore),
        userIsLogged(){
                return this.authenticationStore.user !== null
            }
    },
    methods: {
        signIn(){
            this.authenticationStore.signIn(this.email, this.password)
            this.authenticationStore.getUserData()
        }
    },
    mounted(){
        console.log(auth.currentUser)
    },
}
</script>

<style>

</style>