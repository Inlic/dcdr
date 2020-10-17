<template>
  <div class="row">
    <div class="col-3"></div>
    <div class="col-3"></div>
    <div class="col-3"></div>
    <div class="col-3"></div>
  </div>
</template>

<script>
export default {
  name: "channel-room-compnet",
  props: ["roomData"],
  data() {
    return {
      currentRoom: {},
    };
  },
  mounted() {
    this.$store.dispatch("getRoombyid", this.roomData);
  },
};
</script>

<style>
</style>