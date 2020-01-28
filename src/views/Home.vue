<template>
  <v-app>
    <v-content>
      <Header />
      <HelloWorld />
      <UserRego />
      <Footer />
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from "../components/HelloWorld";
import Footer from "../components/Footer.vue";
import Header from "../components/Header.vue";
import UserRego from "./user_registration.vue";

export default {
  name: "Home",

  components: {
    HelloWorld,
    Footer,
    Header,
    UserRego
  },

  data: () => ({
    //
  })
};
</script>
