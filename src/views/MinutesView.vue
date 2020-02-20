<template>
  <v-app>
    <v-container>
      <v-row>
        <v-col>
          <MinutesList />
        </v-col>
        <v-col>
          <MinuteDetail />
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import MinutesList from "../components/MinutesList_new";
import MinuteDetail from "../components/MinuteDetail";
export default {
  name: "MintuesView",

  components: { MinutesList, MinuteDetail },

  data: () => ({
    //
  })
};
</script>
