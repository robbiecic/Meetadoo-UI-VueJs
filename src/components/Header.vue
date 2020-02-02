<template>
  <v-card class="overflow-hidden">
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn text>
        <router-link to="/">
          <span class="mr-2">Home</span>
        </router-link>
      </v-btn>
      <v-btn text>
        <router-link to="/register">
          <span class="mr-2">Register</span>
        </router-link>
      </v-btn>
      <v-btn text v-if="isLoggedOn == false">
        <router-link to="/login">
          <span class="mr-2">Login</span>
        </router-link>
      </v-btn>
      <v-btn text v-if="isLoggedOn == true">
        <router-link to="/dashboard">
          <span class="mr-2">Dashboard</span>
        </router-link>
      </v-btn>
      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
      <template v-slot:extension v-if="$route.path == '/dashboard'">
        <v-tabs align-with-title>
          <v-tab><router-link to="/dashboard">Profile</router-link></v-tab>
          <v-tab>Minutes</v-tab>
          <v-tab>Actions</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
  </v-card>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Header",
  computed: {
    ...mapState({
      isLoggedOn: "isLoggedOn"
    })
  }
};
</script>

<style scoped>
.v-application a {
  color: Black;
}
nav li:hover,
nav li.router-link-active,
nav li.router-link-exact-active {
  background-color: indianred;
  cursor: pointer;
}
a.router-link-exact-active.router-link-active {
  color: white;
}
a {
  text-decoration: none;
}
</style>
