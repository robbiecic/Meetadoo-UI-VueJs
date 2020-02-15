<template>
  <v-container>
    <!-- Row for header and button -->
    <v-row>
      <v-col>
        <h3>Actions</h3>
      </v-col>
      <v-col class="text-right">
        <v-btn> Add </v-btn>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
    <!-- This row will be where you add a new actions -->
    <v-row>
      <v-col>
        <PeoplePicker />
      </v-col>
    </v-row>
    <!-- This row will for existing actions -->
    <v-row>
      <v-col>
        <v-list-item-group v-model="settings" multiple>
          <v-list-item v-for="item in actions" :key="item.description">
            <template v-slot:default="{ active, toggle }">
              <v-list-item-action>
                <v-checkbox
                  v-model="active"
                  color="primary"
                  @click="toggle"
                ></v-checkbox>
              </v-list-item-action>

              <v-list-item-content v-text="item.description">
                <v-list-item-subtitle
                  v-text="item.assignee"
                ></v-list-item-subtitle>
              </v-list-item-content>
            </template>
          </v-list-item>
        </v-list-item-group>
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
      actions: [
        {
          checked: false,
          description: "GO TOILET",
          assignee: "robert.cicero@hotmail.com"
        }
      ],
      active: true
    };
  },
  watch: {},
  methods: {}
};
</script>
