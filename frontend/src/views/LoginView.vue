<template>
  <main class="main">
    <form class="main__form">
        <div class="main__form registered">
            <h2>¡Bienvenidx de nuevo!</h2>

            <div class="main__form data">
                <div>
                    <label>Correo electrónico</label>
                    <input type="email" v-model="email">
                </div>
                <div>
                    <label>Contraseña</label>
                    <input type="password" v-model="password" autocomplete="current-password">
                </div>
            </div>

            <button @click="signIn" class="main__button">
                <label>Iniciar Sesión</label>
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
    data() {
        return {
            email: '',
            password: '',
        }
    },
    computed: {
        ...mapStores(useAuthenticationStore),
        userIsLogged(){
            return this.authenticationStore.user !== null
        }
    },
    methods: {
        async signIn(){
            await this.authenticationStore.signIn(this.email, this.password)
            this.authenticationStore.getUserData()
            this.$router.push('/')
        }
    },
    mounted(){
        console.log(this.authenticationStore.user)
    },
}
</script>

<style>

</style>