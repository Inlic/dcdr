<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-2">
        <i class="fa fa-arrow-circle-o-up" aria-hidden="true"></i>
      </div>
      <div class="col-10 card">
        <game />
      </div>
      <div class="col-2">
        <i class="fa fa-arrow-circle-o-down" aria-hidden="true"></i>
      </div>
    </div>
  </div>
</template>

<script>
import game from "../components/game"
export default {
  name:"vote",
  components:{
    game
  }

}
</script>

<style>

</style>