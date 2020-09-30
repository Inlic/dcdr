<template>
<div class="fluid-container">
  <div class="row justify-content-center">
    <div class="card bg-primary">
      <form class="row justify-content-center">
          <input type="text" placeholder="title" required class="col-10 m-1" />
          <textarea type="text" placeholder="description" class="col-10 m-1" />
          <button type="submit" class="btn btn-outline-light m-1">New poll</button>
    </form>
    </div>
  </div>
</div>
  
</template>

<script>
export default {
  name: "Room"

}
</script>

<style>

</style>