<template>
  <v-app>
    <v-content>
      <Profile v-bind:user="user" />
      <Search />
    </v-content>
  </v-app>
</template>

<script>
import Profile from "../components/Profile";
import Search from "../components/search";
export default {
  name: "Dashboard",
  props: ["user"],
  components: { Profile, Search },

  data: () => ({
    //
  })
};
</script>
