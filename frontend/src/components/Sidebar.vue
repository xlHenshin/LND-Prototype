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

    <div class="menu custom-scrollbar">

        <div class="content">
            <h3>CONTENIDO</h3>
            <div class="content__items">
                <router-link 
                class="button"
                to="/search"
                @click.native="onTypeSelected('all')">
                    <TodoSvg class="menuIcon"/>
                    <span :class="{'hidden-text':!is_expanded}" class="text">Todos</span>
                </router-link>
                <router-link
                class="button"
                to="/search"
                @click.native="onTypeSelected('audiovisual')">
                    <AvSvg class="menuIcon"/>
                    <span class="text">Audiovisuales</span>
                </router-link>
                <router-link
                class="button"
                to="/search"
                @click.native="onTypeSelected('sonoro')">
                    <SonoroSvg class="menuIcon"/>
                    <span class="text">Sonoros</span>
                </router-link>
                <router-link
                class="button"
                to="/search"
                @click.native="onTypeSelected('escrito')">
                    <EscritosSvg class="menuIcon"/>
                    <span class="text">Escritos</span>
                </router-link>
            </div>
        </div>

        <div class="content">
            <h3>MEDIOS</h3>
            <div class="content__items">
                <router-link class="button" to="/radiosaman">
                    <RsSvg class="menuIcon"/>
                    <span class="text">Radio Samán</span>
                </router-link>
                <router-link class="button" to="/">
                    <PdcSvg class="menuIcon"/>
                    <span class="text">Papel de Colgadura</span>
                </router-link>
                <router-link class="button" to="/circular">
                    <CircularSvg class="menuIcon"/>
                    <span class="text">Circular</span>
                </router-link>
            </div>
        </div>

        <div class="content">
            <h3>COMUNIDAD</h3>
            <div class="content__items">
                <router-link class="button" to="/">
                    <EscritosSvg class="menuIcon"/>
                    <span class="text">Sobre nosotros</span>
                </router-link>
                <router-link class="button" to="/">
                    <ManifestSvg class="menuIcon"/>
                    <span class="text">Manifiesto</span>
                </router-link>
                <router-link class="button" to="/">
                    <ValoresSvg class="menuIcon"/>
                    <span class="text">Nuestros valores</span>
                </router-link>
                <router-link class="button" to="/">
                    <EquipoSvg class="menuIcon"/>
                    <span class="text">Nuestro equipo</span>
                </router-link>
            </div>
        </div>

    </div>
    
  </aside>
</template>

<script>
import { inject } from 'vue';
import AvSvg from '../assets/icons/AvSvg.vue';
import CircularSvg from '../assets/icons/CircularSvg.vue';
import EquipoSvg from '../assets/icons/EquipoSvg.vue';
import EscritosSvg from '../assets/icons/EscritosSvg.vue';
import ManifestSvg from '../assets/icons/ManifestSvg.vue';
import PdcSvg from '../assets/icons/PdcSvg.vue';
import RsSvg from '../assets/icons/RsSvg.vue';
import SonoroSvg from '../assets/icons/SonoroSvg.vue';
import TodoSvg from '../assets/icons/TodoSvg.vue';
import ValoresSvg from '../assets/icons/ValoresSvg.vue';

export default {
  components: {
    AvSvg,
    CircularSvg,
    EquipoSvg,
    EscritosSvg,
    ManifestSvg,
    PdcSvg,
    RsSvg,
    SonoroSvg,
    TodoSvg,
    ValoresSvg,
  },
  data() {
    return {
      is_expanded: false,
    };
  },
  methods: {
    ToggleMenu() {
      this.is_expanded = !this.is_expanded;
      this.$emit("toggle", this.is_expanded);
    },
    onTypeSelected(type) {
      console.log('Emitting filter-type event:', type);
      this.$emit('filter-type', type);
    },
  },
  created() {
    this.emitter = inject('emitter');
  },
};
</script>

<style lang="scss">

aside{
    display: flex;
    flex-direction: column;
    width: calc(6vw + 32px);
    height: calc(100vh - 2rem);
    box-sizing: border-box;
    padding: 1rem;
    margin-top: 1rem;
    margin-bottom: 1rem;

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
        font-size: 0.8vw;
        font-weight: 600;
        margin-bottom: 0.5rem;
        text-align: left;
        padding: 0.5rem 1rem;
    }

    .menu{
        max-width: 100%;
        
        overflow-y: auto;
        overflow-x: hidden;
        height: 100%;
        display: flex;
        flex-direction: column;

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
                font-size: 0.8vw;
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
        width: calc(16vw + 32px);

        .menu-toggle-wrap{
            top: -3rem;
            justify-content: flex-end;
            .menu-toggle{
                transform: rotate(-180deg);
            }
        }

        .content{
            align-items: flex-start;
            width: 100%;
        }

        .button{
            max-width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            justify-content: flex-start;
            .menuIcon{
                margin-right: 1rem;
                fill: white;
            }

            .text{
                display: flex;
                opacity: 1;
                visibility: visible;
            }
        }

        .content__items{
            margin-left: 1rem;
            width: 100%;
        }
    }

    @media (max-width: 768px){
        position: fixed;
        z-index: 99;
    }
}

.custom-scrollbar::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    background-color: transparent;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
  }

  .custom-scrollbar::-webkit-scrollbar-track {
    background-color: transparent;
  }
</style>