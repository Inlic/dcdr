<template>
  <div class="container-fluid">
    <div class="row justify-content-around text-center">
      <div class="col-1 align-self-center">
        <button type="button" @click="voteUp" class="btn btn-outline-primary">
        <i class="far fa-thumbs-up "></i>
        </button>
      </div>
      <div class="col-8">
        <game-component :gameData="this.activeGame" />
      </div>
      <div class="col-1 align-self-center">
        <button @click="voteDown" type="button" class="btn btn-outline-primary">
        <i class="far fa-thumbs-down"></i>
        </button>
      </div>
      <div class="col-4 justify-content-center my-2">
        <button type="button" class="btn btn-danger">
          <i class="fas fa-times-circle"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import gameComponent from "../components/GameComponent"
export default {
  name:"Vote",
  data() {
      return {
        index: 0
      }
    },
  components:{
    gameComponent
  },
  computed: {
    activeGame(){
        return this.$store.state.activeGame
    },
    games(){
      return this.$store.state.games
    },
    room(){
      return this.$store.state.room
    }
  },
  mounted(){
    // this.$store.dispatch("getGames", this.$route.params.code)
    // this.$store.dispatch("getGamebyID", this.games[0].id)
    this.$store.dispatch("startVote", this.$route.params.code)
  },
  methods:{
    voteUp(){
      if(!this.activeGame.id){this.$store.dispatch("getGamebyID", this.games[this.index].id)}
      this.$store.dispatch("upGame", this.activeGame)
      this.getNext()
    },
    voteDown(){
      if(!this.activeGame.id){this.$store.dispatch("getGamebyID", this.games[this.index].id)}
      this.$store.dispatch("downGame", this.activeGame)
      this.getNext()
    },
    getNext(){
      this.index ++
      if(this.index < this.games.length){
      this.$store.dispatch("getGamebyID", this.games[this.index].id)}
      else{
        this.$router.push({ name: 'Results', params: { code: this.$route.params } })
      }
    }
  }

}
</script>

<style>

</style>