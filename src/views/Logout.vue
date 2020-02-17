<template>
  <v-app>
    <v-content>
      <Login />
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "Logout",

  components: {},

  created: {
    //Need to update cookie so it's expired
  },

  data: () => ({
    //
  })
};
</script>
