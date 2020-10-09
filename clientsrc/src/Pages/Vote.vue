<template>
  <div class="container-fluid background">
    <div class="row text-center mt-2">
      <div class="d-none d-lg-block col-1">
        <button id="downvote-btn" @click="voteDown" type="button" class="mid-page btn btn-primary flashy neon blue">
          <i class="far fa-thumbs-down"></i>
        </button>
      </div>
      <div class="col-12 col-lg-10" @touchstart="startSwipe" @touchmove="moveSwipe">
        <game-component class="voting" style="height: 85vh;" :gameData="this.activeGame" />
      </div>
      <div class="d-none d-lg-block col-1">
        <button id="downvote-btn" type="button" @click="voteUp" class="mid-page btn btn-primary flashy neon blue">
          <i class="far fa-thumbs-up "></i>
        </button>
      </div>
    </div>
    <div class="row text-center fixed-bottom my-3">
      <div class="offset-4 col-4 card">
        <h2 class="red">Remaining Time</h2>
        <div class="progress">
          <div class="progress-bar bg-primary glow" role="progressbar" :style="progressStyle">{{counter}}s</div>
        </div>
        <h2 class="red">Item {{currentItemNum}} of {{games.length}}</h2>
        <button id="veto-btn" @click="veto" v-if="vetos" type="button" class="btn btn-primary flashy neon blue mb-3">
          <i class="fas fa-times-circle"></i>
        </button>
        <p class="neon" :class="{green: vetos, bad: !vetos }">Vetos Remaining: {{vetos}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import gameComponent from "../components/GameComponent"
  import as from '../store/alertsService'
  export default {
    name: "Vote",
    mounted() {
      this.$store.dispatch("startVote", this.$route.params.code)
      this.$store.dispatch('joinRoom', `${this.$route.params.code}`)
      this.vetos = this.room.options.userVetos
      this.counter = this.room.options.questionTime
      this.interval = setInterval(() => {
        this.counter--
        this.progressStyle = "width:" + (Math.floor((this.counter / this.room.options.questionTime) * 100 - (100 * (1 / this.room.options.questionTime)))) + "%"
      }, 1000)
    },
    data() {
      return {
        index: 0,
        xDown: null,
        xCurrent: null,
        timeout: null,
        vetos: 0,
        interval: null,
        counter: 0,
        progressStyle: "width: 100%",
      }
    },
    computed: {
      activeGame() {
        if (this.$store.state.activeGame.veto == true) {
          this.getNext()
        }
        this.timeout = setTimeout(this.getNext, this.room.options.questionTime * 1000);
        return this.$store.state.activeGame
      },
      games() {
        return this.$store.state.games
      },
      room() {
        return this.$store.state.room
      },
      currentItemNum() {
        let num = this.index
        return num + 1
      },
    },
    methods: {
      voteUp() {
        if (!this.activeGame.id) { this.$store.dispatch("getGamebyID", this.games[this.index].id) }
        this.$store.dispatch("upGame", { id: this.activeGame.id, code: this.$route.params.code })
        this.getNext()
      },
      voteDown() {
        if (!this.activeGame.id) { this.$store.dispatch("getGamebyID", this.games[this.index].id) }
        this.$store.dispatch("downGame", this.activeGame, this.$route.params.code)
        this.getNext()
      },
      veto() {
        this.vetos--
        if (!this.activeGame.id) { this.$store.dispatch("getGamebyID", this.games[this.index].id) }
        this.$store.dispatch("vetoGame", this.activeGame)
      },
      getNext() {
        this.index++
        clearTimeout(this.timeout)
        clearInterval(this.interval)
        this.progressStyle = "width: 100%"
        this.counter = this.room.options.questionTime
        if (this.index < this.games.length) {
          this.$store.dispatch("getGamebyID", this.games[this.index].id)
          this.interval = setInterval(() => {
            this.counter--
            this.progressStyle = "width:" + (Math.floor((this.counter / this.room.options.questionTime) * 100 - (100 * (1 / this.room.options.questionTime)))) + "%"
          }, 1000)
        }
        else {
          clearTimeout(this.timeout)
          clearInterval(this.interval)
          this.$store.dispatch("userDone", this.$route.params.code)
          this.$router.push({ name: 'WaitResults', params: { code: this.$route.params.code } })
        }
      },
      getMouseXPosFromEvent(event) {
        return event.clientX || event.touches[0].pageX;
      },
      startSwipe(event) {
        this.xDown = this.getMouseXPosFromEvent(event);
        this.startDrag = true;
      },
      moveSwipe() {
        if (!this.startDrag) {
          return;
        }
        this.xCurrent = this.getMouseXPosFromEvent(event);
        const delta = this.xCurrent - this.xDown
        this.endSwipe(delta)
        this.xDown = null;
      },
      endSwipe(delta) {
        this.startDrag = false;
        if (delta > 0) {
          this.voteUp()
        } else {
          this.voteDown()
        }
      },
    },
    components: {
      gameComponent
    },
    async beforeRouteLeave(to, from, next) {
      if(!this.room.completed){
        if(this.index != this.games.length){
        if(await as.confirmLeave()){
          this.$store.dispatch("removeName", {id: this.room.id})
          this.$store.dispatch('leaveRoom', this.$route.params.code)
          clearInterval(this.interval)
          clearTimeout(this.timeout)
          next()
        }
      }}
      clearInterval(this.interval)
      clearTimeout(this.timeout)
      next()
    }
  
  }
</script>

<style>
  .voting img{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  }

@media only screen and (max-width: 600px){
  .voting img{
  min-height: 20vh;
  min-width: 40vh;
  }
}

@media only screen and (min-width: 601px) and (max-width: 1024px){
  .voting img{
  min-height: 30vh;
  min-width: 60vh;
  }
}

@media only screen and (min-width: 1025px){
  .voting img{
  min-height: 40vh;
  min-width: 80vh;
  }
}

  .progress-bar {
    transition: all 1000ms linear;
    color: white;
    font-size: 14pt;
  }
  .glow{
  box-shadow: 0 5px 5px rgba(255, 255, 255, .7) inset,
              0 -5px 5px rgba(255, 255, 255, .7) inset;
  animation: animate-glow 1s ease-out infinite;
}

@keyframes animate-glow {
  0% {
    box-shadow: 0 5px 5px rgba(255, 255, 255, .7) inset,
                0 -5px 5px rgba(255, 255, 255, .7) inset;
  }
  50% {
    box-shadow: 0 5px 5px rgba(255, 255, 255, .3) inset,
                0 -5px 5px rgba(255, 255, 255, .3) inset;
  }
  100% {
    box-shadow: 0 5px 5px rgba(255, 255, 255, .7) inset,
                0 -5px 5px rgba(255, 255, 255, .7) inset;
  }
}

</style>