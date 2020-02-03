<template>
  <v-form v-model="valid">
    <v-container>Minute Summary {{title}}</v-container>
  </v-form>
</template>

<script>
//import axios from "axios";

export default {
  name: "MinuteSummary",
  data() {
    return {};
  },
  props: ["title"],
  methods: {}
};
</script>