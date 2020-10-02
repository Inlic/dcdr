<template>
  <div class="container-fluid background">
    <div class="divider-tiny"></div>
    <div v-if="!room">
      <loading-component></loading-component>
    </div>
    <div v-else class="row">
      <div class="offset-3 col-6">
        <div class="card bg-dark text-center">
          <h1 class="flashy neon red my-3">{{room.name}}</h1>
          <h4 class="flasy neon green">Room Code: {{room.code}}</h4>
          <form @submit.prevent="createGame" class="justify-content-center">
            <input type="text" placeholder="Game name..." required v-model="newGame.name" class="col-10 m-1" />
            <input type="Url" placeholder="Image url..." v-model="newGame.imgUrl" class="col-10 m-1" />
            <button type="submit" class="btn btn-primary flashy neon blue m-1">Add a game</button>
          </form>
          <button type="button" @click="this.startPoll" class="btn btn-primary m-2 flashy neon blue"> Go! </button>
          <div>
            <h3 class="flashy neon red my-2">Participants</h3>
          </div>
          <ul>
            <li class="flashy neon purple" v-for="name in room.names" :key="name">{{name}}</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="divider-small"></div>
    <div class="row">
      <game-component class="col-2" v-for="game in games" :key="game.id" :gameData="game"/>  
    </div> 
  </div>

</template>

<script>
  import as from '../store/alertsService'
  import loadingComponent from "../components/loadingComponent"
  import gameComponent from "../components/GameComponent"
  export default {
    name: "Room",
    data() {
      return {
        newGame: {}
      }
    },
    mounted() {
      this.$store.dispatch("getRoomByCode", this.$route.params.code)
      this.$store.dispatch('joinRoom', `${this.$route.params.code}`)
      this.$store.dispatch('addName', {addName: this.$store.state.name})
      
    },
    computed: {
      games(){
        return this.$store.state.games
      },
      room() {
        return this.$store.state.room
      },
      profile() {
      return this.$store.state.profile;
    }
    },
    methods: {
      createGame() {
        this.newGame.roomId = this.room.id
        this.$store.dispatch("createGame", this.newGame)
        this.newGame = {}
      },
      startPoll() {
        // this.$store.dispatch("startPoll", this.room.code)
        this.$store.dispatch("getGames", this.room.id)
        this.$router.push({ name: 'Vote', params: { code: this.room.code } })
      },
      async checkName(){
        
        if(this.$auth.isAuthenticated){
          this.$store.dispatch("addName", {id:this.room.id, addName: this.profile.name})
          return
        }
        else if (!this.$auth.isAuthenticated){
          let res = await as.addName()
          
        
        this.$store.dispatch("addName", {id:this.room.id, addName: res.value})
        }
      }
    },
    
    components: {
      loadingComponent,
      gameComponent
    }
  }
</script>

<style>
ul{
  list-style: none;
}

</style>