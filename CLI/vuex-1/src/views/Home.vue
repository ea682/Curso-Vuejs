<template>
  <div class="home">
    <!-- Forma de acceder al state -->
    <h1 :style="colorContador">
      {{titulo}}: {{contador}}
    </h1>
    <button @click="accionIncrementar()">Aumentar </button>
    <BtnDisminuir />
    <hr>
    <BotonAccion :estado="true"  />
    <BotonAccion :estado="false"  />
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';
import BtnDisminuir from '../components/BtnDisminuir';
import BotonAccion from '../components/BotonAccion';

export default {
  
  name: 'Home',
  components: {
    BtnDisminuir,
    BotonAccion
  },
  data() {
    return {
      titulo: "Mi contador Vuex"
    }
  },
  computed: {
      ...mapState(['contador']),
      colorContador(){
        return [this.contador > 100 ? {'color': 'green'} : {'color' :'red'}]
      }
  },
  methods: {
    ...mapActions(['accionIncrementar'])
  }
}
</script>
