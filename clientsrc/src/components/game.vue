<template>
  <div class="card">
    <h1 class="card-title">{{gameData.name}}</h1>
    <img class="card-img" src="https://cdn.cloudflare.steamstatic.com/steam/apps/945360/header.jpg?t=1598556351" alt="">
    <p class="card-body"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, ex? Libero ipsa non modi autem incidunt fugiat veritatis iure voluptas officia eaque, optio consequatur, nam dignissimos, recusandae quia asperiores laborum.</p>
  </div>
</template>

<script>
export default {
  name:"game",
  props:['gameData']

}
</script>

<style>

</style>