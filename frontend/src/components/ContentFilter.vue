<template>
    <form class="form">
        <div class="form__title">
            <h1>Contenidos</h1>
            <span>Todos</span>
        </div>

        <div class="form__filters">
            <div class="filter">
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
            <div class="filter">
                <h3>Ordenar</h3>
                <select v-model="selectedOrder" @change="onOrderChange">
                    <option disabled value="">Ordenar por...</option>
                    <option value="masVistos">Más vistos</option>
                    <option value="masGustados">Más gustados</option>
                    <option value="masCompartidos">Más compartidos</option>
                </select>
            </div>

            <button class="resetBtn" @click="resetFilters">Reiniciar filtros</button>
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
    $notosansmono-fontfamily: 'NotoSansMono', sans-serif;
    .form{
        padding: 5vw 10vw 0 10vw;

        &__title{
            display: flex;
            flex-direction: row;
            align-items: baseline;
            margin-bottom: 2vw;

            h1{
                font-size: 2.5vw;
                font-weight: 600;
                margin-right: 3vw;
            }

            span {
                font-family: $notosansmono-fontfamily;
                font-size: 1vw;
                font-weight: normal;
                color: #6546FC;
            }
        }

        &__filters{
            display: flex;
                flex-direction: row;
                justify-content: space-between;
                margin-bottom: 4vw;
                align-items: flex-end;

                .filter{
                    margin-right: 6vw;

                    h3{
                        font-size: 1vw;
                        font-weight: 600;
                        margin-bottom: 1vw;
                    }

                    select{
                        font-size: 1vw;
                        width: 15.5vw;
                        padding: .5vw;
                        font-weight: 300;
                        color: #6546FC;
                        border-color: #6546FC;
                    }
                }
                .resetBtn{
                    width: 10vw;
                    height: 3vw;
                    font-size: 1vw;
                    padding: .5vw;
                    font-weight: 600;
                    border-radius: .5vw;
                    color: #6546FC;
                    border-color: #6546FC;
                }
        }
    }

</style>