<template>
  <div class="container-fluid background">
    <div class="row">
      <div class="col-12 col-md-7">
        <div class="card text-center my-2 bg-dark">
          <div class="card-header red">
            <h3>Create a New Room</h3>
          </div>
          <div class="card-body">
            <form @submit.prevent="addRoom" class="row justify-content-center form-inline">
              <div class="form-group m-2">
                <label class="neon blue mx-2" for="room">Room Name</label>
                <input id="room-name-input" type="text" placeholder="New room name..." name="room"
                  v-model="newRoom.name" required class="neon blue form-control" />
              </div>
              <div class="form-group">
                <label class="neon blue mx-2" for="vetos">Allowed User Vetos</label>
                <select class="neon blue form-control mr-2" placeholder="User vetos" name="vetos" id="vetos"
                  v-model="newRoom.options.userVetos">
                  <option id="one-veto-option" class="neon blue" value="0">0</option>
                  <option id="two-veto-option" class="neon blue" value="1">1</option>
                  <option id="three-veto-option" class="neon blue" value="2">2</option>
                  <option id="four-veto-option" class="neon blue" value="3">3</option>
                </select>
              </div>
              <div class="form-check">
                <label class="neon blue mx-2" for="vetos">Participants can add items</label>
                <input v-model='newRoom.options.userItems' class="form-check-input position-static" type="checkbox"
                  id="blankCheckbox" value="test" aria-label="...">
              </div>
              <div class="form-group w-75">
                <label class="neon blue" for="formConsensus">Required Consensus: {{newRoom.options.consensus}}%</label>
                <input type="range" class="form-control-range" min="50" max="100" v-model="newRoom.options.consensus"
                  id="formConsensus">
              </div>
              <div class="form-group w-75">
                <label class="neon blue" for="formQuestionTime">Allowed Vote Time:
                  {{newRoom.options.questionTime}}s</label>
                <input type="range" class="form-control-range mr-2" min="5" max="60"
                  v-model="newRoom.options.questionTime" id="formQuestionTime">
              </div>
              <div class="form-group w-75">
                <label class="neon blue" for="formPollItems">Allowed Poll Items: {{newRoom.options.pollItems}}</label>
                <input type="range" class="form-control-range mr-2" min="2" max="20" v-model="newRoom.options.pollItems"
                  id="formPollItems">
              </div>
              <button id="create-poll-btn" type="submit" class="btn btn-primary flashy neon blue w-25 mx-1 mt-3"> Go!
              </button>
            </form>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-5">
        <div class="card text-center my-2 bg-dark">
          <div class="card-header red">
            <h3>My Previous Polls</h3>
          </div>
          <div v-if="this.myRooms.length > 0" class="card poll-container-create">
            <historic-poll-component v-for="room in myRooms" :key="room.id" :pollData="room" />
          </div>
          <div v-else class="div p-5 neon blue align-items-center justify-content-center d-flex row">
                <div class="col-1">
                  <i class="fas fa-comment-slash text-muted"></i>
                  </div>
          <p class="text-muted">nothing here</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import historicPollComponent from "../components/HistoricPollComponent.vue"
  export default {
    name: "Rooms",
    data() {
      return {
        newRoom: {
          name: "",
          options: {
            consensus: 75,
            questionTime: 30,
            pollItems: 7,
            userItems: false
          }
        }
      }
    },
    computed: {
      activeroom() {
        return this.$store.state.room
      },
      myRooms() {
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
        this.newRoom.options.consensus = parseInt(this.newRoom.options.consensus)
        this.newRoom.options.questionTime = parseInt(this.newRoom.options.questionTime)
        this.newRoom.options.pollItems = parseInt(this.newRoom.options.pollItems)
        this.newRoom.options.userVetos = parseInt(this.newRoom.options.userVetos)
        this.$store.dispatch("createRoom", this.newRoom)
      }
    },
    mounted() {
      this.$store.dispatch('joinRoom', "default")
      this.$store.dispatch("setMyName", this.profile.name)
      this.$store.dispatch("getRooms")
    },
    components: {
      historicPollComponent,
    },

  }
</script>

<style>
@media only screen and (max-width: 600px){
  .form-check-input{
  margin-left: 2px;
  }
}


</style>