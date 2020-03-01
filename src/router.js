import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import UserRegistration from "./views/User_Registration.vue";
import Dashboard from "./views/Dashboard.vue";
import LoginView from "./views/Login.vue";
import MinutesView from "./views/MinutesView.vue";
import Logout from "./views/Logout.vue";

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
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: Dashboard,
      props: true
    },
    {
      path: "/login",
      name: "LoginView",
      component: LoginView
    },
    {
      path: "/dashboard/minutes",
      name: "MinutesView",
      component: MinutesView
    },
    {
      path: "/logout",
      name: "Logout",
      component: Logout
    }
  ]
});
