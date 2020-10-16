<template>
  <div class="card bg-dark neon blue m-1 justify-content-between animate__animated animate__fadeIn">
    <h2>{{pollData.name}} <i id="delete-historic-poll" class="fa fa-trash float-right fa-sm mt-2 mr-2"
        @click="deletePoll" aria-hidden="true"></i>
    </h2>
    <button id="rehost-poll-btn" type="button" @click="rehost" class="btn btn-outline-secondary">Re-host poll</button>
  </div>
</template>

<script>
  import as from "../store/alertsService.js"
  export default {
    name: "historicPollComponent",
    props: ["pollData"],
    computed: {
      profile() {
        return this.$store.state.profile;
      },
      games() {
        return this.$store.state.games
      }
    },
    methods: {
      async deletePoll() {
        if (await as.confirmDelete()) { this.$store.dispatch("deleteRoom", this.pollData.id) }
      },
      rehost() {
        this.pollData.completed = false
        this.pollData.started = false
        this.pollData.names = []
        this.$store.dispatch("resetRoom", this.pollData)
        this.$store.dispatch("setMyName", this.profile.name)
        this.$router.push({ name: "Room", params: { code: this.pollData.code } })
      }
    }

  }
</script>

<style>
  .fa {
    cursor: pointer;
  }

  .fa:hover {
    text-shadow: 0 0 12px #81C8FF, 0px 0px 3px #fff
  }
</style>