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
        <game-component class="col-12 mx-1 text-center" :gameData="this.winner" />
        <p class="neon green">{{(winner.upvotes/room.names.length) *100}}% agree</p>
        <p class="neon bad">{{(winner.downvotes/room.names.length) *100}}% disagree</p>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-12 offset-md-4 col-md-4">
        <h1 class="red card bg-dark text-center">Runners Up:</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-4 text-center mx-2" v-for="game in results" :key="game.id">
      <game-component   :gameData="game" />
      <p class="neon green">{{(game.upvotes/room.names.length) *100}}% agree</p>
      <p class="neon bad">{{(game.downvotes/room.names.length) *100}}% disagree</p>
      </div>
    </div>
  </div>
</template>

<script>
  import gameComponent from "../components/GameComponent"
  export default {
    name: "Results",
    computed: {
      games() {
        return this.$store.state.games.sort(function (a, b) { return b.score - a.score })
      },
      winner() {
        return this.games[0]
      },
      results(){
        return this.$store.state.games.slice(1)
      },
      room(){
        return this.$store.state.room
      }
    },
    mounted() {
      this.$store.dispatch("getGames", this.$route.params.code)
      this.$store.dispatch('leaveRoom', `${this.$route.params.code}`)
    },
    components: {
      gameComponent
    },
  }
</script>

<style>

</style>