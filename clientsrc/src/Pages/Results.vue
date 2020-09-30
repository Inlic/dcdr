<template>
  <div class="container-fluid">
    <div class="row">
      <h1 class="text-center">
        The winner is:
      </h1>
      <game/>
    </div>
    <div class="row">
      <div class="col-10 bg-seconday">
        <h4>runners up</h4>
        <ul>
          <li>Game</li>
          <li>Game</li>
          <li>Game</li>
          <li>Game</li>
          <li>BEAR</li>
          <li>Game</li>
          <li>Game</li>
          <li>Game</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import game from "../components/game.vue"
export default {
name:"Results",
componets: {
  game
}
}
</script>

<style>

</style>