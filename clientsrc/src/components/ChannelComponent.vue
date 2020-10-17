<template>
  <div>
    <div class="row">
      <div class="channel-container col-12">
        <channel-body-component
          v-for="channel in channels"
          :key="channel.id"
          :channelData="channel"
        />
      </div>
    </div>
    <div class="row">
      <form @submit.prevent="addChannel" class="col-12">
        <input
          type="text"
          placeholder="New Channel Name..."
          required
          v-model="newChannel.name"
          class="my-1 neon blue form-control"
        />
        <button type="submit" class="btn btn-primary mb-2 blue form-control">
          Add Channel
        </button>
      </form>
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
      return this.$store.state.userChannels.sort(function (a, b) {
        var x = a.name.toLowerCase();
        var y = b.name.toLowerCase();
        if (x < y) {
          return -1;
        }
        if (x > y) {
          return 1;
        }
        return 0;
      });
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