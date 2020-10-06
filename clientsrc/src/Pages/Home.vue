<template>
  <div class="background container-fluid">
    <div class="row justify-content-center bg-darken">
      <div class="col-10 col-md-8">
        <img id="neonTogether" class="card-img img-card-md-one" src="@/assets/neontogether.jpg" alt="Card image">
      </div>
      <div class="col-10 col-md-4 d-flex justify-content-around">
        <div class="card text-center border-0 align-self-center content-shadow pop">
          <div class="card-header bg-black red">
            <h3>Level Up Your Gaming Experience</h3>
          </div>
          <div class="card-body bg-dark">
            <p class="neon blue">Don't Waste Time Deciding what to play.Match with your
              friends, find a game you all love, and get to the game faster.</p>
              <router-link class="btn btn-primary" :to="{name:'Rooms'}"> Get started</router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="spacer"></div>
    <div class="row bg-darken py-2">
      <div class="col-12 col-md-5 d-flex">
        <div class="card text-center border-0 align-self-center content-shadow pop">
          <div class="card-header bg-black red">
            <h3>Persistent Polls</h3>
          </div>
          <div class="card-body bg-dark neon blue">
            <p>Love the games you voted on last time, but want to create another poll? No
              problem your prior polls are saved to your account.</p>
              <router-link class="btn btn-primary" :to="{name:'Profile'}">See your polls</router-link>
          </div>
        </div>
      </div>
      <div class="col-7 d-none d-md-block">
        <img class="card-img img-card-md-one " src="@/assets/gameon.jpg" alt="Card image">
      </div>
    </div>
    <div class="spacer"></div>
    <div class="row my-5 bg-darken">
      <div class="col-3 d-none d-md-block">
        <img class="img-fluid img-card-sm" src="@/assets/neondesktop.jpg">
      </div>
      <div class="col-3 d-none d-md-block">
        <img class="img-fluid img-card-sm" src="@/assets/racinggirl.jpg">
      </div>
      <div class="col-3 d-none d-md-block">
        <img class="img-fluid img-card-sm" src="@/assets/neoncompguts.jpg">
      </div>
      <div class="col-3 d-none d-md-block">
        <img class="img-fluid img-card-sm" src="@/assets/vrdude.jpg">
      </div>
    </div>
    <div class="spacer"></div>
  </div>
</template>

<script>
  export default {
    name: "Home",
    mounted() {

    },
  };
</script>