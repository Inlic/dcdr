<template>
  <div class="container-fluid background">
    <div class="row">
      <div class="col-12 col-md-4 mt-5">
        <div class="card border-0">
          <img class="card-img-top" :src="profile.picture" alt="Card image cap">
          <div class="card-body bg-dark">
            <h3 class="card-title red">Welcome: {{ profile.name }}</h3>
            <p class="card-text neon blue">Some quick example text to build on the card title and make up the bulk of
              the card's content.</p>
            <p class="neon green">{{profile.email}}</p>
            <i class="fas fa-pen-alt" aria-hidden="true" @click="toggleEdit"></i>
            <form v-if="editing" class="form-inline" @submit.prevent="finishEdit">
              <div class="form-group">
                <label class="neon blue">New Profile Name:</label>
                <input type="text" v-model="eProfile.name" class="form-control m-3 neon blue" placeholder="New Name">
              </div>
              <div class="form-group">
                <label class="neon blue">New Profile Steam Id:</label>
                <input type="text" v-model="eProfile.steamId" class="form-control m-3 neon blue" placeholder="Steam Id">
              </div>
              <div class="form-group">
                <label class="neon blue">New Profile Picture:</label>
                <input type="text" v-model="eProfile.picture" class="form-control m-1 neon blue"
                  placeholder="New Picture URL">
                <button class="btn btn-primary mx-2 flashy neon blue" type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-8 mt-5">
        <div class="card bg-dark text-light p-4">
          <img class="card-img profile-img-overlay" src="@/assets/gameon.jpg" alt="Card image">
          <div class="card-img-overlay">
            <h3 class="card-title red">My Channel</h3>
            <p class="card-text neon blue">This is where I could potentially invite people to hang out and run polls.
              Also where I would receive messages or feeds if I was subscribed to those things.</p>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12 my-5">
      <div class="card bg-dark">
        <div class="card-header text-center red">
          <h3>My Previous Polls</h3>
        </div>
        <div class="card">
          <div class="card bg-dark neon blue m-1 text-center" v-for="room in myRooms" :key="room.id">{{room.name}}</div>  
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Profile",
    mounted(){
      this.$store.dispatch("getRooms")
    },
    computed: {
      profile() {
        return this.$store.state.profile;
      },
      myRooms(){
        return this.$store.state.myRooms;
      }
    },
    data() {
      return {
        eProfile: {},
        editing: false
      }
    },
    methods: {
      toggleEdit() {
        this.eProfile = this.profile,
          this.editing = !this.editing
      },
      finishEdit() {
        this.editing = false
        this.$store.dispatch("editProfile", this.eProfile)
      }
    }
  };
</script>

<style scoped>
  .fas {
    color: #b22167
  }
</style>