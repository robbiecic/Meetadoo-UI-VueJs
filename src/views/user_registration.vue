<template>
  <v-app>
    <v-content>
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
