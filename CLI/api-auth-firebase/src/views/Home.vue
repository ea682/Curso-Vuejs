<template>
  <form @submit.prevent="procesarFormulario">
    <Input :tarea="tarea"/>
  </form>
  <hr>
  <ListaTarea />
</template>

<script>
import Input from '../components/Input';
import { mapActions } from 'vuex';
import ListaTarea from '../components/ListaTareas';
const shortid = require('shortid');

export default {
  name: 'Home',
  components: {
    Input,
    ListaTarea
  },
  data() {
    return { 
      tarea: {
        nombre: '',
        categorias: [],
        estado: '',
        numero : 0
      }
    }
  },
  methods: {
    ...mapActions(['setTareas', 'cargarLocalStorage']),
    procesarFormulario() {
      // console.log(this.tarea);
      if(this.tarea.nombre.trim() === ""){
        console.log("Campo vacio");
        return
      }
      console.log("no esta vacio");

      // generar ID
      this.tarea.id = shortid.generate();
      console.log(this.tarea.id);
      // envian los datos
      this.setTareas(this.tarea);

      // limpiar datos
      this.tarea = {
        id: '',
        nombre: '',
        categorias: [],
        estado: '',
        numero : 0
      }
    }
  },
  created(){
    this.cargarLocalStorage()
  }
}
</script>
