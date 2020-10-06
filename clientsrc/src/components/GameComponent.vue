<template>
  <div class="card bg-dark">
    <div class="card-header">
      <h3 class="orange">{{gameData.name}}</h3>
    </div>
    <div class="card-body">
    <img class="img-fluid" :src="gameData.imgUrl">
    <h6 v-if="!gameData.veto" class="orange">Score: {{gameData.score}}</h6>
    <h6 v-else class="flashy neon purple">V-<i class="fas fa-frog"></i></h6>
    <button type="button" class="btn btn-primary flashy neon blue" @click='deleteGame'>Remove gaemu</button>
    </div>
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