<template>
  <div class="container-fluid background">
    <div class="row">
      <div class="col-12">
        <h1 class="flashy neon red centered">
          Awaiting results 
        </h1>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WaitResults",
  data(){
    return {
      timeout: 0
    }
  },
  mounted(){
    // this.timeout = setTimeout(() => {
    //   this.$store.dispatch()
    //   // this.$router.push({ name: 'Results', params: { code: this.$route.params.code } })
    // }, 600000);
  }
}
</script>

<style>

</style>