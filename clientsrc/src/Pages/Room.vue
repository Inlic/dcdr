<template>
  <div class="container-fluid background">
    <div class="divider-tiny"></div>
    <div v-if="!room">
      <loading-component></loading-component>
    </div>
    <div v-else class="row justify-content-center">
      <div class="col-12 col-md-6">
        <div class="card bg-dark text-center">
          <h1 class="flashy neon red my-3">{{room.name}}</h1>
          <h4 class="flasy neon green">Room Code: {{room.code}}</h4>
          <form v-if="!room.started" @submit.prevent="createGame" class="justify-content-center">
            <input type="text" placeholder="Game name..." required v-model="newGame.name" class="col-10 m-1" />
            <input type="Url" placeholder="Image url..." v-model="newGame.imgUrl" class="col-10 m-1" />
            <button type="submit" class="btn btn-primary flashy neon blue m-1">Add a game</button>
          </form>
          <form v-if="!room.started" @submit.prevent="getSteamGames" class="justify-content-center">
            <input type="text" placeholder="Steam ID..." required v-model="steamUser.steamId" class="col-10 m-1" />
            <button type="submit" class="btn btn-primary flashy neon blue m-1">Get Steam libary</button>
            <button v-if="profile.steamId" type="button" @click="getUserSteam" class="btn btn-primary flashy neon blue m-1">Get My Steam libary</button>
          </form>
          <button v-if="!room.started" type="button" @click="this.startPoll"
            class="btn btn-primary m-2 flashy neon blue"> Go! </button>
          <div>
            <h3 class="flashy neon red my-2">Participants</h3>
          </div>
          <ul>
            <li class="flashy neon purple" v-for="name in room.names" :key="name">{{name}}</li>
          </ul>
        </div>
        <div class="row">
          <steam-game-componet v-for="game in steam" :key="game.appid" :gameData="game"/>
        </div>
      </div>
    </div>
    <div class="divider-small"></div>
    <div class="row justify-content-center justify-content-md-start">
      <game-component class="col-11 col-md-2" v-for="game in games" :key="game.id" :gameData="game" />
    </div>
  </div>

</template>

<script>
  import as from '../store/alertsService'
  import loadingComponent from "../components/loadingComponent"
  import gameComponent from "../components/GameComponent"
  import steamGameComponet from "../components/SteamGameComponet"
  export default {
    name: "Room",
    data() {
      return {
        newGame: {},
        steamUser: {}
      }
    },
    mounted() {
      this.$store.dispatch("getRoomByCode", this.$route.params.code)
      this.$store.dispatch('joinRoom', `${this.$route.params.code}`)
      // this.$store.dispatch('addName', { addName: this.$store.state.name })
      this.$store.dispatch("getGames", this.$route.params.code)
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
      
      steam(){
        return this.$store.state.steam
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
        // this.$router.push({ name: 'Vote', params: { code: this.room.code } })
      },
      getSteamGames(){
        if(this.steamUser.steamId){
          this.$store.dispatch("getOwnedGames", this.steamUser.steamId)
        }
      },
        getUserSteam(){
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
      steamGameComponet

    }
  }
</script>

<style>
  ul {
    list-style: none;
  }
</style>