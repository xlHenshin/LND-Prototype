<template>
    <form class="form">
        <div class="form__title">
            <h1>Contenidos</h1>
            <span>Todos</span>
        </div>

        <div class="form__filters">
            <div class="form__filter">
                <h3>Filtra los contenidos por categorías</h3>
                <select v-model="selectedCategory" @change="onCategoryChange">
                    <option disabled value="">Selecciona una categoría</option>
                    <option value="Social y Político">Social y Político</option>
                    <option value="Entretenimiento">Entretenimiento</option>
                    <option value="Educación">Educación</option>
                    <option value="Género y Feminismo">Género y Feminismo</option>
                    <option value="Deportes">Deportes</option>
                    <option value="Comunicación">Comunicación</option>
                    <option value="Tecnología">Tecnología</option>
                    <option value="Arte, cultura y literatura">Arte, Cultura y Literatura</option>
                </select>
            </div>
            <div class="form__filter">
                <h3>Ordenar</h3>
                <select v-model="selectedOrder" @change="onOrderChange">
                    <option disabled value="">Ordenar por...</option>
                    <option value="masVistos">Más vistos</option>
                    <option value="masGustados">Más gustados</option>
                    <option value="masCompartidos">Más compartidos</option>
                </select>
            </div>

            <button @click="resetFilters">Reiniciar filtros</button>
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
    watch: {
        selectedCategory(value) {
            this.$emit("category-change", value);
        },
        selectedOrder(value) {
            this.$emit("order-change", value);
        },
        resetFilters() {
            this.$emit("reset-filters");
        },
    },
};
</script>

<style scoped lang="scss">

    .form{
        padding: 5vw 10vw 5vw 10vw;

        &__title{
            display: flex;
            flex-direction: row;
            align-items: baseline;

            h1{
                font-size: 4vw;
                font-weight: 600;
                margin-bottom: 1.5vw;
                margin-right: 3vw;
            }

            span {
                font-size: 1.5vw;
                font-weight: normal;
            }
        }

        &__filters{
            display: flex;
            flex-direction: row;
            width: 100%;
            justify-content: space-between;
        }
        &__filter{
            width: 50%;

            h3 {
                font-weight: 600;
                font-size: 1vw;
            }
        }
    }

</style>