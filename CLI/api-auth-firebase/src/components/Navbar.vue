<template>
    <div class="navbar navbar-dark bg-dark">
        <router-link to="/" class="navbar-brand">
            Formularios
        </router-link>
        <div class="d-flex">
            <router-link 
                to="/" 
                class="btn btn-dark"
                v-if="usuarioAuntenticado"
                >
                Tareas
            </router-link>
            <router-link 
                to="/ingreso" 
                class="btn btn-dark"
                v-if="!usuarioAuntenticado"
                >
                Ingresar
            </router-link>
            <router-link 
                to="/registro" 
                class="btn btn-dark"
                v-if="!usuarioAuntenticado"
                >
                Registrar
            </router-link>
            <button 
                @click="cerrarSesion"
                class="btn btn-dark"
                v-if="usuarioAuntenticado"
            >    
                Cerrar Sesion
            </button>
        </div>
    </div>
    
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    computed:{
        ...mapGetters(['usuarioAuntenticado']),
        
    },
    methods:{
        ...mapActions(['cerrarSesion'])
    }
}
</script>