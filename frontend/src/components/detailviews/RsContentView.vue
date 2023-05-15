<template>
    <main>
        <section v-if="content && content.metadatos">
            <article>
                <div>
                    <img src="@/assets/images/radiosamancard.jpg" alt="contentimg">
                </div>
                <div>
                    <div v-for="(category, index) in content.categoria" :key="index">
                        <span class="badge rounded-pill">#{{ category }}</span>
                    </div>
                    <div>
                        <h2>{{ content.titulo }}</h2>
                        <h5>{{ content.views }} Vistas</h5>
                    </div>
                    <div>
                        <button>{{ content.likes }} Like</button>
                        <button>Compartir</button> 
                    </div>
                    <div>
                        <h5>La Sala · Temporada {{ content.metadatos.temporada }}</h5> 
                        <span>{{ content.metadatos.fecha }}</span> 
                    </div>
                </div>
            </article>
            <article>
                <div>
                    <h5>Sobre el episodio</h5> 
                    <p>{{ content.metadatos.descripcion }}</p>
                </div>
                <router-link to="/">Ver todos los episodios</router-link>
            </article>
        </section>
        <section v-else>
            <h2>Cargando contenido</h2>
        </section>
        
        <article>
            <span>Contenido relacionado</span>
        </article>
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

<style>

</style>