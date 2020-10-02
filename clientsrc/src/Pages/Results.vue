<template>
  <div class="container-fluid background">
    <div style="height: 2vh"></div>
    <div class="row">
      <div class="col-12 text-center">
        <h1 class=" flashy neon red">
          The winner is:
        </h1>
      </div>
    </div>
    <div style="height: 2vh"></div>
    <div class="row">
      <div class="offset-4 col-4 text-center">
          <game-component style="height: 40vh" :gameData="this.winner" />
      </div>
    </div>
    <div style="height: 5vh"></div>
    <div class="row">
      <div class="col-12">
        <h1 class="flashy neon red text-center">Runners Up:</h1>
      </div>
    </div>
    <div style="height: 5vh"></div>
    <div class="row justify-content-center">
        <game-component class="col-10 text-center p-3" v-for="game in games" :key="game.id" :gameData="game"/>
    </div>
    <div style="height: 10vh"></div>
  </div>
</template>

<script>
import gameComponent from "../components/GameComponent"
export default {
name:"Results",
computed: {
  games(){
    return this.$store.state.games.sort(function(a,b){return b.score-a.score})
  },
  winner(){
    return this.games[0]
  }
},
mounted(){
  this.$store.dispatch("getGames", this.$route.params.code)
},
components: {
  gameComponent
},
}
</script>

<style>

</style>