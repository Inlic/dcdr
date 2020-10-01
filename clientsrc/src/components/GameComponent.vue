<template>
  <div class="card bg-dark">
    <h1 class="flashy neon orange">{{gameData.name}}</h1>
    <img class="img-fluid" :src="gameData.imgUrl">
  </div>
</template>

<script>
export default {
  name:"game-component",
  props:["gameData"],
  data(){
    return {}
  }
}
</script>

<style>

</style>