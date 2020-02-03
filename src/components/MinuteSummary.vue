<template>
  <v-form>
    <v-container>
      <v-card
        class="mx-auto"
        max-width="344"
        outlined
        shaped
        style="cursor: pointer"
        hover
      >
        <v-list-item three-line>
          <v-list-item-content>
            <div class="overline mb-4">{{ meetingDate }}</div>
            <v-list-item-title class="headline mb-1">{{
              title
            }}</v-list-item-title>
            <v-list-item-subtitle>{{ creator }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
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
