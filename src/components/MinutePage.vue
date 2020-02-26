<template>
  <v-container>
    <div>
      <v-row>
        <v-col>
          <h1>Minutes</h1>
        </v-col>
        <v-col class="text-right">
          <v-progress-circular
            :indeterminate="indeterminate"
            :rotate="rotate"
            :size="size"
            :value="value"
            :width="width"
            color="light-blue"
            v-if="showLoader == true"
          ></v-progress-circular>
          <v-btn
            class="ma-2"
            tile
            outlined
            color="error"
            @click="clear"
            :disabled="disableFields == true"
          >
            <v-icon left>mdi-pencil</v-icon>Clear
          </v-btn>
          <v-btn
            class="ma-2"
            tile
            outlined
            color="warning"
            @click="addMinutes()"
            :disabled="disableFields == true"
          >
            <v-icon left>mdi-pencil</v-icon>Update
          </v-btn>
        </v-col>
      </v-row>
    </div>
    <br />Attendees
    <PeoplePicker ref="attendees" :initialValue="initialValue" />
    <br />Apologies
    <PeoplePicker ref="apologies" :initialValue="initialValue" />

    <v-textarea
      counter
      v-model="discussionPoints"
      label="Discuss points"
      :shaped="false"
      :outlined="true"
      :rounded="true"
      :disabled="disableFields == true"
    ></v-textarea>

    <v-textarea
      counter
      v-model="decisions"
      label="Decisionns"
      :shaped="false"
      :outlined="true"
      :rounded="true"
      :disabled="disableFields == true"
    ></v-textarea>
  </v-container>
</template>

<script>
// import axios from "axios";
import PeoplePicker from "./reusable/peoplePicker";

//Needs to get passed the meeting id and creation date in order to update the meeting record properly
export default {
  name: "MinutePage",
  components: { PeoplePicker },
  data() {
    return {
      discussionPoints: "",
      disableFields: false,
      decisions: "",
      indeterminate: true,
      rotate: 0,
      size: 32,
      value: 0,
      width: 4,
      initialValue: {},
      showLoader: false
    };
  },
  props: ["meetingID", "creation_date"],
  watch: {},
  methods: {
    addMinutes: function() {
      let body = {};
      body = {
        meetingDetails: {
          id: this.meetingID,
          creation_date: this.creation_date
        },
        minutes: {
          discussionPoints: this.discussionPoints,
          decisions: this.decisions,
          attendees: this.$refs.attendees.guestsLocal,
          apologies: this.$refs.apologies.guestsLocal
        }
      };
      //console.log(body);
    },
    clear: function() {
      this.discussionPoints = "";
      this.decisions = "";
      this.initialValue = {};
    }
  }
};
</script>
