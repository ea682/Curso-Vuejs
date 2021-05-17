<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <!-- Forma de acceder al state -->
    <h1>Mi contador: {{$store.state.contador}}</h1>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {
  }
}
</script>
