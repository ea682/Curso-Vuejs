import { createStore } from 'vuex'
import router from '../router'

export default createStore({
  state: {
    tareas: [],
    tarea: {
      id: '',
      nombre: '',
      categorias: [],
      estado: '',
      numero : 0
    }
  },
  mutations: {
    set(state, payload){
      state.tareas.push(payload);
      console.log(state.tareas);
    },
    delete(state, payload){
      state.tareas = state.tareas.filter(item => item.id !== payload);
    },
    tarea(state, payload){
      if(!state.tareas.find(item => item.id === payload)){
        router.push('/')
        return
      }else{
        state.tarea = state.tareas.find(item => item.id === payload )
      }
      
    },
    update(state, payload){
      state.tareas = state.tareas.map(item => item.id === payload.id ? payload : item)
      router.push('/')
    }
  },
  actions: {
    cargarLocalStorage({ commit }){
      if(){
        
      }
    },
    setTareas({commit}, tarea){
      commit('set', tarea)
    },
    deleteTareas({commit}, id){
      commit('delete', id)
    },
    setTarea({commit}, id){
      commit('tarea',id)
    },
    updateTarea({ commit }, tarea){
        commit('update', tarea)
    }
  },
  modules: {
  }
})