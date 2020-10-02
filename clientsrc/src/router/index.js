import Vue from "vue";
import VueRouter from "vue-router";
// @ts-ignore
import Home from "../Pages/Home.vue";
// @ts-ignore
import Profile from "../Pages/Profile.vue";
// @ts-ignore
import Room from "../Pages/Room.vue";
// @ts-ignore
import Results from "../Pages/Results.vue";
// @ts-ignore
import Vote from "../Pages/Vote.vue";
// @ts-ignore
import Rooms from "../Pages/Rooms.vue";
import WaitResults from "../Pages/WaitResults.vue"
import { authGuard } from "@bcwdev/auth0-vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    beforeEnter: authGuard,
  },
  {
    path: "/room/:code",
    name: "Room",
    component: Room
  },
  {
    path: "/room",
    name: "Rooms",
    component: Rooms
  },
  {
    path: "/room/:code/results",
    name: "Results",
    component: Results
  },
  {
    path: "/room/:code/waitresults",
    name: "WaitResults",
    component: WaitResults
  },
  {
    path: "/room/:code/vote",
    name: "Vote",
    component: Vote
  }
];

const router = new VueRouter({
  routes,
});

export default router;
