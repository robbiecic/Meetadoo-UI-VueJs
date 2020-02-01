<template>
  <v-app>
    <v-content>
      <h1>MY Profile</h1>
      <Profile />
    </v-content>
  </v-app>
</template>

<script>
import Profile from "../components/Profile";
export default {
  name: "Dashboard",

  components: { Profile },

  data: () => ({
    //
  })
};
</script>
