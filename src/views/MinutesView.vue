<template>
  <v-app>
    <v-content>
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
