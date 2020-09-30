<template>
  <div class="container-fluid background">
    <div style="height: 10vh"></div>
    <div class="row">
      <div class="offset-2 col-8">
        <div class="jumbotron" style="height: 40vh">
          <h1 class="display-4">Hello, world!</h1>
          <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
          <hr class="my-4">
          <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
        </div>
      </div>
    </div>
    <div style="height: 10vh"></div>
    <div class="row">
      <div class="offset-1 col-10">
        <div class="card text-center" style="height: 60vh">
          <div class="card-header">
            Create a New Poll
          </div>
          <div class="card-body">
              <h5 class="card-title">Create Room</h5>
            <form @submit.prevent="addRoom" class="row justify-content-center">
            <input type="text" placeholder="name" v-model="newRoom.name" required class="col-10 m-1" />
            <button type="submit" class="btn btn-success"> Go! </button>
            </form>
          </div>
          <div class="card-footer text-muted">
            2 days ago
          </div>
        </div>
      </div>
    </div>
    <div style="height: 10vh"></div>
    <div class="row">
      <div class="offset-1 col-10">
        <div class="card text-center" style="height: 60vh">
          <div class="card-header">
            My Previous Polls
          </div>
          <div class="card-body">
            <h5 class="card-title">Special title treatment</h5>
            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
          </div>
          <div class="card-footer text-muted">
            2 days ago
          </div>
        </div>
      </div>
    </div>
    <div style="height: 10vh"></div>
  </div>
</template>

<script>
export default {
  name: "Rooms",
  data(){
    return{
      newRoom: {name:"potato"}
    }
  },
  computed:{
    activeroom(){
      return this.$store.state.room
    }
  },
  methods:{
    addRoom(){
      console.log(this.newRoom);
      this.$store.dispatch("createRoom", this.newRoom)
    }
  }


}
</script>

<style>

</style>