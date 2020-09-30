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
    path: "/room/:id",
    name: "Room",
    component: Room
  },
  {
    path: "results/:id",
    name: "Results",
    component: Results
  }
];

const router = new VueRouter({
  routes,
});

export default router;
