<template>
  <div class="fluid-container">
    <div class="row justify-content-center">
      <div class="card bg-primary text-center">
        <h1>{{room.name}}</h1>
        <h4>{{room.code}}</h4>
        <form @submit.prevent="createGame" class="row justify-content-center">
          <input type="text" placeholder="name" required v-model="newGame.name" class="col-10 m-1" />
          <input type="Url" placeholder="image" v-model="newGame.imgUrl" class="col-10 m-1" />
          <button type="submit" class="btn btn-outline-light m-1">Add a game</button>
        </form>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "Room",
  data(){
    return{
      newGame: {}
    }
  },
  mounted(){
    let room = this.$route.params.code
    this.$store.dispatch("getRoomByCode", room)
  },
  computed: {
    room(){
      return this.$store.state.room
    }
  },
  methods:{
    createGame(){
      this.newGame.roomId = this.room.id
      this.$store.dispatch("createGame", this.newGame)
    }
  }
}
</script>

<style>

</style>