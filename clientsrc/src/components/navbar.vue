<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <router-link class="navbar-brand flashy neon red" :to="{ name: 'Home' }">Dcdr</router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <div class="d-flex align-items-md-center w-100">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item" :class="{ active: $route.name == 'Home' }">
            <router-link :to="{ name: 'Home' }" class="nav-link text-light flashy neon blue">Home</router-link>
          </li>
          <li class="nav-item" :class="{ active: $route.name == 'Rooms' }">
            <router-link :to="{ name: 'Rooms' }" class="nav-link text-light flashy neon blue">Create a Poll
            </router-link>
          </li>
          <li class="nav-item" v-if="$auth.isAuthenticated" :class="{ active: $route.name == 'Profile' }">
            <router-link class="nav-link text-light flashy neon blue" :to="{ name: 'Profile' }">Profile</router-link>
          </li>
          <li class="nav-item">
            <form class="form-inline ml-md-3" @submit="setActiveRoom">
              <div class="form-group">
                <input type="text" v-model="code" class="form-control neon blue" placeholder="Join Room"
                  aria-describedby="helpId">
                <button class="btn btn-primary mx-md-2 form-control flashy neon blue" type="submit">Join!</button>
              </div>
            </form>
          </li>
        </ul>
        <div class="d-flex justify-content-end align-items-start h-100">
          <span class="navbar-text">
            <button class="btn btn-primary flashy neon blue" @click="login" v-if="!$auth.isAuthenticated">
              Login
            </button>
            <button class="btn btn-primary flashy neon blue" @click="logout" v-else>logout</button>
          </span>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
  import as from '../store/alertsService'
  import axios from "axios";
  import { getUserData } from "@bcwdev/auth0-vue";
  export default {
    name: "Navbar",
    data() {
      return {
        code: ""
      }
    },
    computed: {
      profile() {
        return this.$store.state.profile;
      }
    },
    methods: {
      async login() {
        await this.$auth.loginWithPopup();
        if (this.$auth.isAuthenticated) {
          this.$store.dispatch("setBearer", this.$auth.bearer);
          this.$store.dispatch("getProfile");
        }
      },
      async logout() {
        this.$store.dispatch("resetBearer");
        await this.$auth.logout({ returnTo: window.location.origin });
      },
      async setActiveRoom() {
        if (this.$auth.isAuthenticated) {
          this.$store.dispatch("setMyName", this.profile.name)
        }
        else if (!this.$auth.isAuthenticated) {
          let res = await as.addName()
          this.$store.dispatch("setMyName", res.value)
        }
        this.$store.dispatch("getRoomByCode", this.code);
        this.$router.push({ name: 'Room', params: { code: this.code } })
      },
    }
  };
</script>

<style></style>