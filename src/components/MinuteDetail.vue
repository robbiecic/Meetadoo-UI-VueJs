<template>
  <v-form v-model="valid">
    <v-container>
      <v-card class="pa-2" height="100%" loading>
        <br />
        <br />MEETING DETAIL NEEDS TO GO
      </v-card>
    </v-container>
  </v-form>
</template>

<script>
//import axios from "axios";

export default {
  name: "MinuteDetail",
  data() {
    return {};
  },
  props: ["title", "creator", "meetingDate"],
  methods: {}
};
</script>