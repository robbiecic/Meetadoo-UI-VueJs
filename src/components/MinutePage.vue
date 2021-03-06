<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>{{meetingTitle}}</h1>
      </v-col>
      <v-container v-if="failAlert == true || updateSuccess == true">
        <v-alert
          type="error"
          v-if="failAlert == true"
          dismissible
        >Whoops... Something went wrong... Please try again later</v-alert>
        <v-alert
          type="success"
          v-if="updateSuccess == true"
          dismissible
        >You have successfully added minutes</v-alert>
      </v-container>
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
    <v-row v-if="minutesLoaded == false">
      <v-alert
        type="warning"
        dismissible
      >You must add or select an existing meeting before adding minutes</v-alert>
    </v-row>
    <v-row v-if="minutesLoaded == true">
      <br />Attendees
      <PeoplePicker ref="attendees" :initialValue="initialValue" v-bind:guests="attendeesLocal" />
      <br />Apologies
      <PeoplePicker ref="apologies" :initialValue="initialValue" v-bind:guests="apologiesLocal" />
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
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import PeoplePicker from "./reusable/peoplePicker";

//Needs to get passed the meeting id and creation date in order to update the meeting record properly
export default {
  name: "MinutePage",
  components: { PeoplePicker },
  data() {
    return {
      disableFields: false,
      decisions: "",
      discussionPoints: "",
      attendeesLocal: [],
      apologiesLocal: [],
      indeterminate: true,
      rotate: 0,
      size: 32,
      value: 0,
      width: 4,
      initialValue: {},
      showLoader: false,
      failAlert: false,
      updateSuccess: false,
      minutesLoaded: false
    };
  },
  created: function() {
    //Need to add a created method, because after refresh when compount hasn't mounted it needs to check if a meeting has been clicked
    if (typeof this.meetingID != "undefined") {
      this.minutesLoaded = true;
      //Load data
      this.loadData(this.minutes);
    }
  },
  props: ["meetingID", "creation_date", "minutes", "meetingTitle"],
  watch: {
    minutes: function(newVal) {
      this.loadData(newVal);
    },
    meetingID: function() {
      this.minutesLoaded = true;
    }
  },
  methods: {
    containsKey(obj, key) {
      return Object.keys(obj).includes(key);
    },
    loadData: function(newVal) {
      if (typeof newVal.discussionPoints != "undefined") {
        this.discussionPoints = newVal.discussionPoints;
      } else {
        this.discussionPoints = "";
      }
      //If there are no decisions set to blank
      if (typeof newVal.decisions != "undefined") {
        this.decisions = newVal.decisions;
      } else {
        this.decisions = "";
      }
      if (typeof newVal.attendees != "undefined") {
        this.attendeesLocal = newVal.attendees;
      } else {
        this.attendeesLocal = [];
      }
      if (typeof newVal.apologies != "undefined") {
        this.apologiesLocal = newVal.apologies;
      } else {
        this.apologiesLocal = [];
      }
    },
    addMinutes: function() {
      this.disableFields = true;
      this.showLoader = true;
      let body = {};
      let url = "";
      let minutes = {
        discussionPoints: this.discussionPoints,
        decisions: this.decisions,
        attendees: this.$refs.attendees.guestsLocal,
        apologies: this.$refs.apologies.guestsLocal
      };

      //This is the entire meeting ID contents from meeting detail
      body.meeting = { id: this.meetingID, creation_date: this.creation_date };
      body.minutes = minutes;
      url = process.env.VUE_APP_ROOT_API + "minutes/?action=SupplementMinute";

      axios
        .post(url, { data: body })
        .then(() => {
          //Emit event so parent knows it was successful
          this.$emit("MinutePageUpdateSuccess");
          this.showLoader = false;
          this.disableFields = false;
          this.updateSuccess = true;
        })
        .catch(() => {
          this.showLoader = false;
          this.disableFields = false;
          this.failAlert = true;
          //console.log("Errored with response", err);
        });
    },
    clear: function() {
      this.discussionPoints = "";
      this.decisions = "";
      this.initialValue = {};
    }
  }
};
</script>
