<template>
  <div class="container-fluid">
    <div class="row justify-content-around text-center">
      <div class="col-1 align-self-center">
        <button type="button" @click="voteUp" class="btn btn-outline-primary">
        <i class="far fa-thumbs-up "></i>
        </button>
      </div>
      <div class="col-8">
        <game :gameData="this.activeGame" />
      </div>
      <div class="col-1 align-self-center">
        <button @click="voteUp" type="button" class="btn btn-outline-primary">
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
import game from "../components/game"
export default {
  name:"Vote",
  components:{
    game
  },
  computed: {
    activeGame(){
      return this.$store.state.activeGame
    },
    games(){
      return this.$store.state.games
    }
  },
  mounted(){
    console.log(this.games[0].id);
    this.$store.dispatch("getGamebyID", this.games[0].id)
  },
  methods:{
    voteUp(){
      
    },
    voteDown(){

    }
  }

}
</script>

<style>

</style>