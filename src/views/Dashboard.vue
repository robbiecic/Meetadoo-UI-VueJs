<template>
  <v-app>
    <v-content>
      <h1>MY Profile</h1>
      <Profile v-bind:user="user" />
    </v-content>
  </v-app>
</template>

<script>
import Profile from "../components/Profile";
export default {
  name: "Dashboard",
  props: ["user"],
  components: { Profile },

  data: () => ({
    //
  })
};
</script>
