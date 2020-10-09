<template>
<div>
  <div class="overflow-hidden" style="max-height: 50px; max-width: 400px">
    <p class="m-3 neon orange">
    <img class="card-img-top" :src="profile.picture" style="max-height: 50px; max-width: 50px; border-radius: 50px;">
    {{profile.name}}
    </p>
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