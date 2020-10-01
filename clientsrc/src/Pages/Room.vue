<template>
  <div class="fluid-container">
    <div class="d-flex justify-content-center">
      <div class="card bg-primary text-center">
        <h1>{{room.name}}</h1>
        <h4>{{room.code}}</h4>
        <form @submit.prevent="createGame" class="justify-content-center">
          <input type="text" placeholder="name" required v-model="newGame.name" class="col-10 m-1" />
          <input type="Url" placeholder="image" v-model="newGame.imgUrl" class="col-10 m-1" />
          <button type="submit" class="btn btn-outline-light m-1">Add a game</button>
        </form>
        <button type="button" @click="this.startPoll" class="btn btn-primary"> Go! </button>
        <ul>
          <li v-for="name in room.names" :key="name">{{name}}</li>
        </ul>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: "Room",
    data() {
      return {
        newGame: {}
      }
    },
    mounted() {
      this.$store.dispatch("getRoomByCode", this.$route.params.code)
      this.$store.dispatch('joinRoom', `${this.$route.params.code}`)
    },
    computed: {
      room() {
        return this.$store.state.room
      }
    },
    methods: {
      createGame() {
        this.newGame.roomId = this.room.id
        this.$store.dispatch("createGame", this.newGame)
      },
      startPoll() {
        this.$store.dispatch("getGames", this.room.id)
        this.$router.push({ name: 'Vote', params: { code: this.room.code } })
      },
    }
  }
</script>

<style>

</style>