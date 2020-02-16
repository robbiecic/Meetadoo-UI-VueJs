<template>
  <v-container>
    <!-- Row for header and button -->
    <v-row>
      <v-col>
        <h1>Actions</h1>
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

        <v-btn
          class="ma-2"
          tile
          outlined
          color="green"
          @click="addAction"
          :disabled="disableFields == true"
        >
          <v-icon left>mdi-pencil</v-icon>Add
        </v-btn>
      </v-col>
    </v-row>
    <!-- This row will be where you add a new actions -->
    <v-row>
      <v-col md="8">
        <v-text-field
          v-model="actionDescription"
          :label="'Description'"
          :outlined="true"
          :rounded="true"
          :single-line="true"
          :disabled="showLoader == true"
        ></v-text-field>
      </v-col>
      <v-col md="3">
        <PeoplePicker />
      </v-col>
    </v-row>
    <!-- This row will for existing actions -->
    <v-row>
      <v-col>
        <v-list two-line subheader>
          <v-list-item-group>
            <v-list-item v-for="item in actions" :key="item.id">
              <v-list-item-action>
                <v-checkbox
                  v-model="item.checked"
                  color="primary"
                  @change="toggle(item)"
                  :disabled="showLoader == true"
                ></v-checkbox>
              </v-list-item-action>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title v-text="item.description" />
                  <v-list-item-subtitle v-text="item.assignee" />
                </v-list-item-content>
                <v-btn
                  outlined
                  color="error"
                  :disabled="disableFields == true"
                  @click="removeAction(item)"
                >
                  <v-icon left>mdi-pencil</v-icon>Remove
                </v-btn>
              </v-list-item>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import PeoplePicker from "./reusable/peoplePicker";
export default {
  name: "Actions",
  components: { PeoplePicker },
  props: ["meetingID"],
  data() {
    return {
      disableFields: false,
      showLoader: false,
      settings: [],
      removeActive: false,
      actionDescription: "",
      active: true,
      actions: []
    };
  },
  watch: {
    meetingID: function() {
      this.getActions();
    }
  },
  created: function() {
    this.getActions();
  },
  methods: {
    getActions: function() {
      //When minute page loads, get the actions for the corresponding meeting
      this.showLoader = true;
      console.log("here", this.meetingID);
      axios
        .get(
          "https://localhost:8080/Development/minutes/?action=GetActions&meetingID=" +
            this.meetingID,
          {
            withCredentials: true
          }
        )
        .then(response => {
          this.actions = response.data.actions;
          console.log("response", response);
          this.showLoader = false;
        })
        .catch(e => {
          console.log("error", e);
          this.showLoader = false;
        });
    },
    addAction: function() {
      this.showLoader = true;
      let body = {};
      body.meeting_id = this.meetingID;
      body.description = this.actionDescription;
      body.assignee = "test5@test.com";
      body.due_date = "2020-02-20";
      body.checked = false;
      axios
        .post(
          "https://localhost:8080/Development/minutes/?action=CreateAction",
          { data: body },
          {
            headers: {
              "content-type": "application/json",
              "Access-Control-Allow-Origin": "*"
            }
          }
        )
        .then(response => {
          this.showLoader = false;
          console.log("completed with response", response);
          this.getActions();
        })
        .catch(err => {
          this.showLoader = false;
          console.log("Errored with response", err);
        });
      //Once action is added, clear the form
      this.clearActions();
    },
    clearActions: function() {
      this.actionDescription = "";
      //Need to clear the peoplePicker too
    },
    toggle: function(actionItem) {
      let foundIndex = this.actions.findIndex(x => x.id === actionItem.id);
      let newObject = this.actions[foundIndex];
      if (newObject.checked === true) newObject.checked = false;
      if (newObject.checked === false) newObject.checked = true;
      this.actions[foundIndex] = newObject;
    },
    removeAction: function(item) {
      this.showLoader = true;
      let body = {};
      axios
        .post(
          "https://localhost:8080/Development/minutes/?action=RemoveAction&actionID=" +
            item.id +
            "&meetingID=" +
            this.meetingID,
          { data: body },
          {
            headers: {
              "content-type": "application/json",
              "Access-Control-Allow-Origin": "*"
            }
          }
        )
        .then(response => {
          this.showLoader = false;
          console.log("completed with response", response);
          this.getActions();
        })
        .catch(err => {
          this.showLoader = false;
          console.log("Errored with response", err);
        });
    }
  }
};
</script>
