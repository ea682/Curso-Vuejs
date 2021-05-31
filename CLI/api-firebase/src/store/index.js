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
    cargar(state, payload){
      state.tareas = payload;
    },
    set(state, payload){
      state.tareas.push(payload);
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
    async cargarLocalStorage({ commit }){
      try{
        const res = await fetch(`https://udemy-apy-8baf3-default-rtdb.firebaseio.com/tareas.json`, {
          method: 'GET'
        })

        const dataDB = await res.json()
        const arrayTareas = [];
        
        for(let id in dataDB){
          arrayTareas.push(dataDB[id]);
        }
        commit('cargar', arrayTareas)

        // console.log(arrayTareas)

      }catch(error){
        console.log(error);
      }
      //commit('set', tarea)
    },
    async setTareas({commit}, tarea){
      //Ejemplo de comunicacion con la API
      try{
        const res = await fetch(`https://udemy-apy-8baf3-default-rtdb.firebaseio.com/tareas/${tarea.id}.json`, {
          method: 'PUT',
          body: JSON.stringify(tarea),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        
        const dataDB = await res.json()
        console.log(dataDB)

      }catch(error){
        console.log(error);
      }
      commit('set', tarea)
    },
    async deleteTareas({commit}, id){

      try{
        const rest = fetch(`https://udemy-apy-8baf3-default-rtdb.firebaseio.com/tareas/${id}.json`, {
          method: 'DELETE'
        })
        commit('delete', id);
      }catch(error){
        console.log(error);
      }
    },
    setTarea({commit}, id){
      commit('tarea',id)
    },
    async updateTarea({ commit }, tarea){
      //Ejemplo de comunicacion con la API
      try{
        const res = await fetch(`https://udemy-apy-8baf3-default-rtdb.firebaseio.com/tareas/${tarea.id}.json`, {
          method: 'PATCH',
          body: JSON.stringify(tarea),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        
        const dataDB = await res.json()
        console.log(dataDB)

      }catch(error){
        console.log(error);
      }

      router.push('/');
      // commit('set', tarea)
      //   commit('update', tarea)
    }
  },
  modules: {
  }
})
