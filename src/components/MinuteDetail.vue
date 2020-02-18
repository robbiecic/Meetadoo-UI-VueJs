<template>
  <v-form>
    <v-container>
      <v-tabs v-model="activeTabs">
        <v-tabs-slider></v-tabs-slider>
        <v-tab>Meeting Details</v-tab>
        <v-tab-item>
          <v-row>
            <v-col>
              <h1>Meeting detail</h1>
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
                color="green"
                @click="add"
                v-if="update == false"
                :disabled="disableFields == true"
              >
                <v-icon left>mdi-pencil</v-icon>Add
              </v-btn>
              <v-btn
                class="ma-2"
                tile
                outlined
                color="warning"
                @click="add"
                v-if="update == true"
                :disabled="disableFields == true"
              >
                <v-icon left>mdi-pencil</v-icon>Update
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-text-field
              v-model="minuteDetailLocal.title"
              :label="'Meeting Title'"
              :shaped="shaped"
              :outlined="outlined"
              :rounded="rounded"
              :single-line="singleLine"
              :filled="filled"
              :flat="flat"
              :counter="counterEn ? counter : false"
              :dense="dense"
              :disabled="disableFields == true"
            ></v-text-field>
          </v-row>
          <v-row>
            <!-- Start the date of meeting -->
            <v-col>
              <v-menu
                v-model="menu2"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
                :disabled="disableFields == true"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="minuteDetailLocal.creation_date"
                    label="Event Date"
                    prepend-icon="mdi-event"
                    :shaped="shaped"
                    :outlined="outlined"
                    :rounded="rounded"
                    readonly
                    v-on="on"
                    :disabled="disableFields == true"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="minuteDetailLocal.creation_date"
                  @input="menu2 = false"
                  :disabled="disableFields == true"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <!-- Start the time_start of meeting -->
            <v-col>
              <v-menu
                ref="menu3"
                v-model="menu3"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="minuteDetailLocal.time_start"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
                :disabled="disableFields == true"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="minuteDetailLocal.time_start"
                    label="Start Time"
                    readonly
                    v-on="on"
                    :shaped="shaped"
                    :outlined="outlined"
                    :rounded="rounded"
                    :disabled="disableFields == true"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-if="menu3"
                  v-model="minuteDetailLocal.time_start"
                  full-width
                  @click:minute="$refs.menu3.save(minuteDetailLocal.time_start)"
                  :disabled="disableFields == true"
                ></v-time-picker>
              </v-menu>
            </v-col>
            <!-- Start the time_end of meeting -->
            <v-col>
              <v-menu
                ref="menu4"
                v-model="menu4"
                :close-on-content-click="false"
                :nudge-right="40"
                :return-value.sync="minuteDetailLocal.time_end"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
                :disabled="disableFields == true"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="minuteDetailLocal.time_end"
                    label="End Time"
                    readonly
                    v-on="on"
                    :shaped="shaped"
                    :outlined="outlined"
                    :rounded="rounded"
                    :disabled="disableFields == true"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-if="menu4"
                  v-model="minuteDetailLocal.time_end"
                  full-width
                  @click:minute="$refs.menu4.save(minuteDetailLocal.time_end)"
                  :disabled="disableFields == true"
                ></v-time-picker>
              </v-menu>
            </v-col>
          </v-row>

          <v-row>
            <v-textarea
              counter
              v-model="minuteDetailLocal.description"
              label="Description"
              :shaped="shaped"
              :outlined="outlined"
              :rounded="rounded"
              :disabled="disableFields == true"
            ></v-textarea>
          </v-row>
          <v-row>
            <PeoplePicker
              v-bind:guests="minuteDetailLocal.guests"
              ref="child"
              v-bind:disabledFields="disableFields"
            />
          </v-row>
        </v-tab-item>
        <v-tab>Minutes</v-tab>
        <v-tab-item>
          <v-row>
            <MinutePage />
          </v-row>
        </v-tab-item>
        <v-tab>Actions</v-tab>
        <v-tab-item>
          <v-row>
            <Actions v-bind:meetingID="minuteDetailLocal.id" />
          </v-row>
        </v-tab-item>
        <v-tab>History</v-tab>
        <v-tab-item v-if="activeTabs==3">
          <v-row>
            <ActionHistory v-bind:meetingID="minuteDetailLocal.id" />
          </v-row>
        </v-tab-item>
      </v-tabs>
    </v-container>
  </v-form>
</template>

<script>
import axios from "axios";
import PeoplePicker from "./reusable/peoplePicker";
import Actions from "./actions";
import ActionHistory from "./action_history";
import MinutePage from "./MinutePage";

export default {
  name: "MinuteDetail",
  components: { PeoplePicker, Actions, ActionHistory, MinutePage },
  data() {
    return {
      panel: [0],
      activeTabs: 0,
      friends: ["Sandra Adams", "Britta Holt"],
      isUpdating: false,
      autoUpdate: true,
      guests: [],
      menu: false,
      modal: false,
      menu2: false,
      menu3: false,
      menu4: false,
      shaped: false,
      outlined: true,
      rounded: true,
      solo: false,
      singleLine: false,
      filled: false,
      clearable: true,
      loadingFirstname: false,
      loadingSurname: false,
      flat: false,
      counterEn: false,
      counter: 0,
      dense: false,
      icon: "mdi-content-save",
      iconEvent: "mdi-event",
      showLoader: false,
      update: false,
      minuteDetailLocal: {},
      disableFields: false,
      indeterminate: true,
      rotate: 0,
      size: 32,
      value: 0,
      width: 4
    };
  },
  props: ["minuteDetail"],
  watch: {
    minuteDetail: function(newVal) {
      this.update = true;
      this.minuteDetailLocal = newVal;
      this.disableFields = false;
      this.showLoader = false;
      this.panel = [0];
    }
  },
  methods: {
    add: function() {
      this.disableFields = true;
      this.showLoader = true;
      let body = {};
      body.title = this.minuteDetailLocal.title;
      body.creation_date = this.minuteDetailLocal.creation_date;
      // body.creator = "test5@test.com"; //Will set the creator in the backend by pulling the email address from the jwt
      body.time_start = this.minuteDetailLocal.time_start;
      body.time_end = this.minuteDetailLocal.time_end;
      body.guests = this.$refs.child.guestsLocal;
      body.repeat_event = false;
      body.description = this.minuteDetailLocal.description;

      console.log("body", body);

      axios
        .post(
          "https://localhost:8080/Development/minutes/?action=CreateMinute",
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
          this.disableFields = false;
          console.log("completed with response", response);
          //Emit event so parent knows it was successful
          this.$emit("MinuteUpdateSuccess");
        })
        .catch(err => {
          this.showLoader = false;
          this.disableFields = false;
          console.log("Errored with response", err);
        });
    },
    clear: function() {
      //Clear whatever is in form
      this.update = false;
      this.disableFields = false;
      this.minuteDetailLocal = {};
    }
  }
};
</script>
