<template>
  <div class="col-12 card my-3 content-shadow animate__animated animate__fadeInRight">
    <div class="row justify-content-between">
      <img class="col" :src="gameData.imgUrl" alt="" style="max-height: 100px; max-width: 200px">
      <h6 class="align-self-center steam col">{{gameData.name}}</h6>
      <button id="remove-game-button" type="button" class="btn btn-primary m-1 col-2" @click="removeGame">Remove from
        poll</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "game-vote-component",
    props: ["gameData"],
    computed: {
      room() {
        return this.$store.state.room
      },
    },
    methods: {

      removeGame() {
        this.$store.dispatch("deleteGame", this.gameData.id)
      }
    }

  }
</script>

<style>

</style>