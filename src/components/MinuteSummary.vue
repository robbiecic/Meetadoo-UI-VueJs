<template>
  <v-form v-model="valid">
    <v-container>
      <v-card class="mx-auto" max-width="344" outlined raised shaped>
        <v-list-item three-line>
          <v-list-item-content>
            <div class="overline mb-4">{{meetingDate}}</div>
            <v-list-item-title class="headline mb-1">{{title}}</v-list-item-title>
            <v-list-item-subtitle>{{creator}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-card-actions>
          <v-btn text>Button</v-btn>
          <v-btn text>Button</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-form>
</template>

<script>
//import axios from "axios";

export default {
  name: "MinuteSummary",
  data() {
    return {};
  },
  props: ["title", "creator", "meetingDate"],
  methods: {}
};
</script>