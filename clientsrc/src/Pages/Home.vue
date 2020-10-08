<template>
  <div class="background container-fluid">
    <div class="row justify-content-center bg-darken">
      <!-- <div class="col-10 col-md-8">
        <img id="neonTogether" class="card-img img-card-md-one" src="@/assets/neontogether.jpg" alt="Card image">
      </div> -->
      <div class="col-4 align-self-center">
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
      <div class="col-4 my-2">
        <img id="neonTogether" class="card-img img-card-md-one" src="@/assets/neontogether.jpg" alt="Card image">
      </div>
      <div class="col-4 align-self-center">
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
    <div class="row bg-darken">
      <div style="border: 5px solid #81C8FF; border-radius: 10px" class="col-3 content-shadow">
          <img class="card-img-top" src="@/assets/bannerimage/amongusbanner.jpg" alt="">
      </div>
      <div style="border: 5px solid #FF88FF; border-radius: 10px" class="col-3 content-shadow">
          <img class="card-img-top" src="@/assets/bannerimage/csgobanner.jpg" alt="">
      </div>
      <div style="border: 5px solid #81C8FF; border-radius: 10px" class="col-3 content-shadow">
          <img class="card-img-top" src="@/assets/bannerimage/halobanner.jpg" alt="">
      </div>
      <div style="border: 5px solid #FF88FF; border-radius: 10px" class="col-3 content-shadow">
          <img class="card-img-top" src="@/assets/bannerimage/phasmophobiabanner.jpg" alt="">
      </div>
      <div style="border: 5px solid #FF88FF; border-radius: 10px" class="col-3 content-shadow">
          <img class="card-img-top" src="@/assets/bannerimage/seaofthievesbanner.jpg" alt="">
      </div>
      <div style="border: 5px solid #81C8FF; border-radius: 10px" class="col-3 content-shadow">
          <img class="card-img-top" src="@/assets/bannerimage/fallguysbanner.jpg" alt="">
      </div>
      <div style="border: 5px solid #FF88FF; border-radius: 10px" class="col-3 content-shadow">
          <img class="card-img-top" src="@/assets/bannerimage/terrariabanner.jpg" alt="">
      </div>
      <div style="border: 5px solid #81C8FF; border-radius: 10px" class="col-3 content-shadow">
          <img class="card-img-top" src="@/assets/bannerimage/tf2banner.jpg" alt="">
      </div>
    </div>

    <!-- <div class="row bg-darken py-2">
      <div class="col-12 col-md-5 d-flex">
      </div>
      <div class="col-7 d-none d-md-block">
        <img class="card-img img-card-md-one " src="@/assets/gameon.jpg" alt="Card image">
      </div>
    </div> -->
    <!-- <div class="row text-center bg-darken">
      <div class="col-3 d-none d-md-block img-box my-2">
        <img class="img-fluid img-card-sm" src="@/assets/neondesktop.jpg">
      </div>
      <div class="col-3 d-none d-md-block img-box my-2">
        <img class="img-fluid img-card-sm" src="@/assets/racinggirl.jpg">
      </div>
      <div class="col-3 d-none d-md-block img-box my-2">
        <img class="img-fluid img-card-sm" src="@/assets/neoncompguts.jpg">
      </div>
      <div class="col-3 d-none d-md-block img-box my-2">
        <img class="img-fluid img-card-sm" src="@/assets/vrdude.jpg">
      </div>
    </div> -->
  </div>
</template>

<script>
  export default {
    name: "Home",
    mounted() {

    },
  };
</script>