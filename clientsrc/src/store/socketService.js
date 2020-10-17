import io from "socket.io-client"
import router from "../router";

let socket = {};
let baseUrl = location.host.includes("localhost")
  ? "http://localhost:3000/"
  : "/";

export const socketService = {
  actions: {
    initializeSocket({ commit, dispatch, state }) {
      socket = io(baseUrl);
      socket.on("CONNECTED", data => {
        console.log(data.message + " sockets on")
      })
      //registers additional listeners for client side here
      socket.on("updateRoom", data => {

        commit("setRoom", data)
      })
      //testing console logs
      //socket.on("joined room", data => console.log(data))
      //socket.on("new user", data => console.log(data))
      socket.on("startPoll", data => {
        commit("startPoll")
        commit("shuffleGames")
        router.push({ name: 'Vote', params: { code: data } })
      })
      socket.on("poll ended", data => {
        commit("endPoll")
        router.push({ name: 'Results', params: { code: data } })
      })
      socket.on("new game", data => {
        commit("addGame", data)
      })
    },
    joinRoom({ commit, dispatch }, roomName) {

      socket.emit("dispatch", { action: "JoinRoom", data: roomName })

    },
    leaveRoom({ commit, dispatch }, roomName) {
      socket.emit("disconnect", { action: "LeaveRoom", data: roomName })
    },
    // REVIEW
    done({ commit, dispatch }, roomName) {
      socket.emit("dispatch", { action: "Done", data: roomName })
    }
  }
}