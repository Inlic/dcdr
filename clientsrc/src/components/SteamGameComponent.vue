<template>
  <div :id="gameData.name" class="col-12 card my-3 content-shadow">
    <div class="row justify-content-between">
      <img class="col" :src="this.imgurl" alt="" style="max-height: 100px; max-width: 200px">
      <h6 class="align-self-center steam col">{{gameData.name}}</h6>
      <button id="add-steam-game-btn" type="button" class="btn btn-primary m-1 col-lg-2" @click="addGame"><span class="long-text blue">Add to
        poll</span><span class="short-text blue">+</span></button>
    </div>
  </div>
</template>

<script>
  import as from "../store/alertsService.js"
  export default {
    name: "steam-game-component",
    props: ["gameData"],
    data() {
      return {
        newGame: {}
      }
    },
    computed: {
      imgurl() {
        return `https://media.steampowered.com/steamcommunity/public/images/apps/${this.gameData.appid}/${this.gameData.img_logo_url}.jpg`
      },
      room() {
        return this.$store.state.room
      },
      games() {
        return this.$store.state.games
      }
    },
    methods: {
      addGame() {
        if (this.games.length < this.room.options.pollItems) {
          this.newGame.roomId = this.room.id
          this.newGame.name = this.gameData.name
          this.newGame.imgUrl = this.imgurl
          this.newGame.code = this.$route.params.code
          this.newGame.appid = this.gameData.appid
          //TODO edit delay for animation
          // let target = document.getElementById(this.gameData.name)
          // target.classList.add('animate__animated', 'animate__fadeOutRight')
          this.$store.dispatch("createGame", this.newGame)
          this.$store.dispatch("removeFromList", this.newGame)
        }
        else {
          as.gameLength(this.room.options.pollItems)
        }
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
    font-size: 1.5rem;
  }
  .long-text{
    display: none;
  }
}


</style>