<template>
  <div class="col-12">
    <div class="row justify-content-center d-flex">
      <div class="col-12">
        <h1 class="card-title red">My Channels</h1>
        <ul class="channel-container">
          <channel-body-component
            v-for="channel in channels"
            :key="channel.id"
            :channelData="channel"
          />
        </ul>
        </div>
        <div class="justify-content-center col-11">
          <form @submit.prevent="addChannel" class="justify-content-center row">
            <input
              type="text"
              placeholder="New Channel"
              required
              v-model="newChannel.name"
              class="col-12 my-1 neon blue form-control col-8"
            />
            <button type="submit" class="btn btn-outline-primary col-2 mb-2">
              Add Channel
            </button>
          </form>
      </div>
    </div>
  </div>
</template>

<script>
import channelBodyComponent from "./ChannelBodyComponent.vue";
export default {
  name: "channel-component",
  data() {
    return {
      newChannel: {},
    };
  },
  mounted() {
    console.log(this.$auth.user.email);
    this.$store.dispatch("getChannels", this.$auth.user.email);
  },
  methods: {
    addChannel() {
      this.newChannel.users = this.$auth.user.email;
      this.$store.dispatch("addChannel", this.newChannel);
    },
  },
  computed: {
    channels() {
      return this.$store.state.userChannels.sort(function(a,b){  
        var x = a.name.toLowerCase();
        var y = b.name.toLowerCase();
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;});
    },
    profile() {
      return this.$store.state.profile;
    },
  },
  components: {
    channelBodyComponent,
  },
};
</script>

<style>
</style>