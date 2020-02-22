<template>
  <v-app>
    <v-content align="center" py-100>
      <h2 class="headline font-weight-bold mb-3">Register with us</h2>
      <UserRego />
    </v-content>
  </v-app>
</template>

<script>
import UserRego from "../components/UserRego";
export default {
  name: "UserRegistration",

  components: {
    UserRego
  },

  data: () => ({
    //
  })
};
</script>
<style scoped>
.container {
  max-width: 100vw;
  padding: 100px;
}
</style>