<template>
  <div class="container-fluid background">
    <div class="divider-tiny"></div>
    <div class="row text-center">
      <div class="col-1">
        <button type="button" @click="voteUp" class="btn btn-primary flashy neon blue">
        <i class="far fa-thumbs-up "></i>
        </button>
      </div>
      <div class="col-10">
        <game-component style="height: 80vh;" :gameData="this.activeGame" />
      </div>
      <div class="col-1">
        <button @click="voteDown" type="button" class="btn btn-primary flashy neon blue">
        <i class="far fa-thumbs-down"></i>
        </button>
      </div>
    </div>
    <div class="row text-center fixed-bottom my-3">
      <div class="offset-4 col-4">
        <button type="button" class="btn btn-primary flashy neon blue">
          <i class="fas fa-times-circle"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
//FIXME restyle vote component when mongo servers are up
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
    this.$store.dispatch('joinRoom', `${this.$route.params.code}`)
  },
  methods:{
    voteUp(){
      if(!this.activeGame.id){this.$store.dispatch("getGamebyID", this.games[this.index].id)}
      this.$store.dispatch("upGame", {id:this.activeGame.id, code:this.$route.params.code})
      this.getNext()
    },
    voteDown(){
      if(!this.activeGame.id){this.$store.dispatch("getGamebyID", this.games[this.index].id)}
      this.$store.dispatch("downGame", this.activeGame, this.$route.params.code)
      this.getNext()
    },
    getNext(){
      this.index ++
      if(this.index < this.games.length){
      this.$store.dispatch("getGamebyID", this.games[this.index].id)}
      else{
        this.$router.push({ name: 'WaitResults', params: { code: this.$route.params.code } })
      }
    }
  }

}
</script>

<style>

</style>