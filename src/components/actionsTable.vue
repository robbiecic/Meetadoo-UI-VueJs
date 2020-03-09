<template>
  <v-container>
    <h1>My Actions</h1>
    <v-spacer></v-spacer>
    <Table v-bind:headers="headers" v-bind:data="myActions" v-bind:showLoader="showLoader" />
  </v-container>
</template>

<script>
import axios from "axios";
import Table from "./reusable/table";
export default {
  name: "ActionsTable",
  components: { Table },
  data() {
    return {
      disableFields: false,
      search: "",
      showLoader: false,
      selected: [],
      myActions: [],
      headers: [
        {
          text: "Due Date",
          align: "left",
          sortable: false,
          value: "due_date"
        },
        { text: "Assignee(s)", value: "assignee" },
        { text: "Description", value: "description" },
        { text: "Complete", value: "checked" },
        { text: "Actions", value: "actions" }
      ]
    };
  },
  watch: {},
  mounted: function() {
    this.getActions();
  },
  methods: {
    getActions: function() {
      //When minute page loads, get the actions for the corresponding meeting
      this.showLoader = true;
      // console.log("here", this.meetingID);
      axios
        .get(process.env.VUE_APP_ROOT_API + "minutes/?action=GetMyActions")
        .then(response => {
          //this.actions = response.data.actions;
          this.myActions = response.data.actions;
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
