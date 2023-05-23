<template>
    <main class="rsContentDetail">
        <section class="contentData" v-if="content && content.metadatos">
            <article class="contentData__top">
                <div class="contentData__left">
                    <img src="@/assets/images/radiosamancard.jpg" alt="contentimg">
                </div>
                <div class="contentData__right">
                    <div class="contentData__right categoryContainer">
                        <div class="contentData__right category" v-for="(category, index) in content.categoria" :key="index">
                            <span class="badge rounded-pill">#{{ category }}</span>
                        </div>
                    </div>
                    <div class="contentData__right title">
                        <h2>{{ content.titulo }}</h2>
                        <h5>{{ content.views }} Vistas</h5>
                    </div>
                    <div class="contentData__right interactions">
                        <button @click="$emit('like')">{{ content.likes }} Like</button>
                        <button @click="$emit('share')">Compartir</button> 
                    </div>
                    <div class="contentData__right program">
                        <h5>La Sala · Temporada {{ content.metadatos.temporada }}</h5> 
                        <span>{{ content.metadatos.fecha }}</span> 
                    </div>
                </div>
            </article>
            <article class="contentData__bottom">
                <div class="contentData__bottom description">
                    <h5>Sobre el episodio</h5> 
                    <p>{{ content.metadatos.descripcion }}</p>
                </div>
                <router-link to="/" class="contentData__bottom btn">Ver todos los episodios</router-link>
            </article>
        </section>
    </main>
</template>

<script>
export default {
    props: {
        content: {
            type: Object,
            required: true,
        },
    },
}
</script>

<style scoped lang="scss">
    .rsContentDetail{
        padding: 8vw 10vw 4vw 10vw;
    }
    .contentData{
        display: flex;
        flex-direction: column;
        justify-content: left;
        width: 100%;
        &__top{
            display: flex;
            flex-direction: row;
            align-items: stretch;
        }
        &__left{
            width: 20vw;
            height: 100%;
            margin-right: 2vw;
            border-radius: 0.5vw;
            overflow: hidden;
            img{
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }

        &__right{
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            .categoryContainer{
                display: flex;
                flex-direction: row;
                margin-bottom: .5vw;
                justify-content: flex-start;

                .category{
                    display: inline-block;
                    span{
                        margin-right: 1vw;
                        background-color: #3c3c3c;
                        color: white;
                        font-size: .8vw;
                        font-weight: normal;
                        &:hover{
                            cursor: pointer;
                        }
                    }
                }
            }
            
            .interactions{
                flex-direction: row;
                margin-bottom: 2vw;
                justify-content: flex-start;
                button{
                    margin-right: 1vw;
                    border: none;
                    border-radius: 2vw;
                    padding: 0.5vw 1vw;
                    background-color: #454545;
                    color: white;
                    font-size: .8vw;
                    font-weight: 600;
                    transition: background-color 0.2s ease-out;
                    &:hover{
                        background-color: #1d1d1d;
                        color: white;
                        cursor: pointer;
                    }
                }
            }
            .title{
                margin-bottom: .5vw;
                h2{
                    font-size: 2.5vw;
                    font-weight: 600;
                    margin-bottom: .5vw;
                }
                h5{
                    font-size: 1vw;
                    font-weight: 600;
                }
            }

            .program{
                h5{
                    font-size: 1vw;
                    font-weight: 600;
                    margin-bottom: .1vw;
                }
                span{
                    font-size: 1vw;
                    font-weight: normal;
                }
            }
        }
        
        &__bottom{
            display: flex;
            flex-direction: column;
            justify-content: left;
            margin-top: 2vw;
            .description{
                width: 100%;
                h5{
                    font-size: 1vw;
                    font-weight: 600;
                    margin-bottom: 1vw;
                }
                p{
                    font-size: 1vw;
                    font-weight: normal;
                }
            }
            .btn{
                width: 20%;
                border: none;
                border-radius: .5vw;
                padding: 0.5vw 1vw;
                background-color: #454545;
                color: white;
                font-size: 1rem;
                font-weight: normal;
                transition: background-color 0.2s ease-out;
                &:hover{
                    background-color: #1d1d1d;
                    color: white;
                    cursor: pointer;
                }
            }
        }
    }
</style>