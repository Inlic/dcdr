<template>
  <div class="container-fluid background">
    <div style="height: 2.5vh"></div>
    <div class="row justify-content-around text-center">
      <div class="col-1 align-self-center">
        <button type="button" @click="voteUp" class="btn btn-primary flashy neon blue">
        <i class="far fa-thumbs-up "></i>
        </button>
      </div>
      <div class="col-8">
        <game-component style="height: 40vh" :gameData="this.activeGame" />
      </div>
      <div class="col-1 align-self-center">
        <button @click="voteDown" type="button" class="btn btn-primary flashy neon blue">
        <i class="far fa-thumbs-down"></i>
        </button>
      </div>
      <div class="col-4 justify-content-center my-2">
        <button type="button" class="btn btn-warning flashy neon purple">
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
        this.$router.push({ name: 'Results', params: { code: this.$route.params.code } })
      }
    }
  }

}
</script>

<style>

</style>