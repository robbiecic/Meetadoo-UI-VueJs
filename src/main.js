import Vue from "vue";
import App from "./App.vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import vuetify from "./plugins/vuetify";
import router from "./router";

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
    }
  },
  plugins: [createPersistedState()]
});

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount("#app");
