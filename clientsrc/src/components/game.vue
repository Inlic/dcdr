<template>
  <div class="card">
    <h1 class="card-title">{{gameData.name}}</h1>
    <img class="card-img" :src="gameData.imgUrl" alt="https://images.unsplash.com/photo-1595744043037-68de3376ed59?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=564&q=80">
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