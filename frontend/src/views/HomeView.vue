<template>
    <main>
        <section>
            <div>
                <h1>Laboratorio de<br/>Narrativas Digitales</h1>
                <p>Conoce el nuevo espacio que tenemos para ti y<br/>conéctate con los contenidos exclusivos del laboratorio.</p>
            </div>
            <router-link class="button" to="/searchview">
                <span class="text">Ir a los contenidos</span>
            </router-link>
        </section>

        <section>
            <div>
                <h2>¿Qué hacemos en el Lab?</h2>
                <p>El laboratorio de Narrativas Digitales es un espacio del programa de comunicación<br/>
                    de la Universidad ICESI en donde se produce contenido editorial de los estudiantes<br/>
                    para los estudiantes.</p>
            </div>
            <div>
                <div>
                    <h3>Audiovisuales</h3>
                    <span>Contenidos de largometrajes<br/>y cortometrajes.</span>
                </div>
                <div>
                    <h3>Sonoros</h3>
                    <span>Escucha los programas de Radio Samán<br/>y Radiodramas</span>
                </div>
                <div>
                    <h3>Escritos</h3>
                    <span>Disfruta artículos de Papel de<br/>Colgadura o de estudiantes.</span>
                </div>
            </div>
        </section>

        <section>
            <div>
                <h2>Conoce nuestros medios</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget<br/>
                    elit tristique, consectetur odio nec, iaculis erat. Nam quam orci,<br/>
                    tempus nec ultrices sit amet, egestas vel leo.</p>
            </div>

            <div>
                <div>
                    <div>
                        <div>
                            <RsSvg/>
                            <h3>Radio Samán</h3>
                        </div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget elit tristique, consectetur odio nec, iaculis erat. </p>
                    </div>
                    <div>
                        <div>
                            <h3>Circular</h3>
                        </div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget elit tristique, consectetur odio nec, iaculis erat. </p>
                    </div>
                </div>
                <div>
                    <div>
                        <div>
                            <PdcSvg/>
                            <h3>Papel de Colgadura</h3>
                        </div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget elit tristique, consectetur odio nec, iaculis erat. </p>
                    </div>
                </div>
            </div>
        </section>

        <section>
            <div>
                <div>
                    <div>
                        <h2>Conoce a nuestro equipo</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent eget elit tristique, consectetur odio nec, iaculis erat. Nam quam orci, tempus nec ultrices sit amet, egestas vel leo.</p>
                    </div>
                    <router-link class="button" to="/">
                        <span class="text">Ir a los contenidos</span>
                    </router-link>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
import RsSvg from '../assets/icons/RsSvg.vue'
import PdcSvg from '../assets/icons/PdcSvg.vue'
export default {
    components: {
        RsSvg,
        PdcSvg
    }
}
</script>

<style>

</style>