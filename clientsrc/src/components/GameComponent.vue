<template>
  <div class="row card bg-dark">
    <div class="card-header">
      <h3 class="orange">{{gameData.name}}</h3>
    </div>
    <div class="card-body" style="min-height: 15vh;">
      <img class="img-fluid" :src="gameData.imgUrl" style="max-height: 100px; max-width: 200px">
      <div v-if="this.$route.name == 'Results'">
        <div class="progress mt-3">
          <div class="progress-bar bg-success" role="progressbar"
            v-bind:style="{width: `${(gameData.upvotes / this.totalVotes) * 100}%`}" aria-valuenow="30"
            aria-valuemin="0" aria-valuemax="100">
            {{gameData.upvotes}}
            ({{`${((gameData.upvotes / this.totalVotes) * 100).toFixed(0)}%`}})
          </div>
          <div class="progress-bar bg-danger" role="progressbar"
            v-bind:style="{width: `${((gameData.downvotes / this.totalVotes) * 100)}%`}" aria-valuenow="20"
            aria-valuemin="0" aria-valuemax="100">{{gameData.downvotes}}
            ({{`${((gameData.downvotes / this.totalVotes) * 100).toFixed(0)}%`}})</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "game-component",
    props: ["gameData", "totalVotes"],
    mounted() {
    },
    data() {
      return {
      }
    },
    computed: {
      upVote() {
        return `${(this.gameData.upvotes / this.totalVotes) * 100}%`
      }
    },
    methods: {
    }
  }
</script>

<style>
.progress-bar.bg-success{
  color: black;
  font-size: 12pt;
}
.progress-bar.bg-danger{
  color: white;
  font-size: 12pt;
}

</style>