<template>
  <div class="card">
    <h1 class="card-title text-dark">{{gameData.name}}</h1>
    <img class="card-img" :src="gameData.imgUrl">
    <p class="card-body"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, ex? Libero ipsa non modi autem incidunt fugiat veritatis iure voluptas officia eaque, optio consequatur, nam dignissimos, recusandae quia asperiores laborum.</p>
  </div>
</template>

<script>
export default {
  name:"game-component",
  props:["gameData"],
  data(){
    return {}
  }
}
</script>

<style>

</style>