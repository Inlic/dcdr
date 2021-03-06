<template>
  <div class="container-fluid background">
    <div v-if="!room">
      <loading-component></loading-component>
    </div>
    <div v-else class="row justify-content-center mt-3">
      <div class="col-12 col-md-10">
        <div class="card bg-dark text-center row">
          <div  class="card-header col">
            <i @click="this.dtoggle" class="far fa-minus-square float-right m-1"></i>
            <h1 class="red my-3">{{room.name}}</h1>
            <h4 id="room-code" class="neon green">Room Code: {{room.code}}</h4>
          </div>
          <div v-if="this.toggle == false" class="card-body text-center col">
            <div class="row justify-content-around">
              <h4 class="card orange col-10 col-md-5">User Vetos: {{room.options.userVetos}}</h4>
              <h4 class="card orange col-10 col-md-5">Required Consensus: {{room.options.consensus}}%</h4>
            </div>
            <div class="row justify-content-around">
              <h4 class="card orange col-10 col-md-5">Time Per Item: {{room.options.questionTime}}s</h4>
              <h4 class="card orange col-10 col-md-5">Allowed Items: {{room.options.pollItems}}</h4>
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
            <div class="row text-center">
              <h3 class="red my-2 col-12">Participants</h3>
            </div>
            <div class="card row">
              <div class="neon orange card" v-for="name in room.names" :key="name">
                <profile-component class="align-self-center profile" v-if="name == profile.name" /><span
                  v-else>{{name}}</span></div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12">
        <div class="row">
          <div class="order-2 order-md-1 col-12 col-md-6 mt-1 px-3" v-if="userItems">
              <h1 v-if="steam.length" class="text-center card bg-dark blue">Steam Libray Results:</h1>
              <div class="card bg-dark blue"><input type="text" class="form-control" id="myInput" v-on:keyup="this.searchItems" placeholder="Search for names.."></div>
            <div class="steam-container mt-1 px-3" id="steamGames">
              <steam-game-component class="" v-for="game in steam" :key="game.appid" :gameData="game" />
            </div>
          </div>
          <div class="order-1 order-md-2 col-12 col-md-6 mt-1 px-3">
              <h1 v-if="!room.started" class="text-center card bg-dark blue">Current Games:</h1>
            <div class="steam-container mt-1 px-3">
              <game-vote-component class="" v-for="game in games" :key="game.id" :gameData="game" />
            </div>
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
        steamUser: {},
        toggle: true,
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
      dtoggle(){
        this.toggle =!this.toggle
      },
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
      },
      searchItems(){
      let input, filter, steamList, steamGame, h6, i, txtValue;
      input = document.getElementById('myInput');
      filter = input.value.toUpperCase();
      steamList = document.getElementById("steamGames");
      steamGame = steamList.getElementsByTagName('div');

      // Loop through all list items, and hide those who don't match the search query
      for (i = 0; i < steamGame.length; i++) {
       h6 = steamGame[i].getElementsByTagName("h6")[0];
        txtValue = h6.textContent || h6.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
        steamGame[i].style.display = "";
        } else {
        steamGame[i].style.display = "none";
        }
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

      if (this.room.started == true) {
        next()
        return
      }
      else if (await as.confirmLeave()) {
        this.$store.dispatch("removeName", { id: this.room.id })
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

  .profile div {
    margin: .5em !important;
  }
  .far{
    color: #FF88FF;
    cursor: pointer;
  }
</style>