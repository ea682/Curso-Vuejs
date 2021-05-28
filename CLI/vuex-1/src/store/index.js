import { createStore } from 'vuex'

export default createStore({
  state: {
    contador: 90
  },
  mutations: {
    incrementar(state, numero){
      state.contador = state.contador + numero;
    },
    disminuir(state, numero){
      state.contador = state.contador - numero;
    }
  },
  actions: {
    accionIncrementar({commit}){
      commit('incrementar', 10)
    },
    accionDisminuir({commit}, numero){
      commit('disminuir', numero)
    },
    accionBoton({commit}, objeto){
      if(objeto.estado){
        commit('incrementar', objeto.numero)
      }else{
        commit('disminuir', objeto.numero)
      }
    }
  },
  modules: {
  }
})
