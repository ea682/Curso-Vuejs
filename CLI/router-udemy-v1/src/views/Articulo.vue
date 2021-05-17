<template>
  <Titulo texto="Ruta con parametros" />
  <!-- Obtenemos los datos de la url o ruta con parametros-->
  <div v-for="(item) in articulo" :key="item.id">
    {{item}}
  </div>
</template>

<script>
    import Titulo from '../components/Titulo';
export default {
    components: {
        Titulo
    },
    data(){
      return{
        articulo: {}
      }
    },
    methods:{
        async consultarApi(){
          try{
                const data = await fetch(`https://jsonplaceholder.typicode.com/posts/${this.$route.params.id}`);
                const objeto = await data.json();
                this.articulo = objeto;
                console.log(array)
            }catch(error){
                console.log(error);
            }
        }
    },
    created(){
      this.consultarApi();
    }
}

</script>

<style>

</style>