<template>
  <div class="container-fluid">
    <div class="row">
      <h1 class="text-center">
        The winner is:
      </h1>
      <game-component/>
    </div>
    <div class="row">
      <div class="col-10 bg-seconday">
        <h4>runners up</h4>
        <ul>
          <game-component v-for="game in games" :key="game.id" gameData="game"/>
        </ul>
      </div>
    </div>
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