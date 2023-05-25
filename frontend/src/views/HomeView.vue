<template>
    <main class="landing">
        <section class="hero">
            <div class="hero__text">
                <h1>Laboratorio de<br/>Narrativas Digitales</h1>
                <p>Conoce el nuevo espacio que tenemos para ti y<br/>conéctate con los contenidos exclusivos del laboratorio.</p>
            </div>
            <router-link class="hero__button" to="/search/todos">
                <span class="text">Ir a los contenidos</span>
            </router-link>
        </section>

        <section class="contents">
            <div class="contents__maintext">
                <h2>¿Qué hacemos en el Lab?</h2>
                <p>El laboratorio de Narrativas Digitales es un espacio del programa de comunicación<br/>
                    de la Universidad ICESI en donde se produce contenido editorial de los estudiantes<br/>
                    para los estudiantes.</p>
            </div>
            <div class="contents__cards">
                <div class="contents__cards card">
                    <AvSvg class="contentIcon"/>
                    <h3>Audiovisuales</h3>
                    <span>Contenidos de largometrajes y cortometrajes.</span>
                </div>
                <div class="contents__cards card">
                    <SonoroSvg class="contentIcon"/>
                    <h3>Sonoros</h3>
                    <span>Escucha los programas de Radio Samán y Radiodramas</span>
                </div>
                <div class="contents__cards card">
                    <EscritosSvg class="contentIcon"/>
                    <h3>Escritos</h3>
                    <span>Disfruta artículos de Papel de Colgadura o de estudiantes.</span>
                </div>
            </div>
        </section>

        <section class="medios">
            <div class="medios__text">
                <h2>Conoce nuestros medios</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget 
                    elit tristique, consectetur odio nec, iaculis erat. Nam quam orci, 
                    tempus nec ultrices sit amet, egestas vel leo.</p>
            </div>

            <div class="medios__columns">
                <div class="medios__columns left">
                    <div class="medios__columns item">
                        <div class="medios__columns itemTitle">
                            <RsSvg class="mediosIcon"/>
                            <h3>Radio Samán</h3>
                        </div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget elit tristique, consectetur odio nec, iaculis erat. </p>
                    </div>
                    <div class="medios__columns item">
                        <div class="medios__columns itemTitle">
                            <CircularSvg class="mediosIcon"/>
                            <h3>Circular</h3>
                        </div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget elit tristique, consectetur odio nec, iaculis erat. </p>
                    </div>
                </div>
                <div class="medios__columns right">
                    <div class="medios__columns item">
                        <div class="medios__columns itemTitle">
                            <PdcSvg class="mediosIcon"/>
                            <h3>Papel de Colgadura</h3>
                        </div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget elit tristique, consectetur odio nec, iaculis erat. </p>
                    </div>
                </div>
            </div>
        </section>

        <section class="equipo">
            <div class="equipo__columns">
                <div class="equipo__columns left">
                    <div class="equipo__text">
                        <h2>Conoce a nuestro equipo</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget elit tristique, consectetur odio nec, iaculis erat. Nam quam orci, tempus nec ultrices sit amet, egestas vel leo.</p>
                    </div>
                    <router-link class="equipo__button" to="/">
                        <span>Conoce más sobre el equipo</span>
                    </router-link>
                </div>

                <div class="equipo__columns right">
                    <div id="carouselExample" class="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img src="../assets/images/person1.jpg" class="d-block custom-carousel-image" alt="...">
                        </div>
                        <div class="carousel-item">
                            <img src="../assets/images/person2.jpg" class="d-block custom-carousel-image" alt="...">
                        </div>
                        <div class="carousel-item">
                            <img src="../assets/images/person3.jpg" class="d-block custom-carousel-image" alt="...">
                        </div>
                        </div>
                    </div>
                    <div class="team-member-info">
                        <h3 class="member-name">Nombre del miembro</h3>
                        <p class="member-role">Rango del miembro</p>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
import RsSvg from '../assets/icons/RsSvg.vue'
import PdcSvg from '../assets/icons/PdcSvg.vue'
import CircularSvg from '../assets/icons/CircularSvg.vue'
import AvSvg from '../assets/icons/AvSvg.vue'
import SonoroSvg from '../assets/icons/SonoroSvg.vue'
import EscritosSvg from '../assets/icons/EscritosSvg.vue'
import { mapStores } from 'pinia';
import { useAuthenticationStore } from '../stores/authentication';
import { useUiStore } from '../stores/uiStore.js';

export default {
    components: {
        RsSvg,
        PdcSvg,
        CircularSvg,
        AvSvg,
        SonoroSvg,
        EscritosSvg
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
        this.uiStore.toggleSidebar(true)
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
                    this.authenticationStore.getUserData()
                        .then(() => {
                            console.log('User info after getUserData: ', this.userInfo);
                            console.log('User info from store after getUserData: ', this.authenticationStore.getUserInfo);
                            resolve();
                        })
                        .catch((error) => {
                            console.error('Error cargando datos del usuario:', error);
                            reject(error);
                        });
                } else {
                    reject('User is not logged in');
                }
            });
        },
    },
}
</script>

<style lang="scss">
    .landing{
        width: 100%	;

        .hero{

            padding:  15vw 10vw 10vw 10vw;
            background-color: #D9D9D9;

            &__text{

                margin-bottom: 2.5vw;

                h1 {
                    font-size: 4vw;
                    font-weight: 600;
                    line-height: .9;
                    margin-bottom: 1.5vw;
                }
                p {
                    font-weight: normal;
                    font-size: 1vw;
                    line-height: 1.2;
                }
            }

            &__button{
                display: inline-block;
                padding: 0.5rem 2rem;
                background-color: #454545;
                color: white;
                border-radius: 4px;
                text-decoration: none;
                font-weight: normal;
                transition: background-color 0.2s ease-out;
            }

            &__button:hover{
                background-color: #1d1d1d;
            }
        }

        .contents{

            padding:  4vw 10vw 4vw 10vw;


            &__maintext{
                display: flex;
                flex-direction: column;
                align-items: center;
                margin-bottom: 2.5vw;
                h2 {
                    font-weight: 600;
                    font-size: 2.5vw;
                    margin-bottom: 1.5vw;
                }
                p {
                    font-weight: normal;
                    font-size: 1vw;
                    line-height: 1.2;
                    text-align: center;
                }
            }

            &__cards{
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                gap: 4vw;

                .card{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 2vw 4vw;
                    gap: 0vw;
                    border: none;

                    h3{
                        font-weight: 600;
                        font-size: 1.25vw;
                    }
                    span{
                        font-weight: normal;
                        font-size: 0.8vw;
                        text-align: center;
                    }

                    .contentIcon{
                        width: 100px;
                    }
                }
            }
        }

        .medios{
            padding:  4vw 10vw 4vw 10vw;
            &__text{
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                gap: 2vw;
                margin-bottom: 4vw;

                h2 {
                    font-weight: 600;
                    font-size: 2.5vw;
                    margin-bottom: 1.5vw;
                    width: 50%;
                }
                p {
                    font-weight: normal;
                    font-size: 1vw;
                    line-height: 1.2;
                    text-align: left;
                    width: 50%;
                }
            }

            &__columns{
                display: flex;
                flex-direction: row;
                align-items: stretch;
                position: relative;

                .left{
                    flex-direction: column;
                    align-items: flex-end;
                }

                .right{
                    flex-direction: column;
                    position: relative;
                    justify-content: center;

                    &::before {
                        content: "";
                        position: absolute;
                        left: 0;
                        top: 0;
                        bottom: 0;
                        width: 0.1vw;
                        background-color: #454545;
                    }
                }

                .item{
                    display: flex;
                    flex-direction: column;
                    margin: 2vw 0;
                    width: 100%;
                    padding: 0 6vw;

                    .itemTitle{
                        width: 100%;
                        display: flex;
                        justify-content: flex-start;
                        margin-bottom: 1vw;
                        align-items: center;

                        .mediosIcon{
                            margin-right: 1.2vw;
                        }

                        h3 {
                            font-weight: 600;
                            font-size: 1.875vw;
                        }
                    }

                    p{
                        font-weight: normal;
                        font-size: 1vw;
                        line-height: 1.2;
                        text-align: left;
                        width: 80%;
                    }
                }
                
            }
        }

        .equipo {
            padding:  4vw 10vw 4vw 10vw;

            &__columns {
                display: flex;
                flex-direction: row;
                width: 100%;
                justify-content: space-between;
                align-items: center;

                .left {
                display: flex;
                flex-direction: column;
                width: 45%;
                align-items: flex-start; // Añade esta línea para centrar el botón horizontalmente
                }

                .right {
                display: flex;
                flex-direction: column;
                width: 45%;

                    .carousel {
                        width: 100%; // Ajusta el ancho según sea necesario
                        height: auto; // Ajusta la altura según sea necesario
                    }

                    .team-member-info {
                        text-align: center;

                        .member-name {
                        font-size: 1.5rem; // Ajusta el tamaño de fuente según sea necesario
                        font-weight: 600;
                        margin-top: 1rem;
                        }

                        .member-role {
                        font-size: 1.25rem; // Ajusta el tamaño de fuente según sea necesario
                        font-weight: normal;
                        margin-top: 0.5rem;
                        }
                    }

                    .custom-carousel-image {
                        border-radius: 1vw;
                        width: 16vw;
                        height: 22vw;
                        object-fit: cover;
                        margin-left: auto;
                        margin-right: auto; /* Asegura que la imagen se ajuste al contenedor manteniendo su relación de aspecto */
                    }
                }
            }

            &__text {

                margin-bottom: 2.5vw;
                h2 {
                font-weight: 600;
                font-size: 2.5vw;
                margin-bottom: 1.5vw;
                }
                p {
                font-weight: normal;
                font-size: 1vw;
                line-height: 1.2;
                text-align: left;
                }
            }

            &__button {
                text-align: center;
                display: inline-block;
                padding: 0.5rem 2rem;
                background-color: #454545;
                color: white;
                border-radius: 4px;
                text-decoration: none;
                font-weight: normal;
                transition: background-color 0.2s ease-out;
            }

            &__button:hover{
                background-color: #1d1d1d;
            }
        }

    }
</style>