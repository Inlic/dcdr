<template>
  <div class="row card bg-dark">
    <div class="my-2 card-header">
      <h3 class="orange">{{gameData.name}}</h3>
    </div>
    <div class="card-body">
      <img class="img-fluid" :src="gameData.imgUrl">
      <!-- leaving this here in case we want to render game score again -->
      <!-- <h6 v-if="!gameData.veto" class="orange">Score: {{gameData.score}}</h6> -->
      <!-- <h6 v-else class="flashy neon purple">V-<i class="fas fa-frog"></i></h6> -->
      <div v-if="this.$route.name == 'Results'">
        <div class="progress">
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

</style>