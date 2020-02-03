<template>
  <v-app>
    <v-content>
      <h1>Minutes View</h1>
      <MinutesList />
    </v-content>
  </v-app>
</template>

<script>
import MinutesList from "../components/MinutesList";
export default {
  name: "MintuesView",

  components: { MinutesList },

  data: () => ({
    //
  })
};
</script>
