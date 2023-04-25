<template>
  <aside :class="`${is_expanded && 'is-expanded'}`">
    <div class="logo">
        <img src="../assets/logo.png" alt="Vue">
    </div>

    <div class="menu-toggle-wrap">
        <button class="menu-toggle" @click="ToggleMenu">
            <span class="material-icons">keyboard_double_arrow_right</span>
        </button>
    </div>

    <div class="item-groups">

        <div class="content">
            <h3>CONTENIDO</h3>
            <div class="content__items">
                <router-link class="button" to="/">
                    <span data-feather="radio">Todos</span>
                    <span class="text">Todos</span>
                </router-link>
                <router-link class="button" to="/">
                    <span data-feather="video">Video</span>
                    <span class="text">Audiovisuales</span>
                </router-link>
                <router-link class="button" to="/">
                    <span data-feather="volume-2">Audio</span>
                    <span class="text">Sonoros</span>
                </router-link>
                <router-link class="button" to="/">
                    <span data-feather="book-open">Texto</span>
                    <span class="text">Escritos</span>
                </router-link>
            </div>
        </div>

        <div class="media">
            <h3>MEDIOS</h3>
            <div class="content__items">
                <router-link class="button" to="/">
                    <span data-feather="radio">Todos</span>
                    <span class="text">Radio Samán</span>
                </router-link>
                <router-link class="button" to="/">
                    <span data-feather="video">Video</span>
                    <span class="text">Papel de Colgadura</span>
                </router-link>
                <router-link class="button" to="/">
                    <span data-feather="volume-2">Audio</span>
                    <span class="text">Circular</span>
                </router-link>
            </div>
        </div>

        <div class="community">
            <h3>COMUNIDAD</h3>
            <div class="content__items">
                <router-link class="button" to="/">
                    <span data-feather="radio">Todos</span>
                    <span class="text">Sobre nosotros</span>
                </router-link>
                <router-link class="button" to="/">
                    <span data-feather="video">Video</span>
                    <span class="text">Manifiesto</span>
                </router-link>
                <router-link class="button" to="/">
                    <span data-feather="volume-2">Audio</span>
                    <span class="text">Nuestros valores</span>
                </router-link>
                <router-link class="button" to="/">
                    <span data-feather="book-open">Texto</span>
                    <span class="text">Nuestro equipo</span>
                </router-link>
            </div>
        </div>

    </div>
    
  </aside>
</template>

<script setup>
import {ref} from 'vue'
import { onMounted } from 'vue';
import feather from 'feather-icons';

onMounted(() => {
    feather.replace();
});

let is_expanded = ref(false)

const ToggleMenu = () => {
    is_expanded.value = !is_expanded.value
}

</script>

<style lang="scss" scoped>
aside{
    display: flex;
    flex-direction: column;
    width: calc(2rem + 32px);
    min-height: 100vh;
    overflow: hidden;
    padding: 1rem;

    background-color:beige;
    
    transition: 0.2s ease-out;

    .logo{
        margin-bottom: 1rem;

        img{
            width: 2rem;
        }
    }

    .menu-toggle-wrap{
        display: flex;
        justify-content: flex-end;
        margin-bottom: 1rem;

        position: relative;
        top: 0;
        transition: 0.2s ease-out;

        .menu-toggle{
            transition: 0.2s ease-out;
            border: none;
            background: none;
            cursor: pointer;
            outline: none;

            .material-icons{
                font-size: 2rem;
                color: black;
                transition: 0.2s ease-out;
            }

            &:hover{
                .material-icons{
                    color: blue;
                    transform: translateX(0.5rem);
                }
            }
        }
    }

    &.is-expanded{
        width: 300px;

        .menu-toggle-wrap{
            top: -3rem;
            .menu-toggle{
                transform: rotate(-180deg);
            }
        }
    }

    @media (max-width: 768px){
        position: fixed;
        z-index: 99;
    }
}
</style>