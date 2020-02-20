<template>
  <v-container>
    <!-- Row for header and button -->
    <v-row>
      <v-col>
        <h1>Actions</h1>
      </v-col>
      <v-col class="text-right">
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
      <v-container>
        <v-text-field
          v-model="actionDescription"
          :label="'Description'"
          :outlined="true"
          :rounded="true"
          :single-line="true"
          :disabled="showLoader == true"
        ></v-text-field>
      </v-container>
    </v-row>
    <v-row>
      <PeoplePicker ref="assignee" :initialValue="initialValue" />
    </v-row>
    <!-- This row will for existing actions -->
    <v-row>
      <v-col>
        <LoaderActions v-if="showLoader == true" />
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
                  <v-list-item-subtitle v-text="item.assignee.toString()" />
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
import LoaderActions from "./loaders/loader_actions";
export default {
  name: "Actions",
  components: { PeoplePicker, LoaderActions },
  props: ["meetingID"],
  data() {
    return {
      disableFields: false,
      showLoader: false,
      settings: [],
      removeActive: false,
      actionDescription: "",
      active: true,
      actions: [],
      initialValue: {}
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
          this.showLoader = false;
        })
        .catch(() => {
          this.showLoader = false;
        });
    },
    addAction: function() {
      this.showLoader = true;
      let body = {};
      body.meeting_id = this.meetingID;
      body.description = this.actionDescription;
      body.assignee = this.$refs.assignee.guestsLocal;
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
        .then(() => {
          this.showLoader = false;
          this.getActions();
          //Once action is added, clear the form
          this.clearActions();
        })
        .catch(() => {
          this.showLoader = false;
          //Once action is added, clear the form
          this.clearActions();
        });
    },
    clearActions: function() {
      this.actionDescription = "";
      this.initialValue = {};
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
