<template>
  <main class="main">
    <form class="main__form">
        <div class="main__form registered">
            <h2>¡Bienvenidx de nuevo!</h2>

            <div class="main__form data">
                <div>
                    <span>Correo electrónico</span>
                    <input type="email">
                </div>
                <div>
                    <span>Contraseña</span>
                    <input type="password">
                </div>
            </div>

            <button class="main__button">
                <span>Iniciar Sesión</span>
            </button>
        </div>
        <div class="main__form notRegistered">
            <span>¿Aún no tienes cuenta?</span>
            <router-link class="main__button" to="/register" >
                <span>Registrarse</span>
            </router-link>
        </div>
    </form>
  </main>
</template>

<script>
export default {

}
</script>

<style>

</style>