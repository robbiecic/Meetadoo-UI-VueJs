<template>
  <v-card class="overflow-hidden">
    <v-app-bar app color="#01adee">
      <div class="d-flex align-center">
        <v-img
          alt="Meetadoo Logo"
          class="shrink mr-2"
          contain
          src="/assets/logo_meetadoo.png"
          transition="scale-transition"
          width="40"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn text to="/" data-test="button_home">
        <span class="mr-2">Home</span>
      </v-btn>
      <v-btn
        text
        v-if="isLoggedOn == false"
        to="/register"
        data-test="button_register"
      >
        <span class="mr-2">Register</span>
      </v-btn>
      <v-btn
        text
        v-if="isLoggedOn == false"
        to="/login"
        data-test="button_login"
      >
        <span class="mr-2">Login</span>
      </v-btn>
      <v-btn
        text
        v-if="isLoggedOn == true"
        to="/dashboard"
        data-test="button_dashboard"
      >
        <span class="mr-2">Dashboard</span>
      </v-btn>
      <v-btn
        text
        v-if="isLoggedOn == true"
        to="/logout"
        data-test="button_logout"
      >
        <span class="mr-2">Logout</span>
      </v-btn>
      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
      <template
        v-slot:extension
        v-if="
          $route.path == '/dashboard' || $route.path == '/dashboard/minutes'
        "
      >
        <v-tabs
          grow
          v-model="active_tab"
          dark
          background-color="blue-grey darken-4"
        >
          <v-tab v-for="tab of tabs" :key="tab.id" :to="tab.link">{{
            tab.name
          }}</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
  </v-card>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Header",
  data() {
    return {
      showPaths: false,
      active_tab: 0,
      tabs: [
        { id: 1, name: "Profile", link: "/dashboard" },
        { id: 2, name: "Minutes", link: "/dashboard/minutes" },
        { id: 3, name: "Actions" }
      ]
    };
  },
  computed: {
    ...mapState({
      isLoggedOn: "isLoggedOn"
    })
  }
};
</script>

<style scoped>
nav li:hover,
nav li.router-link-active,
nav li.router-link-exact-active {
  background-color: indianred;
  cursor: pointer;
}
</style>
