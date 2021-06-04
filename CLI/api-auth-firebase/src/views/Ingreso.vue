<template>
  <h1>Ingreso de usuario</h1>
  <div class="alert alert-danger" v-if="error.tipo !== null">
      {{error.mensaje}}
  </div>
  <form @submit.prevent="procesarFormulario">
      
        <input class="form-control my-2" type="email" placeholder="Email" v-model.trim="email">
        <input class="form-control my-2" type="password" placeholder="password" v-model.trim="pass1">
        <button class="btn btn-primary" type="submit" :disabled="bloquear">Ingresar</button>
  </form>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
    data(){
        return{
            email : '',
            pass1: ''
        }
    },
    methods:{
        ...mapActions(['ingresoUsuario']),
        async procesarFormulario(){
            await this.ingresoUsuario({email: this.email, password: this.pass1})
            this.email = '';
            this.pass1 = '';
        }
    },
    computed:{
        bloquear(){
            if(!this.email.includes('@')){
                return true;
            }
            if(this.pass1.length > 5){
                return false;
            }
            return true;
        },
        ...mapState(['error'])
    }
}
</script>