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
    },
    user: null,
    error: {tipo: null, mensaje: null}
  },
  mutations: {
    setError(state, payload){
      console.log("here");
      if(payload.message === "EMAIL_NOT_FOUND"){
        return state.error = {tipo: 'Email', mensaje: 'Email no registrado'}
      }
    },
    setUser(state, payload){
      console.log(state.user);
      state.user = payload;
    },
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
    cerrarSesion({commit}){
      commit('setUser', null);
      router.push('/Ingreso');
      localStorage.setItem('user', null)
    },
    async ingresoUsuario({commit}, usuario){
      try{
        const rest = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCqElfnI-wuPOy1Xs0Yjj2GjU9t5Z4BsFw`,{
          method: 'POST',
          body: JSON.stringify({
            email: usuario.email,
            password: usuario.password,
            returnSecureToken: true
          })
        })

        const userDb = await rest.json();
        if(userDb.error){
          console.log(userDb.error);
          return commit('setError', userDb.error);
           
        }
        console.log(userDb);
        commit('setUser', userDb)
        
        router.push('/')
        localStorage.setItem('user', JSON.stringify(userDb))
      }catch(error){
        console.log(error);
      }
    },
    async registrarUsuario({ commit }, usuario){
      try{
        const rest = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCqElfnI-wuPOy1Xs0Yjj2GjU9t5Z4BsFw`,{
          method: 'POST',
          body: JSON.stringify({
            email: usuario.email,
            password: usuario.password,
            returnSecureToken: true
          })
        })

        const userDb = await rest.json();
        console.log(userDb);
        if(userDb.error){
          console.log(userDb.error);
          return 
        }
        commit('setUser',userDb);
        router.push('/')
        localStorage.setItem('user', JSON.stringify(userDb))
      }catch(error){
        console.log(error);
      }
      console.log(usuario);
    },
    async cargarLocalStorage({ commit, state }){
      console.log(localStorage.getItem('user'));
      if(localStorage.getItem('user')){
        commit('setUser', JSON.parse(localStorage.getItem('user')));
      }else{
        return commit('setUser', null);
      }
      try{
        const res = await fetch(`https://udemy-apy-8baf3-default-rtdb.firebaseio.com/tareas/${this.state.user.localId}.json?auth=${this.state.user.idToken}`)
        
        const dataDB = await res.json()
        console.log(dataDB);
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
        const res = await fetch(`https://udemy-apy-8baf3-default-rtdb.firebaseio.com/tareas/${this.state.user.localId}/${tarea.id}.json?auth=${this.state.user.idToken}`, {
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
        const rest = fetch(`https://udemy-apy-8baf3-default-rtdb.firebaseio.com/tareas/${this.state.user.localId}/${id}.json?auth=${state.user.idToken}`, {
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
        const res = await fetch(`https://udemy-apy-8baf3-default-rtdb.firebaseio.com/tareas/${this.state.user.localId}/${tarea.id}.json?auth=${this.state.user.idToken}`, {
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
  getters:{
    usuarioAuntenticado(state){
      console.log(localStorage.getItem('user'));
      if(localStorage.getItem('user')){
        state.user = localStorage.getItem('user');
      }
      console.log(state);
      return state.user != null;
    }
  },
  modules: {
  }
})
