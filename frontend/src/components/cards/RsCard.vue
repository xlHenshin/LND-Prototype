<template>
    <div class="card">
        <div class="card__body">
            <div class="top">
                <span class="date">{{ content.metadatos.fecha }}</span>
                <div class="categoryContainer">
                  <div class="category" v-for="(category, index) in content.categoria" :key="index">
                    <span class="badge rounded-pill">#{{ category }}</span>
                  </div>
                </div>
            </div>
            <span class="mediaTitle">Radio Samán</span>
            <h4 class="contentTitle">{{ content.titulo }}</h4>
            <p class="programTitle">Nombre del programa</p>
            <p class="season">Temporada {{ content.metadatos.temporada }}</p>
        </div>
        <div class="card__img">
            <img src="@/assets/images/radiosamancard.jpg" alt="" class="card-image">
        </div>
    </div>
</template>
  
  <script>
  export default {
    props: {
      content: {
        type: Object,
        required: true,
      },
    },
  };
  </script>
  
<style scoped lang="scss">

.card{
  width: 22vw;
  height: 22vw;
  &__body{
    display: flex;
    flex-direction: column;
    padding: 1vw 1vw;

    .top{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1vw;
      width: 100%;
      .date{
        font-weight: 300;
        font-size: 1vw;
        color: black;
      }
      .categoryContainer{
        display: flex;
        flex-direction: row;
        
        .category{
          display: inline-block;
          .badge{
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
      .mediaTitle{
        font-weight: 300;
        font-size: .8vw;
        color: black;
      }

      .mediaTitle, .contentTitle, .programTitle, .season{
        color: black;
      }
    }
  }
  &__img{
    width: 100%;
    height: 12vw;
    padding: 1vw;
    overflow: hidden;

    .card-image {
      width: 100%;
      border-radius: 0.5vw;
      object-fit: cover;
    }
  }
}
.badge {
  background-color: #3c3c3c; // Cambia el color de fondo
  color: #ffffff; // Cambia el color del texto
  font-size: 0.8rem; // Cambia el tamaño de fuente
  padding: 0.2rem 0.5rem; // Ajusta el relleno
}
</style>