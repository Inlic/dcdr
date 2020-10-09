<template>
  <div class="col-12 card my-3 content-shadow animate__animated animate__fadeInRight">
    <div class="row justify-content-between">
      <img class="col" :src="gameData.imgUrl" alt="" style="max-height: 100px; max-width: 200px">
      <h6 class="align-self-center steam col">{{gameData.name}}</h6>
      <button id="remove-game-button" type="button" class="btn btn-primary m-1 col-lg-2" @click="removeGame"><span class="long-text blue">Remove from
        poll</span><span class="short-text blue">-</span></button>
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
@media only screen and (min-width: 601px){
  .long-text{
    display: inline-block;
    font-size: 1.5rem;
  }
  .short-text{
    display: none;
  }
}

@media only screen and (max-width: 600px){
  .short-text{
    display: inline-block;
    font-size: 3rem;
  }
  .long-text{
    display: none;
  }
}

</style>