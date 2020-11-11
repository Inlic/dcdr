<template>
  <div class="background container-fluid d-flex flex-column h-100">
    <div class="row justify-content-center bg-darken flex-fill d-flex pb-5">
      <div class="col-12 col-md-6 col-xl-4 mt-2">
        <div
          class="card text-center border-0 content-shadow pop animate__animated animate__zoomIn"
        >
          <div class="card-header bg-black red">
            <h3>Level Up Your Gaming Experience</h3>
          </div>
          <div class="card-body bg-dark">
            <p class="neon blue default-cursor h6">
              Don't Waste Time Deciding what to play.Match with your friends,
              find a game you all love, and get to the game faster.
            </p>
            <router-link
              v-if="$auth.isAuthenticated"
              id="hometorooms"
              class="btn btn-primary neon blue"
              :to="{ name: 'Rooms' }"
            >
              Get started</router-link
            >
          </div>
        </div>
      </div>
      <div class="col-4 d-none d-xl-block my-1">
        <img
          id="neonTogether"
          class="card-img img-card-md-one"
          src="@/assets/neontogether.jpg"
          alt="Card image"
        />
      </div>
      <div class="col-12 col-md-6 col-xl-4 mt-2">
        <div
          class="card text-center border-0 content-shadow pop animate__animated animate__zoomIn"
        >
          <div class="card-header bg-black red">
            <h3>Persistent Polls</h3>
          </div>
          <div class="card-body bg-dark">
            <p class="neon blue default-cursor h6">
              Love the games you voted on last time, but want to create another
              poll? No problem your prior polls are saved to your account.
            </p>
            <router-link
              v-if="$auth.isAuthenticated"
              id="hometoprofile"
              class="btn btn-primary neon blue"
              :to="{ name: 'Profile' }"
              >See your polls</router-link
            >
          </div>
        </div>
      </div>
    </div>
    <div class="row bg-darken fixed-bottom">
      <div
        class="card d-none d-lg-block bg-darken border-0 col-3 animate__animated animate__backInUp"
      >
        <div class="img-border-blue content-shadow">
          <img
            class="card-img-top"
            src="@/assets/bannerimage/amongusbanner.jpg"
            alt="Among Us Banner"
          />
        </div>
        <div class="img-border-pink mt-3 content-shadow">
          <img
            class="card-img-top"
            src="@/assets/bannerimage/csgobanner.jpg"
            alt="CS GO Banner"
          />
        </div>
      </div>
      <div
        class="card d-none d-lg-block bg-darken border-0 col-3 animate__animated animate__backInUp"
      >
        <div class="img-border-pink content-shadow">
          <img
            class="card-img-top"
            src="@/assets/bannerimage/halobanner.jpg"
            alt="Halo Banner"
          />
        </div>
        <div class="img-border-blue mt-3 content-shadow">
          <img
            class="card-img-top"
            src="@/assets/bannerimage/phasmophobiabanner.jpg"
            alt="Phasmophobia Banner"
          />
        </div>
      </div>
      <div
        class="card d-none d-lg-block bg-darken border-0 col-3 animate__animated animate__backInUp"
      >
        <div class="img-border-pink content-shadow">
          <img
            class="card-img-top"
            src="@/assets/bannerimage/seaofthievesbanner.jpg"
            alt="Sea of Thieves Banner"
          />
        </div>
        <div class="img-border-blue mt-3 content-shadow">
          <img
            class="card-img-top"
            src="@/assets/bannerimage/fallguysbanner.jpg"
            alt="Fall Guys Banner"
          />
        </div>
      </div>
      <div
        class="card d-none d-lg-block bg-darken border-0 col-3 animate__animated animate__backInUp"
      >
        <div class="img-border-blue content-shadow">
          <img
            class="card-img-top"
            src="@/assets/bannerimage/terrariabanner.jpg"
            alt="Terraria Banner"
          />
        </div>
        <div class="img-border-pink mt-3 content-shadow">
          <img
            class="card-img-top"
            src="@/assets/bannerimage/tf2banner.jpg"
            alt="Team Fortress 2 Banner"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  mounted() {},
};
</script>

<style>
.default-cursor {
  cursor: default !important;
}
</style>