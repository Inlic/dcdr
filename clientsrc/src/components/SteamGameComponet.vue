<template>
  <div class="col-12 card my-2 content-shadow pop">
    <div class="row justify-content-between">
      <img :src="this.imgurl" alt="">
      <h4>{{gameData.name}}</h4>
      <button type="button" class="btn btn-primary" @click="addGame" >Add to poll</button>
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
      return `http://media.steampowered.com/steamcommunity/public/images/apps/${this.gameData.appid}/${this.gameData.img_logo_url}.jpg`
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
    console.log(this.newGame);
    this.$store.dispatch("createGame", this.newGame)
  }
  }
  
}
</script>

<style>

</style>