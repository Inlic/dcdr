<template>
  <div>
    <div class="card m-1">
      <div class="card-header methods neon blue" @click="toggleit">
        {{ channelData.name }}
      </div>
      <div class="card" v-if="this.toggle == true">
        <div v-if="channelData.rooms.length > 0">
          <channel-poll-component
            v-for="room in channelData.rooms"
            :key="room._id"
            :pollData="room"
            :channelData="channelData"
          />
        </div>
        <div v-if="polls.length > 0" class="row justify-content-between p-3">
          <select
            class="col-12 col-lg-8 neon blue form-control"
            v-model="selected"
          >
            <option disabled value="">Please select one</option>
            <option v-for="room in polls" :key="room.id" :value="room">
              {{ room.name }}
            </option>
          </select>
          <button
            type="button"
            @click="addPoll"
            class="btn btn-outline-primary neon blue mt-3 mt-lg-0 col-12 col-lg-4"
          >
            Add a poll
          </button>
        </div>
        <button
          type="button"
          class="btn btn-primary neon blue col-12 mt-5"
          @click="deleteChannel"
        >
          Delete channel
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import channelPollComponent from "../components/ChannelPollComponent";
import as from "../store/alertsService";
export default {
  name: "channel-body-component",
  props: ["channelData"],
  data() {
    return {
      toggle: false,
      selected: { name: "none" },
    };
  },
  methods: {
    toggleit() {
      this.toggle = !this.toggle;
    },
    addPoll() {
      let payload = { _id: this.channelData._id, rooms: this.selected.id };
      this.$store.dispatch("addRoomtoChannel", payload);
    },
    deleteChannel() {
      this.$store.dispatch("deleteChannel", this.channelData._id);
    },
  },
  computed: {
    polls() {
      return this.$store.state.myRooms;
    },
  },
  components: {
    channelPollComponent,
  },
};
</script>

<style>
</style>