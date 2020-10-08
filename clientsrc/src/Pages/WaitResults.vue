<template>
  <div class="container-fluid background">
    <div class="row">
      <div class="col-12">
        <div class="centered">
          <h1 class="text-center flashy neon orange on">
            Awaiting results
          </h1>
          <loading-component />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import loadingComponent from "../components/loadingComponent"
  export default {
    name: "WaitResults",
    data() {
      return {
        timeout: 0
      }
    },
    mounted() {
      this.timeout = setTimeout(() => {
        this.$store.dispatch()
        this.$router.push({ name: 'Results', params: { code: this.$route.params.code } })
      }, 300000);
    },
    beforeRouteLeave(to, from, next) {
      clearTimeout(this.timeout)
      next()
    },
    components: {
      loadingComponent
    },
  }
</script>

<style>

</style>