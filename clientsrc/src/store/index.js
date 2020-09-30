import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
import { api } from "./AxiosService"

Vue.use(Vuex);



export default new Vuex.Store({
  state: {
    profile: {},
    room:{},
    myRooms: [],
    games: [],
    activeGame: {}
  },
  mutations: {
    setProfile(state, profile) {
      state.profile = profile;
    },
    setRoom(state, room) {
      state.room = room;
    },
    setMyRooms(state, rooms){
      state.myRooms = rooms
    },
    setGames(state, games){
      state.games = games
    },
    setActiveGame(state, game){
      state.activeGame = game
    },
    addGame(state, game){
      state.games.push(game)
      state.games = state.games
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
      try{
        let res = await api.get("profile");
        commit("setProfile", res.data);
      }catch (error) {
        console.error(error);
      }
    },
    async editProfile({commit}, data){
      try{
        let res = await api.put("profile", data)
        commit("setProfile", res.data)
      }catch (err) {
        console.error(err);
      }
    },
    //Rooms Section
    async getRoomByCode({commit}, code){
      let res = await api.get(`rooms/${code}`)
      commit("setRoom", res.data)
    },
    async getRooms({commit}, email){
      try{
        let res = await api.get(`profile/${email}/rooms`)
        commit("setMyRooms", res.data)
      } catch(error) {
        console.error(error);
      }
    },
    async editRoom({commit}, data){
      try{
        let res = await api.put("rooms"+data.id, data)
        commit("setRoom", res.data)
      } catch(err) {
        console.error(err);
      }
    },
    async deleteRoom({}, id){
      try{
        await api.delete(`rooms/${id}`)
      } catch(error) {
        console.error(error);
      }
    },
    async createRoom({commit}, data){
      try{
      let res = await api.post("rooms", data)
      commit("setRoom", res)
      console.log(res)
      router.push({ name: "Room", params:{code:res.data.code} })
      } catch(error) {
        console.error(error);
      }
    },
    async getGamebyID({commit}, id){
      try{
        let res = await api.get(`games/${id}`)
        commit("setActiveGame", res.data)
      }catch(error) {
        console.error(error);
      }
    },
    async getGames({commit}, id){
      try{
        let res = await api.get(`rooms/${id}/games`)
        commit("setGames", res.data)
      } catch(error) {
        console.error(error);
      }
    },
    async editGame({commit}, data){
      try{
        let res = await api.put("games"+data.id, data)
        commit("editGame", res.data)
      } catch(err) {
        console.error(err);
      }
    },
    async deleteGame({}, id){
      try{
        await api.delete(`games/${id}`)
      } catch(error) {
        console.error(error);
      }
    },
    async createGame({commit}, data){
      try{
      let res = await api.post("games", data)
      commit("addGame", res.data)
      } catch(error) {
        console.error(error);
      }
    },
    async respond({}, data){
      try {
        await api.post("responses", data)
      } catch (error) {
        console.error(error);
      }
    }
  }
});
