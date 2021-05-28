<template>
  <div class="about">
    <h1>This is an about page</h1>
    <input type="texto" v-model="texto">
    <h2>{{texto}}</h2>
  </div>
</template>


<script>
export default {
  data(){
    return{
      texto: ''
    }
  }
};
</script>
