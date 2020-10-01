<template>
  <div class="container-fluid background">
    <div v-if="!room">
      <loading-component></loading-component>
    </div>
    <div v-else class="row">
      <div class="offset-3 col-6">
      <div class="card bg-dark text-center">
        <h1 class="flashy neon red">{{room.name}}</h1>
        <h4 class="flasy neon green">{{room.code}}</h4>
        <form @submit.prevent="createGame" class="justify-content-center">
          <input type="text" placeholder="name" required v-model="newGame.name" class="col-10 m-1" />
          <input type="Url" placeholder="image" v-model="newGame.imgUrl" class="col-10 m-1" />
          <button type="submit" class="btn btn-outline-light m-1">Add a game</button>
        </form>
        <button type="button" @click="this.startPoll" class="btn btn-dark btn-outline-light m-1 flashy neon red"> Go! </button>
        <ul>
          <li v-for="name in room.names" :key="name">{{name}}</li>
        </ul>
      </div>
    </div>
    </div>
  </div>

</template>

<script>
  import as from '../store/alertsService'
  import loadingComponent from "../components/loadingComponent.vue"
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
      if (!this.$auth.isAuthenticated){this.checkName()}
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
          if(res.isDismissed){
          this.checkName()
          }
        
        this.$store.dispatch("addName", {id:this.room.id, addName: res.value})
        }
      }
    },
    
    components: {
      loadingComponent
    }
  }
</script>

<style>

</style>