<template>
  <div class="container-fluid background">
    <div class="row">
      <div class="col-12 col-md-4 mt-5">
        <div class="card border-0">
          <img class="card-img-top" :src="profile.picture" alt="Card image cap">
          <div class="card-body bg-dark">
            <h5 class="card-title flashy neon red">Welcome: {{ profile.name }}</h5>
            <p class="card-text neon blue">Some quick example text to build on the card title and make up the bulk of
              the card's content.</p>
            <p class="flashy neon green">{{profile.email}}</p>
            <i class="fas fa-pen-alt" aria-hidden="true" @click="toggleEdit"></i>
            <form v-if="editing" class="form-inline" @submit="finishEdit">
              <div class="form-group">
                <label class="neon blue">New Profile Name:</label>
                <input type="text" v-model="eProfile.name" class="form-control m-3 neon blue" placeholder="New Name">
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
            <h5 class="card-title flashy neon red">My Channel</h5>
            <p class="card-text neon blue">This is where I could potentially invite people to hang out and run polls.
              Also where I would receive messages or feeds if I was subscribed to those things.</p>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12 my-5">
      <div class="card bg-dark">
        <div class="card-header flashy neon red">
          My Previous Polls
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item bg-dark neon blue">Cras justo odio</li>
          <li class="list-group-item bg-dark neon blue">Dapibus ac facilisis in</li>
          <li class="list-group-item bg-dark neon blue">Vestibulum at eros</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Profile",
    computed: {
      profile() {
        return this.$store.state.profile;
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