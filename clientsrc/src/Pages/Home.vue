<template>
  <div class="background container-fluid">
    <div style="height: 20vh"></div>
    <div class="row">
      <div class="col-12">
          <div class="jumbotron" style="height: 60vh">
            <h1 class="display-4">Hello, world!</h1>
            <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
            <hr class="my-4">
            <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
            <p class="lead">
            </p>
          </div>
        </div>
    </div>
    <div style="height: 20vh"></div>
    <div class="row">
      <div class="col-4">
        <div class="card text-center" style="height: 60vh">
          <div class="card-header">
            Featured
          </div>
          <div class="card-body">
            <h5 class="card-title">Special title treatment</h5>
            <img class="card-img" src="https://i.imgur.com/QT4H77w.jpg" alt="Card image" style="height: 60vh">
            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
          </div>
          <div class="card-footer text-muted">
            2 days ago
          </div>
        </div>
      </div>
      <div class="col-8">
        <div class="card bg-dark text-dark">
          <img class="card-img" src="https://images.unsplash.com/photo-1601293058843-f34e8dd9ccfd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1900&q=80" alt="Card image" style="height: 60vh">
          <div class="card-img-overlay">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum nemo quia, aperiam, sunt consequuntur maiores suscipit accusamus, numquam veniam fugit aliquid. Ut perspiciatis porro sunt ipsa eaque eligendi numquam accusantium.</p>
          </div>
        </div>
      </div>
    </div>
    <div style="height: 20vh"></div>
    <div class="row">
      <div class="col-8">
        <div class="card text-center" style="height: 60vh">
            <div class="card-header">
              Featured
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
      <div class="col-4">
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
    <div style="height: 20vh"></div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data(){
    return{
      newRoom: {name:"potato"}
    }
  },

  methods:{
    addRoom(){
      console.log(this.newRoom);
      // this.$store.dispatch("createRoom", this.newRoom)
    }
  }
};
</script>
