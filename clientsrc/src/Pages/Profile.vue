<template>
  <div class="container-fluid">
    <div style="height: 10vh"></div>
    <div class="row">
      <div class="col-4">
          <div class="card" style="height: 60vh">
            <img class="card-img-top" :src="profile.picture" alt="Card image cap" style="height: 30vh">
            <div class="card-body">
              <h5 class="card-title">Welcome {{ profile.name }}</h5>
              <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <p>{{profile.email}}</p>
            </div>
          </div>
      </div>
      <div class="col-8">
        <div class="card bg-dark text-dark">
          <img class="card-img" src="https://images.unsplash.com/photo-1601293058843-f34e8dd9ccfd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1900&q=80" alt="Card image" style="height: 60vh">
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
  }
};
</script>

<style scoped>

</style>
