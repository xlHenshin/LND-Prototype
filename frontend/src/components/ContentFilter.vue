<template>
    <form class="form">
        <div>
            <h1>Contenidos</h1>
            <span>Todos</span>
        </div>

        <div>
            <h3>Filtra los contenidos por categorías</h3>

            <div>
                <label>
                    <input type="checkbox" value="socpol" v-model="selectedCategories">
                    <span>Social y Político</span>
                </label>
                <label>
                    <input type="checkbox" value="entretenimiento" v-model="selectedCategories">
                    <span>Entretenimiento</span>
                </label>
                <label>
                    <input type="checkbox" value="educacion" v-model="selectedCategories">
                    <span>Educación</span>
                </label>
                <label>
                    <input type="checkbox" value="genfem" v-model="selectedCategories">
                    <span>Género y Feminismo</span>
                </label>
                <label>
                    <input type="checkbox" value="deportes" v-model="selectedCategories">
                    <span>Deportes</span>
                </label>
                <label>
                    <input type="checkbox" value="comunicacion" v-model="selectedCategories">
                    <span>Comunicación</span>
                </label>
                <label>
                    <input type="checkbox" value="tech" v-model="selectedCategories">
                    <span>Tecnología</span>
                </label>
                <label>
                    <input type="checkbox" value="arteCulLit" v-model="selectedCategories">
                    <span>Arte, Cultura y Literatura</span>
                </label>
            </div>
        </div>

        <div>
            <h3>Ordenar</h3>

            <div>
                <button>
                    <span>Más vistos</span>
                </button>

                <button>
                    <span>Más gustados</span>
                </button>

                <button>
                    <span>Más compartidos</span>
                </button>
            </div>
        </div>
    </form>
</template>

<script>

</script>

<style lang="scss">

    .form{
        padding: 0 9.5rem 0 9.5rem;
    }

</style>