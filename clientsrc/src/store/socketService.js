import io from "socket.io-client"

let socket = {};

export const socketService = {
  actions: {
    initializeSocket({ commit, dispatch, state }) {
      socket = io("//localhost:3000");
      socket.on("CONNECTED", data => {
        console.log(data.message + " sockets on")
      })
      //registers additional listeners for client side here
      socket.on("updateRoom", data => { 
        
        commit("setRoom", data)
      })
      socket.on("joined room", data => console.log(data))
      socket.on("new user", data => console.log(data))
    },
    joinRoom({ commit, dispatch }, roomName) {
   
    socket.emit("dispatch", { action: "JoinRoom", data: roomName })
     
    },
    leaveRoom({ commit, dispatch }, roomName) {
      socket.emit("disconnect", { action: "LeaveRoom", data: roomName })
    }
  }
}