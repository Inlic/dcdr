<template>
  <div class="container-fluid background">
    <div class="divider-tiny"></div>
    <div class="row text-center">
      <div class="d-none d-lg-block col-1">
        <button @click="voteDown" type="button" class="mid-page btn btn-primary flashy neon blue">
        <i class="far fa-thumbs-down"></i>
        </button>
      </div>
      <div class="col-12 col-lg-10" @touchstart="startSwipe" @touchmove="moveSwipe">
        <game-component style="height: 80vh;" :gameData="this.activeGame" />
      </div>
      <div class="d-none d-lg-block col-1">
        <button type="button" @click="voteUp" class="mid-page btn btn-primary flashy neon blue">
        <i class="far fa-thumbs-up "></i>
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
import gameComponent from "../components/GameComponent"
export default {
  name:"Vote",
  data() {
      return {
        index: 0,
        xDown: null,
        xCurrent: null,
        startDrag: false,
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
    },
    getMouseXPosFromEvent(event){
      return event.clientX || event.touches[0].pageX;
    },
    startSwipe(event){
      this.xDown = this.getMouseXPosFromEvent(event);
      this.startDrag = true;
    },
    moveSwipe(){
      if( !this.startDrag ){
        return;
      }
      this.xCurrent = this.getMouseXPosFromEvent(event);
      const delta = this.xCurrent - this.xDown
      this.endSwipe(delta)
      this.xDown = null;
    },
    endSwipe(delta){
      this.startDrag = false;
      if(delta > 0){
        this.voteUp()
      } else{
        this.voteDown()
      }
    },
  }
}
</script>

<style>

</style>