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
            <h3>Create a New Room</h3>
          </div>
          <div class="card-body">
            <form @submit.prevent="addRoom" class="row justify-content-center form-inline">
              <div class="form-group mx-2">
              <label class="neon blue mx-2" for="room">Room Name</label>
              <input type="text" placeholder="New room name..." name="room" v-model="newRoom.name" required
                class="neon blue form-control" />
              </div>
              <div class="form-group">
              <label class="neon blue mx-2" for="vetos">Allowed User Vetos</label>
              <select class="neon blue form-control mr-2" placeholder="User vetos" name="vetos" id="vetos" v-model="newRoom.options.uservetos">
                <option class="neon blue" value="1">1</option>
                <option class="neon blue" value="2">2</option>
                <option class="neon blue" value="3">3</option>
              </select>
              </div>
              <div class="form-group">
                <label class="neon blue" for="formConsensus">Required Consensus: {{newRoom.options.consensus}}%</label>
                <input type="range" class="form-control-range" min="50" max="100" v-model="newRoom.options.consensus" id="formConsensus">
              </div>
              <div class="form-group">
                <label class="neon blue" for="formQuestionTime">Allowed Vote Time: {{newRoom.options.questionTime}}s</label>
                <input type="range" class="form-control-range" min="30" max="60" v-model="newRoom.options.questionTime" id="formQuestionTime">
              </div>
              <div class="form-group">
                <label class="neon blue" for="formPollItems">Allowed Poll Items: {{newRoom.options.pollItems}}</label>
                <input type="range" class="form-control-range" min="2" max="12" v-model="newRoom.options.pollItems" id="formPollItems">
              </div>
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
            <h5 v-for="room in myRooms" :key="room.id" class="card-title neon blue">{{room.name}}</h5>
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
        newRoom: { name: "", 
        options: { consensus: 75,
                   questionTime: 45,
                   pollItems: 8 } }
      }
    },
    computed: {
      activeroom() {
        return this.$store.state.room
      },
      myRooms(){
        return this.$store.state.myRooms;
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
      this.$store.dispatch("getRooms")
    },

  }
</script>

<style>

</style>