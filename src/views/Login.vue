<template>
  <v-app>
    <v-content>
      <Login v-bind:user="userProps" />
    </v-content>
  </v-app>
</template>

<script>
import Login from "../components/Login";
export default {
  name: "LoginView",
  props: ["user"],
  components: { Login },
  created: function() {
    this.userProps = this.user;
  },
  data() {
    return {
      userProps: {}
    };
  }
};
</script>
