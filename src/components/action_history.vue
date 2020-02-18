<template>
  <v-container>
    <!-- Row for header and button -->
    <v-row>
      <v-col>
        <h1>History</h1>
      </v-col>
      <v-col class="text-right">
        <v-progress-circular
          :indeterminate="true"
          :rotate="0"
          :size="32"
          :value="0"
          :width="4"
          color="light-blue"
          v-if="showLoader == true"
        ></v-progress-circular>
      </v-col>
    </v-row>
    <!-- This row will be where you add a new actions -->
    <v-row>
      <v-col md="8">
        <v-data-table
          v-model="selected"
          :headers="headers"
          :items="actionHistory"
          item-key="actionHistory.id"
          class="elevation-1"
        ></v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "ActionHistory",
  components: {},
  props: ["meetingID"],
  data() {
    return {
      disableFields: false,
      showLoader: false,
      selected: [],
      actionHistory: [],
      headers: [
        {
          text: "Time Stamp",
          align: "left",
          sortable: false,
          value: "date_stamp"
        },
        { text: "Author", value: "author" },
        { text: "Description", value: "description" }
      ]
    };
  },
  watch: {
    meetingID: function() {
      this.getHistory();
    }
  },
  mounted: function() {
    this.getHistory();
  },
  methods: {
    getHistory: function() {
      //When minute page loads, get the actions for the corresponding meeting
      this.showLoader = true;
      // console.log("here", this.meetingID);
      axios
        .get(
          "https://localhost:8080/Development/minutes/?action=GetHistory&meetingID=" +
            this.meetingID,
          {
            withCredentials: true
          }
        )
        .then(response => {
          //this.actions = response.data.actions;
          this.actionHistory = response.data.actions;
          // console.log("response", response);
          this.showLoader = false;
        })
        .catch(() => {
          // console.log("error", e);
          this.showLoader = false;
        });
    }
  }
};
</script>
