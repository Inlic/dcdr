<template>
  <div class="row card bg-dark">
      <div class="my-2 card-header">
        <h3 class="orange">{{gameData.name}}</h3>
      </div>
      <div class="card-body">
      <img class="img-fluid" :src="gameData.imgUrl">
      <h6 v-if="!gameData.veto" class="orange">Score: {{gameData.score}}</h6>
      <h6 v-else class="flashy neon purple">V-<i class="fas fa-frog"></i></h6>
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
  }
}
</script>

<style>

</style>