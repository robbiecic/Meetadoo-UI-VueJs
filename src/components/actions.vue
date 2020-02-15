<template>
  <v-container>
    <!-- Row for header and button -->
    <v-row>
      <v-col>
        <h3>Actions</h3>
      </v-col>
      <v-spacer></v-spacer>
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
        ></v-text-field>
      </v-col>
      <v-col md="3">
        <PeoplePicker />
      </v-col>
      <v-col class="text-right" md="1">
        <v-btn @click="addAction"> Add </v-btn>
      </v-col>
    </v-row>
    <!-- This row will for existing actions -->
    <v-row>
      <v-col>
        <v-list two-line subheader>
          <v-list-item-group>
            <v-list-item v-for="item in actions" :key="item.id">
              <template v-slot:default="{ active, toggle }">
                <v-list-item-action>
                  <v-checkbox
                    v-model="active"
                    color="primary"
                    @click="toggle"
                  ></v-checkbox>
                </v-list-item-action>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title v-text="item.description" />
                    <v-list-item-subtitle v-text="item.assignee" />
                  </v-list-item-content>
                </v-list-item>
              </template>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
//import axios from "axios";
import PeoplePicker from "./reusable/peoplePicker";
export default {
  name: "Actions",
  components: { PeoplePicker },
  data() {
    return {
      settings: [],
      actionDescription: "",
      actions: [
        {
          id: 0,
          checked: false,
          description: "GO TOILET",
          assignee: "robert.cicero@hotmail.com"
        },
        {
          id: 1,
          checked: false,
          description: "GO TOILET AGAIN",
          assignee: "robert.cicero@hotmail.com"
        }
      ],
      active: true
    };
  },
  watch: {},
  methods: {
    addAction: function() {
      console.log(this.actionDescription);
      this.actions.push({
        id: 3,
        checked: false,
        description: this.actionDescription,
        assignee: "Me"
      });
      this.clearActions();
    },
    clearActions: function() {
      this.actionDescription = "";
    }
  }
};
</script>
