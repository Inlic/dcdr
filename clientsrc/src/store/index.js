import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
import { socketService } from "./socketService"
import { api } from "./AxiosService.js"
import as from "./alertsService.js"
import { STATES } from "mongoose";


Vue.use(Vuex);



export default new Vuex.Store({
  state: {
    profile: {},
    room: {},
    myRooms: [],
    games: [],
    activeGame: {},
    name: "",
    steam: [],
    userChannels: [],
    channelRooms: {},
  },
  mutations: {
    setProfile(state, profile) {
      state.profile = profile;
    },
    setRoom(state, room) {
      state.room = room;
    },
    startPoll(state) {
      state.room.started = true
    },
    endPoll(state) {
      state.room.completed = true
    },
    setMyRooms(state, rooms) {
      state.myRooms = rooms
    },
    setGames(state, games) {
      state.games = games
    },
    setActiveGame(state, game) {
      state.activeGame = game
    },
    addGame(state, game) {
      state.games.push(game)
      state.games = state.games
    },
    setMyName(state, name) {
      state.name = name
    },
    setSteamLibray(state, games) {
      state.steam = games
    },
    setUserChannels(state, channel) {
      state.userChannels = channel
    },
    shuffleGames(state){
      let games = state.games
      for(let i = games.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * i)
        const temp = games[i]
        games[i] = games[j]
        games[j] = temp
      }
      
      state.games = games
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
    async editProfile({ commit }, data) {
      try {
        let res = await api.put("profile/" + data.id, data)
        commit("setProfile", res.data)
      } catch (err) {
        console.error(err);
      }
    },
    //Rooms Section
    async getRoomByCode({ commit, dispatch }, code) {
      let res = await api.get(`rooms/${code}`)
      commit("setRoom", res.data)
      dispatch("addName")
    },
    async getRooms({ commit }) {
      try {
        let res = await api.get(`profile/${this.state.profile.id}/rooms`)
        commit("setMyRooms", res.data)
      } catch (error) {
        console.error(error);
      }
    },
    async editRoom({ commit }, data) {
      try {
        let res = await api.put("rooms" + data.id, data)
        commit("setRoom", res.data)
      } catch (err) {
        console.error(err);
      }
    },
    async deleteRoom({ commit, state }, id) {
      try {
        await api.delete(`rooms/${id}`)
        commit("setMyRooms", this.state.myRooms.filter(r => r.id != id))
      } catch (error) {
        console.error(error);
      }
    },
    async createRoom({ commit, state }, data) {
      try {
        if (this.state.profile.email) { data.creatorEmail = this.state.profile.email }
        let res = await api.post("rooms", data)
        commit("setRoom", res.data)
        console.log(res)
        router.push({ name: "Room", params: { code: res.data.code } })
      } catch (error) {
        console.error(error);
      }
    },
    async addName({ commit }, payload) {
      if (this.state.name) {
        if (this.state.room.names.includes(this.state.name)) {
          return
        }
        await api.put(`rooms/${this.state.room.id}/names`, { addName: this.state.name })
        return
      }
      else {
        if (this.state.room.names.includes(this.state.profile.name)) {
          return
        }
        await api.put(`rooms/${this.state.room.id}/names`, { addName: this.state.profile.name })
      }
    },
    async removeName({ commit }, id) {
      if (this.state.name) {
        await api.put(`rooms/${this.state.room.id}/noname`, { name: this.state.name })
        return
      }
      else {
        await api.put(`rooms/${this.state.room.id}/noname`, { name: this.state.profile.name })
      }
    },
    async startPoll({ }, code) {
      try {
        api.put(`rooms/${code}/start`)
      } catch (error) {
        console.error(error);
      }
    },
    async userDone({ }, code) {
      try {
        api.put(`rooms/${code}/done`)
      } catch (error) {
        console.error(error);
      }
    },
    async getGamebyID({ commit }, id) {
      try {
        let res = await api.get(`games/${id}`)
        commit("setActiveGame", res.data)
      } catch (error) {
        console.error(error);
      }
    },
    async getGames({ commit, state }, code) {
      try {
        let res = await api.get(`rooms/${code}/games`)
        commit("setGames", res.data)
      } catch (error) {
        console.error(error);
      }
    },
    async editGame({ commit }, data) {
      try {
        let res = await api.put("games" + data.id, data)
        commit("editGame", res.data)
      } catch (err) {
        console.error(err);
      }
    },
    async deleteGame({ commit, state }, id) {
      try {
        await api.delete(`games/${id}`)
        commit("setGames", this.state.games.filter(g => g.id != id))
        as.actionNotice("Game Removed")
      } catch (error) {
        console.error(error);
      }
    },
    async createGame({ commit }, data) {
      try {
        let res = await api.post("games", data)
        as.actionNotice("Game Added")
      } catch (error) {
        console.error(error);
      }
    },
    async resetRoom({ commit }, data) {
      try {
        console.log(data);
        await api.put(`/rooms/${data.id}`, data)
        await api.put(`/rooms/${data.id}/games`, data)
      } catch (error) {

      }
    },
    async respond({ }, data) {
      try {
        await api.post("responses", data)
      } catch (error) {
        console.error(error);
      }
    },
    async upGame({ commit, state }, data) {
      try {

        await api.put(`games/${data.id}/upvote`, { code: data.code })
      } catch (error) {
        console.error(error);
      }
    },
    async downGame({ commit, state }, data, code) {
      try {
        await api.put(`games/${data.id}/downvote`, code)
      } catch (error) {
        console.error(error);
      }
    },
    async vetoGame({ commit, state }, data, code) {
      try {

        data.veto = true
        await api.put(`games/${data.id}`, data)
      } catch (error) {
        console.error(error);
      }
    },
    setMyName({ commit }, name) {
      commit("setMyName", name)
    },
    startVote({ commit, state, dispatch }, code) {
        commit("setActiveGame", state.games[0])
    },
    //steam api
    async getOwnedGames({ commit, state, dispatch }, steamUser) {
      try {
        let res = await api.get(`steam/${steamUser}`)
        console.log("got", res.data.game_count);
        commit("setSteamLibray", res.data.games)
      } catch (error) {
        console.error(error)
        as.steamNotice();
      }
    },
    removeFromList({ commit, state }, game) {
      commit("setSteamLibray", state.steam.filter(g => g.name != game.name))
    },

    setWinner({ commit, dispatch }, payload) {
      try {
        api.put('rooms/' + payload.id, { winningItem: payload.winner })
      } catch (error) {
        console.error(error);
      }
    },

    //Channels
    async addChannel({ commit, state }, channel) {
      try {
        console.log(channel);
        let res = await api.post('channels', channel)
        commit("setUserChannels", [...state.userChannels, res.data])
      } catch (error) {

      }
    },
    async getChannels({ commit, state }, useremail) {
      try {
        let res = await api.get(`channels/${useremail}/user`)
        commit("setUserChannels", res.data)
      } catch (error) {

      }
    },
    async addRoomtoChannel({ commit, state }, payload) {
      let res = await api.put(`channels/${payload._id}/rooms`, payload)
      commit('setUserChannels', [...state.userChannels.filter(c => c._id != payload._id), res.data])
    },
    async RemoveRoomFromChannel({commit, dispatch, state}, payload){
      let res = await api.put(`channels/${payload.parent}/drooms`, payload)
      commit("setUserChannels", [...state.userChannels.filter(c => c._id != res.data._id), res.data])

    },
    async deleteChannel({commit, state}, id){
      try {
        
        let res = await api.delete('channels/'+id)
        commit('setUserChannels', [...state.userChannels.filter(c => c._id != id)])
      } catch (error) {
        console.error(error);
      }
    }

  },
  modules: {
    socketService
  }
});
