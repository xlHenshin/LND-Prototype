<template>
    <form class="form">
        <div class="form__title">
            <h1>Contenidos</h1>
            <span>Todos</span>
        </div>

        <div class="form__filters">
            <h3>Filtra los contenidos por categorías</h3>
            <div>
                <select v-model="selectedCategory">
                <option disabled value="">Selecciona una categoría</option>
                <option value="socpol">Social y Político</option>
                <option value="entretenimiento">Entretenimiento</option>
                <option value="educacion">Educación</option>
                <option value="genfem">Género y Feminismo</option>
                <option value="deportes">Deportes</option>
                <option value="comunicacion">Comunicación</option>
                <option value="tech">Tecnología</option>
                <option value="arteCulLit">Arte, Cultura y Literatura</option>
                </select>
            </div>
        </div>

        <div>
            <h3>Ordenar</h3>

            <div>
                <select v-model="selectedCategory">
                    <option disabled value="">Ordenar por...</option>
                    <option value="masVistos">Más vistos</option>
                    <option value="masGustados">Más gustados</option>
                    <option value="masCompartidos">Más compartidos</option>
                </select>
            </div>
        </div>
    </form>
</template>

<script>
export default {
  data() {
    return {
      selectedCategory: "",
      selectedOrder: "",
    };
  },
};
</script>

<style lang="scss">

    .form{
        padding: 8vw 10vw 4vw 10vw;
    }

</style>