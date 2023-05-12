<template>
    <main class="main">
        <form class="main__form" @submit.prevent="nextStep">
            <div v-if="step === 1" class="main__form notRegistered">
                <h2>Regístrate para más contenidos</h2>
    
                <div class="main__form data">
                    <div>
                        <span>Nombre de usuario</span>
                        <input type="text" v-model="username">
                    </div>
                    <div>
                        <span>Correo electrónico</span>
                        <input type="email" v-model="email">
                    </div>
                    <div>
                        <span>Contraseña</span>
                        <input type="password" v-model="password">
                    </div>
                    <div>
                        <span>Confirmar contraseña</span>
                        <input type="password" v-model="confirmPassword">
                    </div>
                </div>
    
                <button class="main__button">
                    <span>Continuar</span>
                </button>

                <div class="main__form registered">
                    <span>¿Ya tienes cuenta?</span>
                    <router-link class="main__button" to="/login" >
                        <span>Uniciar sesión</span>
                    </router-link>
                </div>
            </div>

            <div v-else class="main__form favoriteCategories">
                <h2>Selecciona tu contenido favorito</h2>
                <p>Selecciona mínimo 3 categorías de contenidos que te ofre el Laboratorio.</p>
                <div class="categories">
                    <input type="checkbox" :value="'Social y Político'" v-model="selectedCategories" @click="checkMaxSelected">
                    <label>Social y Político</label>

                    <input type="checkbox" :value="'Entretenimiento'" v-model="selectedCategories" @click="checkMaxSelected">
                    <label>Entretenimiento</label>

                    <input type="checkbox" :value="'Género y Feminismo'" v-model="selectedCategories" @click="checkMaxSelected">
                    <label>Género y Feminismo</label>

                    <input type="checkbox" :value="'Deportes'" v-model="selectedCategories" @click="checkMaxSelected">
                    <label>Deportes</label>

                    <input type="checkbox" :value="'Comunicación'" v-model="selectedCategories" @click="checkMaxSelected">
                    <label>Comunicación</label>

                    <input type="checkbox" :value="'Educación'" v-model="selectedCategories" @click="checkMaxSelected">
                    <label>Educación</label>

                    <input type="checkbox" :value="'Arte, cultura y literatura'" v-model="selectedCategories" @click="checkMaxSelected">
                    <label>Arte, Cultura y Literatura</label>
                </div>

                    <button
                    class="main__button"
                    type="submit"
                    @click="register"
                    :disabled="selectedCategories.length > 3 || selectedCategories.length === 0"
                    >
                        <span>Registrarse</span>
                    </button>
            </div>
        </form>
    </main>
</template>
  
<script>
import { useAuthenticationStore } from "@/stores/authentication";
import {mapStores} from 'pinia'
import { auth } from '../firebase/config'

export default {
    data() {
        return {
            step: 1,
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            selectedCategories: [],
        };
    },
    computed: {
        ...mapStores(useAuthenticationStore)
    },
    methods: {
        nextStep() {
            if (this.step === 1) {
                if (
                    this.username === "" ||
                    this.email === "" ||
                    this.password === "" ||
                    this.confirmPassword === ""
                ) {
                    alert("Por favor, completa todos los campos.");
                    return;
                }

                if (this.password !== this.confirmPassword) {
                    alert("Las contraseñas no coinciden.");
                    return;
                }

                this.step = 2;
            }
        },
        register() {
            console.log("SIRVO")
            if (this.selectedCategories.length === 0) {
                alert("Debes seleccionar al menos una categoría.");
                return;
            }

            

            console.log({
                username: this.username,
                email: this.email,
                password: this.password,
                selectedCategories: this.selectedCategories
            });

            this.authenticationStore.newUserAwait(this.username, this.email, this.password, this.selectedCategories)
            alert('¡Usuario creado!') 
        },
        checkMaxSelected(event){
            if (this.selectedCategories.length >= 3 && event.target.checked) {
                event.preventDefault();
            }
        }
    },
    };
</script>

<style>

</style>