<template>
    <main class="cContentDetail">
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
                        <button>{{ content.likes }} Like</button>
                        <button>Compartir</button> 
                    </div>
                    <div class="contentData__right program">
                        <h5>{{ subcategoriaFormateada }}</h5>
                        <span>{{ content.metadatos.fecha }}</span> 
                    </div>
                </div>
            </article>
        </section>

        <section v-if="content && content.metadatos.url" class="contentAudio">
            <div class="card">
                <div class="card-content">
                    <h5 class="audioTitle">{{ content.titulo }}</h5>
                    <audio ref="audioRef">
                        <source :src="content.metadatos.url" type="audio/mpeg">
                        Your browser does not support the audio element.
                    </audio>
                    <div class="controls">
                        <button @click="togglePlay">{{ isPlaying ? 'Pause' : 'Play' }}</button>
                        <input v-model="timeline" @change="changeTime" type="range" min="0" max="100">
                        <span>{{ currentTime }} / {{ totalTime }}</span>
                    </div>
                </div>
            </div>
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
    data() {
        return {
            isPlaying: false,
            timeline: 0,
            currentTime: "0:00",
            totalTime: "0:00",
        }
    },
    mounted() {
        this.$refs.audioRef.addEventListener('timeupdate', this.updateTime);
        this.$refs.audioRef.addEventListener('canplaythrough', this.updateTotalTime);
    },
    beforeDestroy() {
        this.$refs.audioRef.removeEventListener('timeupdate', this.updateTime);
        this.$refs.audioRef.removeEventListener('canplaythrough', this.updateTotalTime);
    },
    computed: {
        subcategoriaFormateada() {
            if (this.content.metadatos.subcategoria === 'rad') {
                return 'Radiodrama';
            }
            return this.content.metadatos.subcategoria;
        },
    },
    methods: {
        togglePlay() {
            if (this.isPlaying) {
                this.$refs.audioRef.pause();
            } else {
                this.$refs.audioRef.play();
            }
            this.isPlaying = !this.isPlaying;
        },
        updateTime() {
            let position = this.$refs.audioRef.currentTime / this.$refs.audioRef.duration;
            this.timeline = position * 100;

            let minutes = Math.floor(this.$refs.audioRef.currentTime / 60);
            let seconds = Math.floor(this.$refs.audioRef.currentTime - minutes * 60);
            let minuteValue;
            let secondValue;

            if (minutes < 10) { minuteValue = '0' + minutes; }
            else { minuteValue = minutes; }

            if (seconds < 10) { secondValue = '0' + seconds; }
            else { secondValue = seconds; }

            this.currentTime = minuteValue + ':' + secondValue;
        },
        updateTotalTime() {
            let minutes = Math.floor(this.$refs.audioRef.duration / 60);
            let seconds = Math.floor(this.$refs.audioRef.duration - minutes * 60);
            let minuteValue;
            let secondValue;

            if (minutes < 10) { minuteValue = '0' + minutes; }
            else { minuteValue = minutes; }

            if (seconds < 10) { secondValue = '0' + seconds; }
            else { secondValue = seconds; }

            this.totalTime = minuteValue + ':' + secondValue;
        },
        changeTime() {
            this.$refs.audioRef.currentTime = this.$refs.audioRef.duration * (this.timeline / 100);
        }
    }
}
</script>

<style scoped lang="scss">
    .cContentDetail{
        padding: 8vw 10vw 4vw 10vw;
    }
    .contentData{
        display: flex;
        flex-direction: column;
        justify-content: left;
        width: 100%;
        margin-bottom: 4vw;
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
    }
    .contentAudio{
        width: 60%;
        display: flex;
        flex-direction: column;

        span{
            font-size: 1vw;
            font-weight: 600;
            margin-bottom: .5vw;
            color: #b3b3b3;
        }

        .card {
            background-color: #282828;
            padding: 20px;
            border-radius: 10px;
        }
        .audioTitle {
            font-size: 1vw;
            font-weight: 600;
            color: #fff;
        }

        .controls {
            display: flex;
            align-items: center;
            gap: 20px;
        }

        button {
            background-color: #1DB954;
            border: none;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            color: #fff;
            font-size: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        input[type="range"] {
            flex-grow: 1;
        }
    }
</style>