<template>
  <div class="card bg-dark neon blue m-1">
    <div class="h1">{{pollData.name}}</div>
    <button type="button" @click="rehost" class="btn btn-outline-primary">Re-host poll</button>
  </div>
</template>

<script>
export default {
  name: "historicPollComponent",
  props: ["pollData"],
  computed:{
    profile() {
        return this.$store.state.profile;
      },
    games(){
      return this.$store.state.games
    }
  },
  methods:{
    rehost(){
      this.$store.dispatch("getGames", this.pollData.code)
      games.forEach(game => {
        game.upvotes = 0
        game.downvotes = 0
        game.score = 0
        this.$store.dispatch("editGame", game)
      });

      this.pollData.compleated = false
      this.pollData.started = false
      this.$store.dispatch("editRoom", this.pollData)
      this.$store.dispatch("setMyName", this.profile.name)
      this.$router.push({ name: "Room", params:{code:this.pollData.code} })
    }
  }

}
</script>

<style>

</style>