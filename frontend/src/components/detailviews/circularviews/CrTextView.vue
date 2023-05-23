<template>
    <main class="cContentDetail">
        <section class="contentImg">
            <img src="@/assets/images/radiosamancard.jpg" alt="contentimg">
        </section>
        <section class="contentData" v-if="content && content.metadatos">
            <div class="contentData__categoryContainer">
                <div class="contentData__categoryContainer category" v-for="(category, index) in content.categoria" :key="index">
                    <span class="badge rounded-pill">#{{ category }}</span>
                </div>
            </div>
            <div class="contentData__title">
                <h2>{{ content.titulo }}</h2>
                <h5>{{ content.views }} Vistas</h5>
            </div>
            <div class="contentData__interactions">
                <button @click="$emit('like')">{{ content.likes }} Like</button>
                <button @click="$emit('share')">Compartir</button> 
            </div>
            <div class="contentData__autor">
                <h5><span>Por </span>{{ content.metadatos.autor }}</h5> 
                <span>{{ content.metadatos.fecha }}</span> 
            </div>
        </section>
        <section v-if="content && content.metadatos.url" class="contentPdf">
            <embed :src="content.metadatos.url" type="application/pdf"/>
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
    .cContentDetail{
        display: flex;
        flex-direction: column;
    }
    .contentImg{
        width: 100%;
        height: 30vw;
        overflow: hidden;

        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .contentData{
        display: flex;
        flex-direction: column;
        padding: 0 10vw 0 10vw;
        margin-top: 2vw;
        margin-bottom: 2vw;

        &__categoryContainer{
            display: flex;
            flex-direction: row;
            margin-bottom: .5vw;
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

        &__title{
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

        &__interactions{
            flex-direction: row;
                margin-bottom: 2vw;
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

        &__autor{
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
    .contentPdf {
        width: 100%;
        padding: 0 10vw 4vw 10vw;

        embed {
            width: 100%;
            height: 40vw;
        }
    }
</style>