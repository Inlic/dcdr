<template>
  <div class="">
    <div class="card">
    <form @submit.prevent="addChannel" class="justify-content-center">
                <input type="text" placeholder="New Channel" required v-model="newChannel.name"
                  class="col-12 my-1 neon blue form-control" />
        <button type="submit" class="btn btn-outline-primary">Add Channel</button>
      </form>
      <ul>
        <!-- <li :v-for="channel in channels">{{channel.name}}</li> -->
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name:"channel-component",
  data(){
    return {
      newChannel: {}
      }
  },
  mounted(){
    this.$store.dispatch("getChannels", this.$store.state.profile)
  },
  methods:{
    addChannel(){
      this.$store.dispatch("addChannel", this.newChannel)
    }
  },
  computed:{
    channels(){
      return this.$store.state.userChannels
    },
    profile(){
      return this.$store.state.profile
    }
  }

}
</script>

<style>

</style>