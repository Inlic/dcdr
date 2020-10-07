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
      this.pollData.compleated = false
      this.pollData.started = false
      this.pollData.names = []
      this.$store.dispatch("resetRoom", this.pollData)
      this.$store.dispatch("setMyName", this.profile.name)
      this.$router.push({ name: "Room", params:{code:this.pollData.code} })
    }
  }

}
</script>

<style>

</style>