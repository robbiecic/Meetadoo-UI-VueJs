<template>
  <v-app>
    <v-content>
      <Login />
    </v-content>
  </v-app>
</template>

<script>
import Login from "../components/Login";
export default {
  name: "LoginView",

  components: { Login },

  data: () => ({
    //
  })
};
</script>
