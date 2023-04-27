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

    <div class="menu">

        <div class="content">
            <h3>CONTENIDO</h3>
            <div class="content__items">
                <router-link class="button" to="/">
                    <img class="menuIcon" :src="todoIcon" alt="Equipo" />
                    <span :class="{'hidden-text':!is_expanded}" class="text">Todos</span>
                </router-link>
                <router-link class="button" to="/">
                    <img class="menuIcon" :src="avIcon" alt="Equipo" />
                    <span class="text">Audiovisuales</span>
                </router-link>
                <router-link class="button" to="/">
                    <img class="menuIcon" :src="sonoroIcon" alt="Equipo" />
                    <span class="text">Sonoros</span>
                </router-link>
                <router-link class="button" to="/">
                    <img class="menuIcon" :src="escritosIcon" alt="Equipo" />
                    <span class="text">Escritos</span>
                </router-link>
            </div>
        </div>

        <div class="content">
            <h3>MEDIOS</h3>
            <div class="content__items">
                <router-link class="button" to="/">
                    <img class="menuIcon" :src="rsIcon" alt="Valores" />
                    <span class="text">Radio Samán</span>
                </router-link>
                <router-link class="button" to="/">
                    <img class="menuIcon" :src="pdcIcon" alt="Valores" />
                    <span class="text">Papel de Colgadura</span>
                </router-link>
                <router-link class="button" to="/">
                    <img class="menuIcon" :src="circularIcon" alt="Valores" />
                    <span class="text">Circular</span>
                </router-link>
            </div>
        </div>

        <div class="content">
            <h3>COMUNIDAD</h3>
            <div class="content__items">
                <router-link class="button" to="/">
                    <img class="menuIcon" :src="rsIcon" alt="Valores" />
                    <span class="text">Sobre nosotros</span>
                </router-link>
                <router-link class="button" to="/">
                    <img class="menuIcon" :src="manifiestoIcon" alt="Manifiesto" />
                    <span class="text">Manifiesto</span>
                </router-link>
                <router-link class="button" to="/">
                    <img class="menuIcon" :src="valueIcon" alt="Valores" />
                    <span class="text">Nuestros valores</span>
                </router-link>
                <router-link class="button" to="/">
                    <img class="menuIcon" :src="equipoIcon" alt="Equipo" />
                    <span class="text">Nuestro equipo</span>
                </router-link>
            </div>
        </div>

    </div>
    
  </aside>
</template>

<script setup>
import {ref} from 'vue'
import todoicon from '../assets/todo-icon.svg';
import avicon from '../assets/av-icon.svg';
import sonoroicon from '../assets/sonoro-icon.svg';
import escritosicon from '../assets/escritos-icon.svg';
import radiosamanicon from '../assets/radiosaman-icon.svg';
import pdcicon from '../assets/pdc-icon.svg';
import circularicon from '../assets/circular-icon.svg';
import manifesticon from '../assets/manifest-icon.svg';
import valuesicon from '../assets/values-icon.svg';
import equipoicon from '../assets/equipo-icon.svg';

const todoIcon = todoicon;
const avIcon = avicon;
const sonoroIcon = sonoroicon;
const escritosIcon = escritosicon;
const rsIcon = radiosamanicon;
const pdcIcon = pdcicon;
const circularIcon = circularicon;
const manifiestoIcon = manifesticon;
const valueIcon = valuesicon;
const equipoIcon = equipoicon;

let is_expanded = ref(false)

const ToggleMenu = () => {
    is_expanded.value = !is_expanded.value
}

</script>

<style lang="scss" scoped>

aside{
    display: flex;
    flex-direction: column;
    width: calc(6rem + 32px);
    min-height: 100vh;
    overflow: hidden;
    padding: 1rem;

    font-family: 'Eina02', sans-serif;

    background-color:white;
    
    transition: 0.2s ease-out;
    border-top-right-radius: 1rem;
    border-bottom-right-radius: 1rem;

    .logo{
        margin-bottom: 1rem;

        img{
            width: 2rem;
        }
    }

    .menu-toggle-wrap{
        display: flex;
        justify-content: center;
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


    

    h3 {
        color: #454545;
        font-size: 0.875rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
        text-align: left;
        padding: 0.5rem 1rem;
    }

    .menu{
        margin: 0 -1rem;

        .content{
            margin-bottom: 2rem;
            display: flex;
            flex-direction: column;
            align-items: center;

            &__items{
                display: flex;
                flex-direction: column;
            }
        }

        .button{
            display: flex;
            align-items: center;
            text-decoration: none;
            justify-content: center;

            padding: 0.5rem 1rem;
            transition: 0.2s ease-out;

            .menuIcon{
                transition: 0.2s ease-out;
                stroke: #454545;
                display: flex;
                justify-content: center;
            }

            .text{
                color: #454545;
                transition: 0.2s ease-out;
                white-space: nowrap;
                display: none;
                opacity: 0;
                visibility: hidden;
                transition: opacity 0.3s ease-out, visibility 0.3s ease-out;
                font-size: 0.875rem;
                font-weight: 600;
            }

            &:hover{
                background-color: #454545;

                .menuIcon, .text{
                    stroke: white;
                    color: white;
                }
            }
        }
    }

    &.is-expanded{
        width: 275px;

        .menu-toggle-wrap{
            top: -3rem;
            justify-content: flex-end;
            .menu-toggle{
                transform: rotate(-180deg);
            }
        }

        .content{
            align-items: flex-start;
        }

        .button{

            justify-content: flex-start;
            .menuIcon{
                margin-right: 1rem;
            }

            .text{
                display: flex;
                opacity: 1;
                visibility: visible;
            }
        }

        .content__items{
            margin-left: 1rem;
        }
    }

    @media (max-width: 768px){
        position: fixed;
        z-index: 99;
    }
}
</style>