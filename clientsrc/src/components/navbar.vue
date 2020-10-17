<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
    <router-link
      id="navbar-logo"
      class="navbar-brand flashy neon red on"
      :to="{ name: 'Home' }"
    >
      D. C.
      <img
        class="logo animate__animated animate__pulse"
        src="../assets/logo.png"
        alt=""
      />
      D. R.</router-link
    >
    <button
      id="navbar-toggler"
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarText"
      aria-controls="navbarText"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <div class="d-flex align-items-md-center w-100">
        <ul class="navbar-nav mr-auto">
          <li
            class="nav-item v-step-0"
            :class="{ active: $route.name == 'Home' }"
          >
            <router-link
              id="nav-home-link"
              :to="{ name: 'Home' }"
              class="nav-link text-light flashy neon blue"
              >Home
            </router-link>
          </li>
          <li
            class="nav-item"
            :class="{ active: $route.name == 'Rooms' }"
            v-if="$auth.isAuthenticated"
          >
            <router-link
              id="nav-create-poll-link"
              :to="{ name: 'Rooms' }"
              class="nav-link text-light flashy neon blue"
            >
              Create a Poll
            </router-link>
          </li>
          <li
            class="nav-item"
            v-if="$auth.isAuthenticated"
            :class="{ active: $route.name == 'Profile' }"
          >
            <router-link
              id="nav-profile-link"
              class="nav-link text-light flashy neon blue"
              :to="{ name: 'Profile' }"
            >
              Profile</router-link
            >
          </li>
          <li
            class="nav-item v-step-1"
            :class="{ active: $route.name == 'Faq' }"
          >
            <router-link
              id="nav-faq-link"
              class="nav-link text-light flashy neon blue"
              :to="{ name: 'Faq' }"
              >FAQ
            </router-link>
          </li>
          <li class="nav-item">
            <form class="form-inline ml-md-3" @submit.prevent="setActiveRoom">
              <div class="form-group">
                <input
                  id="nav-join-room-input"
                  type="text"
                  v-model="code"
                  class="form-control neon blue"
                  placeholder="Join Room"
                  aria-describedby="helpId"
                />
                <button
                  id="nav-join-room-btn"
                  class="btn btn-primary mx-md-2 form-control flashy neon blue v-step-2"
                  type="submit"
                >
                  Join!
                </button>
              </div>
            </form>
          </li>
        </ul>

        <div class="d-flex justify-content-end align-items-start h-100">
          <span class="navbar-text d-none d-xl-block"
            ><profile-component
          /></span>
          <span class="navbar-text">
            <button
              id="login-btn"
              class="btn btn-primary flashy neon blue v-step-3"
              @click="login"
              v-if="!$auth.isAuthenticated"
            >
              Login
            </button>
            <button
              id="logout-btn"
              class="btn btn-primary flashy neon blue"
              @click="logout"
              v-else
            >
              logout
            </button>
          </span>
        </div>
      </div>
    </div>
    <vue-tour-component v-if="!$auth.isAuthenticated" />
  </nav>
</template>

<script>
import as from "../store/alertsService";
import axios from "axios";
import { getUserData } from "@bcwdev/auth0-vue";
import profileComponent from "../components/ProfileComponent";
import vueTourComponent from "../components/VueTourComponent";
export default {
  name: "Navbar",
  data() {
    return {
      code: "",
    };
  },
  computed: {
    profile() {
      return this.$store.state.profile;
    },
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
        this.$store.dispatch("setMyName", this.profile.name);
      } else if (!this.$auth.isAuthenticated) {
        let res = await as.addName();
        this.$store.dispatch("setMyName", res.value);
      }
      if (this.$store.state.name) {
        this.$store.dispatch("joinRoom", `${this.code}`);
        this.$store.dispatch("getGames", this.code);
        this.$router.push({ name: "Room", params: { code: this.code } });
      } else {
        as.nameNotice();
      }
    },
  },
  components: {
    profileComponent,
    vueTourComponent,
  },
};
</script>

<style>
</style>