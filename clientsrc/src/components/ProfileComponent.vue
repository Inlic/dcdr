<template>
<div>
  <div class="overflow-hidden" style="max-width: 400px">
    <div class="neon orange navbar-text mx-2">
    <img class="align-self-center" :src="profile.picture" style="max-height: 50px; max-width: 50px; border-radius: 50px;">
    {{profile.name}}
    </div>
  </div>
</div>
</template>

<script>
  export default {
    name: "profileComponent",
    computed: {
      profile() {
        return this.$store.state.profile;
      },
  }
};
</script>

<style>

</style>