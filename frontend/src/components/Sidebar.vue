<template>
    <aside :class="`${is_expanded && 'is-expanded'}`">
        <div class="logo">
            <div class="lndBrand">
                <router-link to="/" class="lndLogo">
                    <img src="../assets/lndlogo.png" alt="LND">
                </router-link>
                <div class="lndTitle">
                    <h2 class="lndTitle__top">Laboratorio</h2>
                    <h2 class="lndTitle__bottom">Narrativas Digitales</h2>
                </div>
            </div>
            <button class="arrow" @click="ToggleMenu">
                <span class="material-icons" v-text="is_expanded ? 'chevron_left' : 'chevron_right'"></span>
            </button>
        </div>
    
        <div class="menu custom-scrollbar">
    
            <div class="content">
                <h3>CONTENIDO</h3>
                <div class="content__items">
                    <router-link class="button" to="/search">
                        <TodoSvg class="menuIcon"/>
                        <span class="text">Todos</span>
                    </router-link>
                    <router-link class="button" to="/search">
                        <AvSvg class="menuIcon"/>
                        <span class="text">Audiovisuales</span>
                    </router-link>
                    <router-link class="button" to="/search">
                        <SonoroSvg class="menuIcon"/>
                        <span class="text">Sonoros</span>
                    </router-link>
                    <router-link class="button" to="/search">
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
    
            <div class="user">
                <div class="loggedUser" v-if="userIsLogged">
                    <div class="userInfo">
                        <div class="userInfo__icon">
                            <div v-if="isImageLoading" class="loading-indicator"></div>
                            <img v-else :src="userInfo.length > 0 && userInfo[0].url ? userInfo[0].url : defaultProfilePic" alt="Imagen de perfil" />
                        </div>
    
                        <div class="userInfo__data">
                            <span class="username">{{userInfo[0].username}}</span>
                            <span class="email">{{userInfo[0].email}}</span>
                        </div>
                    </div>
                    
                    <button class="userOptions" @click="toggleOptions">
                        <span class="material-icons more">more_vert</span>
                    </button>
                    <div class="options" v-show="optionsVisible">
                        <router-link class="options__profile" to="/profile">Mi perfil</router-link>
                        <div class="options__logout" @click="logout">Cerrar sesión</div>
                    </div>
                </div>
                <router-link v-else class="notLoggedUser" to="/login">
                    <span>Iniciar sesión</span>
                </router-link>
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
    import defaultProfilePic from '../assets/images/DefaultUser.png';
    import { mapStores } from 'pinia';
    import { useAuthenticationStore } from '../stores/authentication';
    import { useUiStore } from '../stores/uiStore.js';
    
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
            optionsVisible: false,
            isImageLoading: false,
            defaultProfilePic
            };
        },
        computed: {
            ...mapStores(useAuthenticationStore, useUiStore),
            userIsLogged(){
                    return this.authenticationStore.user !== null
                },
            userInfo(){
                return this.authenticationStore.getUserInfo;
            }
        },
        async created() {
            await this.authenticationStore.authState();
            if(this.userIsLogged){
                try {
                    await this.loadUserData();
                } catch (error) {
                    console.error('Failed to load user data:', error);
                }
            }
        },
        methods: {
            async loadUserData() {
                return new Promise((resolve, reject) => {
                    if(this.userIsLogged){
                        this.isImageLoading = true;
                        this.authenticationStore.getUserData()
                            .then(() => {
                                this.userInfoLoaded = true;
                                this.isImageLoading = false;
                                console.log('User info after getUserData: ', this.userInfo);
                                console.log('User info from store after getUserData: ', this.authenticationStore.getUserInfo);
                                resolve();
                            })
                            .catch((error) => {
                                console.error('Error cargando datos del usuario:', error);
                                this.isImageLoading = false;
                                reject(error);
                            });
                    } else {
                        reject('User is not logged in');
                    }
                });
            },
            ToggleMenu() {
                this.is_expanded = !this.is_expanded;
                this.uiStore.toggleSidebarExpanded(!this.uiStore.isSidebarExpanded);
            },
            toggleOptions(){
                this.optionsVisible = !this.optionsVisible;
            },
            async logout(){
                await this.authenticationStore.logOut();
                this.$router.push('/');
            }
        },
        created() {
            this.emitter = inject('emitter');
        },
    };
    </script>
    
    <style scoped lang="scss">
    
    aside{
        display: flex;
        flex-direction: column;
        width: calc(6vw + 32px);
        height: 100%;
        box-sizing: border-box;
        padding: 3rem 1rem;
    
        font-family: 'Eina02', sans-serif;
    
        background-color:white;
        
        transition: 0.2s ease-out;
        border-top-right-radius: 1rem;
        border-bottom-right-radius: 1rem;
    
        .logo{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            height: 10%;
            .lndBrand{
                justify-content: center;
                display: flex;
                flex-direction: row;
                margin-bottom: 1rem;
                .lndLogo{
                    width: 4rem;
                    overflow: hidden;
                    img{
                        width: 100%;
                        object-fit: cover;
                    }
                }
            }
        }
    
        .lndTitle{
            margin-left: 1rem;
            font-family: 'Raleway', sans-serif;
            color: #6546FC;
            display: none;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s ease-out, visibility 0.3s ease-out;
            flex-direction: column;
            justify-content: center;
            &__top{
                font-weight: normal;
                font-size: 1rem;
            }
    
            &__bottom{
                margin-top: -.5rem;
                font-weight: 600;
                font-size: 1rem;
                white-space: nowrap;
            }
        }
    
        .arrow{
            width: 2rem;
            border: none;
            background: none;
            cursor: pointer;
            outline: none;
            .material-icons{
                width: 100%;
                font-size: 2rem;
                color: #757575;
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
            height: 80%;
            overflow-y: auto;
            overflow-x: hidden;
            display: flex;
            flex-direction: column;
            margin-top: 2vw;
            margin-bottom: 2vw;
    
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
    
        .user{
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            align-items: center;
            margin-top: auto;
            height: 10%;
        }
    
        .loggedUser{
            display: flex;
            flex-direction: row;
            justify-content: center;
            width: 100%;
        }
    
        .userInfo{
            display: flex;
            flex-direction: row;
    
            &__icon{
                width: 2.5vw;
                height: 2.5vw;
                border-radius: 50%;
                overflow: hidden;
    
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
                    object-fit: cover;
                }
            }
    
            &__data{
                display: none;
                margin-left: 1rem;
                color: #454545;
                transition: 0.2s ease-out;
                white-space: nowrap;
                opacity: 0;
                visibility: hidden;
                transition: opacity 0.3s ease-out, visibility 0.3s ease-out;
    
                span{
                    font-size: 1rem;
                }
    
                .username{
                    font-weight: 600;
                }
    
                .email{
                    font-weight: normal;
                }
            }
        }
        .userOptions {
            color: #454545;
            height: 1.5rem;
            align-items: center;
            transition: 0.2s ease-out;
            white-space: nowrap;
            display: none;
            border: none;
            background: none;
            cursor: pointer;
            outline: none;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s ease-out, visibility 0.3s ease-out;
    
            .material-icons{
                width: 100%;
                font-size: 1.5rem;
                color: #757575;
                transition: 0.2s ease-out;
            }
        }
    
        .options{
            display: flex;
            flex-direction: column;
            position: absolute;
            text-align: center;
            font-weight: 600;
            text-decoration: none;
            width: 10rem;
            font-size: 0.875rem;
            right: -10rem;
            border-radius: 0.625rem;
            background-color: white;
            box-shadow: 0px 8px 8px 0px rgba(0,0,0,0.2);
    
            &__profile{
                color: black;
                padding: 1rem 2rem 0rem 2rem;
                text-decoration: none;
                cursor: pointer;
            }
    
            &__logout{
                color: black;
                padding: 1rem 2rem 1rem 2rem;
                text-decoration: none;
                cursor: pointer;
            }
        }
        &.is-expanded{
            width: calc(16vw + 32px);
    
            .logo{
                justify-content: space-between;
                align-items: center;
                flex-direction: row;
            }
    
            .lndTitle{
                display: flex;
                opacity: 1;
                visibility: visible;
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
            .loggedUser{
                justify-content: space-between;
            }
            .userInfo__data {
                display: flex;
                opacity: 1;
                visibility: visible;
                flex-direction: column;
            }
    
            .userOptions {
                display: flex;
                opacity: 1;
                visibility: visible;
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