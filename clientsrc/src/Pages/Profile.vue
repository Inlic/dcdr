<template>
  <div class="about text-center">
    <h1>Welcome {{ profile.name }}</h1>
    <img class="rounded" :src="profile.picture" alt="" />
    <p>{{ profile.email }}</p>
  </div>
</template>

<script>
export default {
  name: "Profile",
  computed: {
    profile() {
      return this.$store.state.profile;
    }
  },
  data(){
    return {
      eProfile:{},
      editing: false
    }
  },
  methods: {
    startEdit() {
      this.eProfile = this.profile,
      this.editing = true
    },
    finishEdit(){
      this.editing = false
      this.$store.dispatch("editProfile", this.eProfile)
    }
  }
};
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
