<template>
  <v-form v-model="valid">
    <v-container>
      <MinuteSummary v-for="(todo) in minuteItems" v-bind:key="todo.id" v-bind:title="todo.title" />
    </v-container>
  </v-form>
</template>

<script>
//import axios from "axios";
import MinuteSummary from "./MinuteSummary";

export default {
  name: "MinutesList",
  data() {
    return {
      minuteItems: [
        { id: 1, title: "Hello" },
        { id: 2, title: "Hello 2" }
      ]
    };
  },
  components: {
    MinuteSummary
  },
  methods: {},
  created: function() {}
};
</script>