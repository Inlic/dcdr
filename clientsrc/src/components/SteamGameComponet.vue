<template>
  <div class="col-12 card my-3 content-shadow">
    <div class="row justify-content-between">
      <img class="col" :src="this.imgurl" alt="">
      <h6 class="align-self-center steam col">{{gameData.name}}</h6>
      <button type="button" class="btn btn-primary m-1 col-2" @click="addGame" >Add to poll</button>
    </div>
  </div>
</template>

<script>
export default {
  name:"steam-game-component",
  props:["gameData"],
  data(){
    return{
      newGame: {}
    }
  },
  computed: {
    imgurl(){
      return `https://media.steampowered.com/steamcommunity/public/images/apps/${this.gameData.appid}/${this.gameData.img_logo_url}.jpg`
    },
    room() {
        return this.$store.state.room
      },
  },
  methods:{

    addGame(){
    this.newGame.roomId = this.room.id
    this.newGame.name = this.gameData.name
    this.newGame.imgUrl = this.imgurl
    this.newGame.code = this.$route.params.code
    console.log(this.newGame);
    this.$store.dispatch("createGame", this.newGame)
    this.$store.dispatch("removeFromList", this.newGame)
  }
  }
  
}
</script>

<style>

</style>