<template>
  <div class="container-fluid background">
    <div style="height: 10vh"></div>
    <div class="row">
      <div class="col-4">
          <div class="card" style="height: 70vh">
            <img class="card-img-top" :src="profile.picture" alt="Card image cap" style="height: 30vh">
            <div class="card-body">
              <h5 class="card-title">Welcome {{ profile.name }}</h5>
              <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <p>{{profile.email}}</p>
              <i class="fas fa-pen-alt" aria-hidden="true" @click="toggleEdit"></i>
              <form v-if="editing" class="form-inline" @submit="finishEdit">
                <div class="form-group">
                  <label>New Profile Name:</label>
                  <input type="text" v-model="eProfile.name" class="form-control ml-1" placeholder="New Name">
                </div>
                <div class="form-group">
                  <label>New Profile Picture:</label>
                  <input type="text" v-model="eProfile.picture" class="form-control ml-1" placeholder="New Picture URL">
                  <button class="btn btn-primary mx-2" type="submit">Submit</button>
                </div>
              </form>
            </div>
          </div>
      </div>
      <div class="col-8">
        <div class="card bg-dark text-dark">
          <img class="card-img" src="https://images.unsplash.com/photo-1601293058843-f34e8dd9ccfd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1900&q=80" alt="Card image" style="height: 70vh">
          <div class="card-img-overlay">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <p class="card-text">Last updated 3 mins ago</p>
          </div>
        </div>
      </div>
    </div>
    <div style="height: 10vh"></div>
    <div class="col-12">
      <div class="card">
        <div class="card-header">
          My Previous Polls
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Cras justo odio</li>
          <li class="list-group-item">Dapibus ac facilisis in</li>
          <li class="list-group-item">Vestibulum at eros</li>
        </ul>
      </div>
    </div>
    <div style="height: 10vh"></div>
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
  data(){
    return {
      eProfile:{},
      editing: false
    }
  },
  methods: {
    toggleEdit() {
      this.eProfile = this.profile,
      this.editing = !this.editing
    },
    finishEdit(){
      this.editing = false
      this.$store.dispatch("editProfile", this.eProfile)
    }
  }
};
</script>

<style scoped>

</style>
