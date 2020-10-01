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
          <img src="https://images-na.ssl-images-amazon.com/images/I/416zAtw+MML._SX306_BO1,204,203,200_.jpg">
      </div>
    </div>
    <div style="height: 5vh"></div>
    <div class="row">
      <div class="col-12">
        <h1 class="flashy neon red text-center">Runners Up:</h1>
      </div>
    </div>
    <div style="height: 5vh"></div>
    <div class="row">
        <game-component class="col-4 text-center" v-for="game in games" :key="game.id" :gameData="game"/>
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
    return this.$store.state.games
  }
},
components: {
  gameComponent
},
}
</script>

<style>

</style>