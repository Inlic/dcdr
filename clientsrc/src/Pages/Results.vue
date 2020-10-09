<template>
  <div class="container-fluid background">
    <div class="row mt-3">
      <div class="col-12 offset-md-4 col-md-4 text-center">
        <h1 class="card bg-dark red">
          The winner is:
        </h1>
      </div>
    </div>
    <div class="row mt-3 justify-content-center">
      <div class="col-12 col-md-4 text-center">
        <game-component class="text-center animate__animated animate__backInDown" :gameData="this.winner"
          :totalVotes="room.names.length" />
          <div class="card mt-3" v-if="winner.appid">
            <h1 class="bg-dark red">
            Have steam?</h1> 
            <button @click="launchGame()" type="button" class="btn btn-primary neon blue m-2" >Launch Game</button>
          </div>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-12 offset-md-4 col-md-4">
        <h1 class="red card bg-dark text-center">Runners Up:</h1>
      </div>
    </div>
    <div class="row justify-content-center">
      <div v-for="game in results" class="col-12 col-md-3 text-center my-2 mx-4" :key="game.id">
        <game-component :gameData="game" :totalVotes="room.names.length" />
      </div>
    </div>
  </div>
</template>

<script>
  import gameComponent from "../components/GameComponent"
  export default {
    name: "Results",
    mounted() {
      this.$store.dispatch("getGames", this.$route.params.code)
      this.$store.dispatch('leaveRoom', `${this.$route.params.code}`)
      this.$store.dispatch('setWinner', {id: this.room.id, winner: this.winner.id})
    },
    computed: {
      games() {
        return this.$store.state.games.sort(function (a, b) { return b.score - a.score })
      },
      winner() {
        return this.games[0]
      },
      results() {
        return this.$store.state.games.slice(1)
      },
      room() {
        return this.$store.state.room
      }
    },
    methods:{
      launchGame(){
        window.open(`steam://run/${this.winner.appid}`, "_blank");
      }
    },
    components: {
      gameComponent
    },
  }
</script>

<style>

</style>