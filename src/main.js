import Vue from "vue";
import App from "./App.vue";
import Vuex from "vuex";
import vuetify from "./plugins/vuetify";
import router from "./router";
import axios from "axios";

Vue.config.productionTip = false;
Vue.use(vuetify);
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    isLoggedOn: false
  },
  mutations: {
    setUser(state) {
      state.isLoggedOn = true;
    },
    unSetUser(state) {
      state.isLoggedOn = false;
    }
  }
});

new Vue({
  router,
  vuetify,
  store,
  beforeMount() {
    //When vue app is loaded or refreshed, we want to check if there is active HTTP cookie
    //Can only do this by making an API call to the see if a cookie exists with a valid JWT token
    //This a step to how we can remain stateless and not storing a session
    axios
      .get(
        process.env.VUE_APP_ROOT_API + "/Development/?action=isAuthenticated"
      )
      .then(() => {
        //Set user as logged in
        this.$store.commit("setUser");
      })
      .catch(() => {
        //Set user as logged out
        this.$store.commit("unSetUser");
      });
  },
  render: h => h(App)
}).$mount("#app");
