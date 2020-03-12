<template>
  <v-app-bar app color="#01adee" class="pa-0">
    <div class="d-flex align-left">
      <v-img
        alt="Meetadoo Logo"
        contain
        :src="require('../assets/logo_metadoo.png')"
        transition="scale-transition"
        max-height="232"
        max-width="232"
      ></v-img>
    </div>

    <v-spacer></v-spacer>
    <Search />
    <v-btn text to="/" data-test="button_home">
      <span class="mr-2">Home</span>
    </v-btn>
    <v-btn text v-if="isLoggedOn == false" to="/register" data-test="button_register">
      <span class="mr-2">Register</span>
    </v-btn>
    <v-btn text v-if="isLoggedOn == false" to="/login" data-test="button_login">
      <span class="mr-2">Login</span>
    </v-btn>
    <v-btn text v-if="isLoggedOn == true" to="/dashboard" data-test="button_dashboard">
      <v-icon left dark>mdi-account-circle</v-icon>
      <span class="mr-2">{{ firstname }}</span>
    </v-btn>
    <v-btn text v-if="isLoggedOn == true" to="/logout" data-test="button_logout">
      <span class="mr-2">Logout</span>
    </v-btn>
    <template
      v-slot:extension
      v-if="$route.path == '/dashboard' || $route.path == '/dashboard/minutes' || $route.path == '/dashboard/actions'"
    >
      <v-tabs grow v-model="active_tab" dark background-color="blue-grey darken-4">
        <v-tab v-for="tab of tabs" :key="tab.id" :to="tab.link">
          {{
          tab.name
          }}
        </v-tab>
      </v-tabs>
    </template>
  </v-app-bar>
</template>

<script>
import { mapState } from "vuex";
import Search from "./search";

export default {
  name: "Header",
  components: { Search },
  data() {
    return {
      showPaths: false,
      active_tab: 0,
      tabs: [
        { id: 1, name: "Profile", link: "/dashboard" },
        { id: 2, name: "Minutes", link: "/dashboard/minutes" },
        { id: 3, name: "Actions", link: "/dashboard/actions" }
      ]
    };
  },
  computed: {
    ...mapState({
      isLoggedOn: "isLoggedOn",
      firstname: "firstname",
      surname: "surname"
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
/deep/ .v-toolbar__content {
  padding: 0px !important;
}
</style>
