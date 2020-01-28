import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import UserRegistration from "./views/User_Registration.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/register",
      name: "UserRegistration",
      component: UserRegistration
    }
  ]
});
