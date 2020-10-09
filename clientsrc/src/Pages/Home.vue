<template>
  <div class="background container-fluid d-flex flex-column h-100">
    <div class="row justify-content-center bg-darken flex-fill d-flex">
      <div class="col-12 col-md-4 mt-5">
        <div class="card text-center border-0 content-shadow pop">
          <div class="card-header bg-black red">
            <h3>Level Up Your Gaming Experience</h3>
          </div>
          <div class="card-body bg-dark">
            <p class="neon blue">Don't Waste Time Deciding what to play.Match with your
              friends, find a game you all love, and get to the game faster.</p>
              <router-link id="hometorooms" class="btn btn-primary neon blue" :to="{name:'Rooms'}"> Get started</router-link>
          </div>
        </div>
      </div>
      <div class="col-4 d-none d-lg-block my-1">
        <img id="neonTogether" class="card-img img-card-md-one" src="@/assets/neontogether.jpg" alt="Card image">
      </div>
      <div class="col-12 col-md-4 mt-5">
        <div class="card text-center border-0content-shadow pop">
          <div class="card-header bg-black red">
            <h3>Persistent Polls</h3>
          </div>
          <div class="card-body bg-dark">
            <p class="neon blue">Love the games you voted on last time, but want to create another poll? No
              problem your prior polls are saved to your account.</p>
              <router-link id="hometoprofile" class="btn btn-primary neon blue" :to="{name:'Profile'}">See your polls</router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="row bg-darken fixed-bottom">
      <div class="card d-none d-lg-block bg-darken border-0 col-3">
      <div class="img-border-blue content-shadow">
          <img class="card-img-top" src="@/assets/bannerimage/amongusbanner.jpg" alt="">
      </div>
      <div class="img-border-pink mt-3 content-shadow">
          <img class="card-img-top" src="@/assets/bannerimage/csgobanner.jpg" alt="">
      </div>
      </div>
      <div class="card d-none d-lg-block bg-darken border-0 col-3">
      <div class="img-border-pink content-shadow">
          <img class="card-img-top" src="@/assets/bannerimage/halobanner.jpg" alt="">
      </div>
      <div class="img-border-blue mt-3 content-shadow">
          <img class="card-img-top" src="@/assets/bannerimage/phasmophobiabanner.jpg" alt="">
      </div>
      </div>
      <div class="card d-none d-lg-block bg-darken border-0 col-3">
      <div class="img-border-pink content-shadow">
          <img class="card-img-top" src="@/assets/bannerimage/seaofthievesbanner.jpg" alt="">
      </div>
      <div class="img-border-blue mt-3 content-shadow">
          <img class="card-img-top" src="@/assets/bannerimage/fallguysbanner.jpg" alt="">
      </div>
      </div>
      <div class="card d-none d-lg-block bg-darken border-0 col-3">
      <div class="img-border-blue content-shadow">
          <img class="card-img-top" src="@/assets/bannerimage/terrariabanner.jpg" alt="">
      </div>
      <div class="img-border-pink mt-3 content-shadow">
          <img class="card-img-top" src="@/assets/bannerimage/tf2banner.jpg" alt="">
      </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Home",
    mounted() {

    },
  };
</script>