import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
import { api } from "./AxiosService"

Vue.use(Vuex);



export default new Vuex.Store({
  state: {
    profile: {},
    room:{}
  },
  mutations: {
    setProfile(state, profile) {
      state.profile = profile;
    },
    setRoom(state, room) {
      state.room = room;
    }
  },
  actions: {
    setBearer({ }, bearer) {
      api.defaults.headers.authorization = bearer;
    },
    resetBearer() {
      api.defaults.headers.authorization = "";
    },
    // Profile Section
    async getProfile({ commit }) {
      try {
        let res = await api.get("profile");
        commit("setProfile", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async editProfile({commit}, data){
      try {
        let res = await api.put("profile", data)
        commit("setProfile", res.data)
      } catch (err) {
        console.error(err);
      }
    },
    //Rooms Section
    async getRoom({commit}, code){
      let res = await api.get("room", code)
      commit("setRoom", res.data)
    },
    async editRoom({commit}, data){
      try {
        let res = await api.put("room", data)
        commit("setRoom", res.data)
      } catch (err) {
        console.error(err);
      }
    },
  }
});
