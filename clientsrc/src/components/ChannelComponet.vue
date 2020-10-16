<template>
  <div class="col-12">
    <div class="row">
    <div class="card col-12 justify-content-center d-flex">
      <h1>My Channels</h1>
      <ul>
        <channel-body-component v-for="channel in channels" :key="channel.id" :channelData="channel"/>
      </ul>
    <div class="justify-content-center col-12">
    <form @submit.prevent="addChannel" class="justify-content-center row">
                <input type="text" placeholder="New Channel" required v-model="newChannel.name"
                  class="col-12 my-1 neon blue form-control col-8" />
    <button type="submit" class="btn btn-outline-primary col-2 mb-2">Add Channel</button>
  </form>
    </div>
    </div>
  </div>
</div>
</template>

<script>
import channelBodyComponent from "./ChannelBodyComponet.vue"
export default {
  name:"channel-component",
  data(){
    return {
      newChannel: {}
      }
  },
  mounted(){
    console.log(this.$auth.user.email);
    this.$store.dispatch("getChannels", this.$auth.user.email)
  },
  methods:{
    addChannel(){
      this.newChannel.users = this.$auth.user.email
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
  },
  components: {
    channelBodyComponent,
}
  }
</script>

<style>

</style>