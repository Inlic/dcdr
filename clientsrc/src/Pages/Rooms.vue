<template>
  <div class="container-fluid background">
    <div class="row justify-content-center">
      <div class="col-11 col-md-8">
        <div class="jumbotron mt-5 bg-dark text-center">
          <h1 class="display-4 flashy neon red">Create a Poll</h1>
          <p class="lead neon blue">Use this page to create a poll so you and your friends can get gaming quicker.</p>
          <hr>
          <p class="neon blue">Check out the poll options down below.</p>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="offset-1 col-10">
        <div class="card text-center my-5 bg-dark">
          <div class="card-header flashy neon red">
            <h5>Create a New Poll</h5>
          </div>
          <div class="card-body">
            <form @submit.prevent="addRoom" class="row justify-content-center">
              <input type="text" placeholder="New room name..." v-model="newRoom.name" required
                class="col-10 m-1 neon blue" />
              <button type="submit" class="btn btn-primary flashy neon blue"> Go! </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="offset-1 col-10">
        <div class="card text-center my-5 bg-dark">
          <div class="card-header flashy neon red">
            <h5>My Previous Polls</h5>
          </div>
          <div class="card-body">
            <h5 class="card-title neon blue">Prior Profile Polls would go here.</h5>
            <p class="card-text neon blue">Supporting text may or may not get removed.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Rooms",
    data() {
      return {
        newRoom: { name: "" }
      }
    },
    computed: {
      activeroom() {
        return this.$store.state.room
      },
      profile() {
        return this.$store.state.profile;
      },
      name() {
        return this.$store.state.name;
      }
    },
    methods: {
      addRoom() {
        this.$store.dispatch("setMyName", this.profile.name)
        this.$store.dispatch("createRoom", this.newRoom)
      }
    },
    mounted() {
      this.$store.dispatch('joinRoom', "default")
      this.$store.dispatch("setMyName", this.profile.name)
    },

  }
</script>

<style>

</style>