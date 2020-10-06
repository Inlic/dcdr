<template>
  <div class="card bg-dark">
    <h1 class="flashy neon orange">{{gameData.name}}</h1>
    <img class="img-fluid" :src="gameData.imgUrl">
    <h6 v-if="!gameData.veto" class="flashy neon orange">Score: {{gameData.score}}</h6>
    <h6 v-else class="flashy neon purple">V-<i class="fas fa-frog"></i></h6>
    <button type="button" class="btn btn-danger" @click='deleteGame'>Remove gaem</button>
  </div>
</template>

<script>
export default {
  name:"game-component",
  props:["gameData"],
  data(){
    return {}
  },
  methods: {
    deleteGame(){
      this.$store.dispatch("deleteGame", this.gameData._id)
    }
  }
}
</script>

<style>

</style>