<template>
  <div class="fluid-container">
    <div class="row justify-content-center">
      <div class="card bg-primary">
        <h1>{{room.name}}</h1>
        <h4>{{room.code}}</h4>
        <form class="row justify-content-center">
          <input type="text" placeholder="title" required class="col-10 m-1" />
          <textarea type="text" placeholder="description" class="col-10 m-1"></textarea>
          <button type="submit" class="btn btn-outline-light m-1">New poll</button>
        </form>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "Room",
  mounted(){
    this.$store.dispatch("getRoomByCode", this.$route.params.code)
    this.$store.dispatch('joinRoom', "room")
  },
  computed: {
    room(){
      return this.$store.state.room
    }


  }
}
</script>

<style>

</style>