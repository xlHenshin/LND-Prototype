<template>
    <div class="card mb-4 border-0 content-card">
        <div class="card-body">
            <div class="d-flex justify-content-between">
                <span class="date">{{ content.metadatos.fecha }}</span>
                <div v-for="(category, index) in content.categoria" :key="index">
                    <span class="badge rounded-pill">#{{ category }}</span>
                </div>
            </div>
            <span>Circular</span>
            <h4 class="card-subtitle">{{ content.titulo }}</h4>
            <p class="card-text">{{ content.tipo }}</p>
        </div>
        <div class="card-img-bottom">
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
  
<style lang="scss">

.badge {
  background-color: #3c3c3c; // Cambia el color de fondo
  color: #ffffff; // Cambia el color del texto
  font-size: 0.8rem; // Cambia el tamaño de fuente
  padding: 0.2rem 0.5rem; // Ajusta el relleno
}

  .content-card {
    width: 22.4vw;
  }
  
  .card-img-bottom {
    width: 100%;
    height: 15vw;
    padding: 1vw;
    overflow: hidden; // Agrega esta línea para recortar cualquier contenido que exceda los límites del contenedor
  }

  .card-image {
    width: 100%; // Cambia esto para que la imagen ocupe todo el ancho del contenedor
    height: 100%; // Cambia esto para que la imagen ocupe toda la altura del contenedor
    border-radius: 0.5vw;
    object-fit: cover;
  }
</style>