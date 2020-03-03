<template>
  <v-container>
    <v-card>
      <v-card-title>
        History
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <LoaderTable v-if="showLoader == true" />
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="actionHistory"
        :sortable="true"
        :search="search"
        item-key="actionHistory.id"
        class="elevation-1"
        v-if="showLoader == false"
      ></v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
import LoaderTable from "./loaders/loader_table";
export default {
  name: "ActionHistory",
  components: { LoaderTable },
  props: ["meetingID"],
  data() {
    return {
      disableFields: false,
      search: "",
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
          process.env.VUE_APP_ROOT_API +
            "minutes/?action=GetHistory&meetingID=" +
            this.meetingID
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
