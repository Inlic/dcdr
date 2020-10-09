<template>
  <div class="container-fluid background">
    <div v-if="!room">
      <loading-component></loading-component>
    </div>
    <div v-else class="row justify-content-center mt-3">
      <div class="col-12 col-md-10">
        <div class="card bg-dark text-center row">
          <div class="card-header col">
            <h1 class="red my-3">{{room.name}}</h1>
            <h4 class="neon green">Room Code: {{room.code}}</h4>
          </div>
          <div class="card-body text-center col">
            <div class="row justify-content-around">
              <h4 class="card orange col-5">User Vetos: {{room.options.userVetos}}</h4>
              <h4 class="card orange col-5">Required Consensus: {{room.options.consensus}}%</h4>
            </div>
            <div class="row justify-content-around">
              <h4 class="card orange col-5">Time Per Item: {{room.options.questionTime}}s</h4>
              <h4 class="card orange col-5">Allowed Items: {{room.options.pollItems}}</h4>
            </div>
            <div class="form-group card p-3 row"
              v-if="!room.started && games.length < room.options.pollItems && userItems">
              <form @submit.prevent="createGame" class="justify-content-center">
                <input id="game-name-input" type="text" placeholder="Game name..." required v-model="newGame.name"
                  class="col-12 my-1 neon blue form-control" />
                <input id="game-img-input" type="Url" placeholder="Image url..." v-model="newGame.imgUrl"
                  class="col-12 my-1 neon blue form-control" />
                <button id="add-game-btn" type="submit" class="btn btn-primary flashy neon blue m-1">Add a game</button>
              </form>
            </div>
            <div class="form-group card p-3 row" v-if="!room.started && userItems" @submit.prevent="getSteamGames">
              <form class="justify-content-center">
                <input id="steam-id-input" type="text" placeholder="Steam ID..." required v-model="steamUser.steamId"
                  class="col-12 my-1 neon blue form-control" />
                <button id="get-steam-library-btn" type="submit" class="btn btn-primary flashy neon blue m-1">Get Steam
                  libary by Steam ID</button>
                <button id="get-user-steam-btn" v-if="profile.steamId" type="button" @click="getUserSteam"
                  class="btn btn-primary flashy neon blue m-1">Get My Steam libary</button>
              </form>
            </div>
            <button id="start-poll-btn" v-if="!room.started && games.length > 1" type="button" @click="this.startPoll"
              class="btn btn-primary m-2 flashy neon blue"> Go! </button>
            <div class="row">
              <h3 class="red my-2 col-4 offset-4">Participants</h3>
            </div>
            <div class="card row">
              <div class="neon orange card" v-for="name in room.names" :key="name"><profile-component class="align-self-center profile" v-if="name == profile.name"/><span v-else>{{name}}</span></div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12">
        <div class="row">
          <div class="col-6 steam-container mt-1 px-3" v-if="userItems">
            <h1 v-if="steam.length" class="text-center card bg-dark blue">Steam Libray results:</h1>
            <steam-game-component class="" v-for="game in steam" :key="game.appid" :gameData="game" />
          </div>
          <div class="steam-container mt-1 px-3" :class="{'col-6':userItems, 'col-12':!userItems}">
            <h1 v-if="!room.started" class="text-center card bg-dark blue">Current Games:</h1>
            <game-vote-component class="" v-for="game in games" :key="game.id" :gameData="game" />
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import as from '../store/alertsService'
  import loadingComponent from "../components/loadingComponent"
  import gameComponent from "../components/GameComponent"
  import steamGameComponent from "../components/SteamGameComponent"
  import gameVoteComponent from "../components/GameVoteComponent"
  import profileComponent from "../components/ProfileComponent"
  export default {
    name: "Room",
    mounted() {
      this.$store.dispatch("getRoomByCode", this.$route.params.code)
      this.$store.dispatch('joinRoom', `${this.$route.params.code}`)
      this.$store.dispatch("getGames", this.$route.params.code)
      if (this.profile.steamId) {
        this.getUserSteam()
      }
    },
    data() {
      return {
        newGame: {},
        steamUser: {}
      }
    },
    computed: {
      games() {
        return this.$store.state.games
        console.log("Games updated");
      },
      room() {
        return this.$store.state.room
        console.log("room updated");
      },
      profile() {
        return this.$store.state.profile;
      },
      steam() {
        return this.$store.state.steam
      },
      userItems() {
        if (this.room.options.userItems) {
          return true
        }
        if (this.$auth.userInfo.email == this.room.creatorEmail) {
          return true
        }
        return false
      }
    },
    methods: {
      createGame() {
        this.newGame.roomId = this.room.id
        this.newGame.code = this.$route.params.code
        this.$store.dispatch("createGame", this.newGame)
        this.newGame = {}
      },
      startPoll() {
        this.$store.dispatch("startPoll", this.room.code)
        this.$store.dispatch("getGames", this.room.code)
      },
      getSteamGames() {
        if (this.steamUser.steamId) {
          this.$store.dispatch("getOwnedGames", this.steamUser.steamId)
        }
      },
      getUserSteam() {
        this.$store.dispatch("getOwnedGames", this.profile.steamId)
      },
      async checkName() {
        if (this.$auth.isAuthenticated) {
          this.$store.dispatch("addName", { id: this.room.id, addName: this.profile.name })
          return
        }
        else if (!this.$auth.isAuthenticated) {
          let res = await as.addName()
          this.$store.dispatch("addName", { id: this.room.id, addName: res.value })
        }
      }
    },
    components: {
      loadingComponent,
      gameComponent,
      steamGameComponent,
      gameVoteComponent,
      profileComponent
    },
    async beforeRouteLeave(to, from, next) {
      
      if(this.room.started == true){
        next()
        return
      }
      else if(await as.confirmLeave()){
        this.$store.dispatch("removeName", {id: this.room.id})
        this.$store.dispatch('leaveRoom', this.$route.params.code)
        next()
      }
    }
  }
</script>

<style>
  ul {
    list-style: none;
  }
  .profile div{
    margin: .5em !important;
  }


</style>