<template>
  <v-form>
    <v-container>
      <v-tabs v-model="activeTabs">
        <v-tabs-slider></v-tabs-slider>
        <v-tab>Meeting Details</v-tab>
        <v-tab-item>
          <v-row>
            <v-col>
              <h1>{{ minuteDetailLocal.title }}</h1>
            </v-col>
            <v-col class="text-right">
              <v-alert type="error" v-if="updateFail == true" dismissible>
                Oops... Something went wrong updating your data. Please try
                again later.
              </v-alert>
              <v-alert
                type="success"
                v-if="updateSuccess == true"
                dismissible
              >Yay! You have successfully submitted your minutes!</v-alert>
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
                @click="add('add')"
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
                @click="add('update')"
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
          <v-row>
            <AddLabels
              v-bind:modelProps="minuteDetailLocal.labels"
              v-bind:meetingID="minuteDetailLocal.id"
              ref="labelsChild"
            />
          </v-row>
        </v-tab-item>
        <v-tab v-if="minuteDetailLocal">Minutes</v-tab>
        <v-tab-item>
          <v-row>
            <MinutePage
              v-bind:meetingID="minuteDetailLocal.id"
              v-bind:creation_date="minuteDetailLocal.creation_date"
              v-bind:minutes="minutes"
              v-bind:meetingTitle="minuteDetailLocal.title"
              v-on:MinutePageUpdateSuccess="setRefreshEvent"
            />
          </v-row>
        </v-tab-item>
        <v-tab>Actions</v-tab>
        <v-tab-item>
          <v-row>
            <Actions
              v-bind:meetingID="minuteDetailLocal.id"
              v-bind:meetingTitle="minuteDetailLocal.title"
            />
          </v-row>
        </v-tab-item>
        <v-tab>History</v-tab>
        <v-tab-item v-if="activeTabs == 3">
          <v-row>
            <ActionHistory
              v-bind:meetingID="minuteDetailLocal.id"
              v-bind:meetingTitle="minuteDetailLocal.title"
            />
          </v-row>
        </v-tab-item>
      </v-tabs>
    </v-container>
  </v-form>
</template>

<script>
import axios from "axios";
import PeoplePicker from "./reusable/peoplePicker";
import AddLabels from "./reusable/addLabels";
import Actions from "./actions";
import ActionHistory from "./action_history";
import MinutePage from "./MinutePage";

export default {
  name: "MinuteDetail",
  components: { PeoplePicker, Actions, ActionHistory, MinutePage, AddLabels },
  data() {
    return {
      panel: [0],
      activeTabs: 0,
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
      width: 4,
      updateSuccess: false,
      updateFail: false,
      minutes: {}
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

      if (typeof newVal.minutes != "undefined") {
        this.minutes = newVal.minutes;
      } else {
        this.minutes = {};
      }
    }
  },
  methods: {
    add: function(add_or_update) {
      this.disableFields = true;
      this.updateSuccess = false;
      this.updateFail = false;
      this.showLoader = true;
      let body = {};
      let url = "";
      body.title = this.minuteDetailLocal.title;
      body.creation_date = this.minuteDetailLocal.creation_date;
      body.time_start = this.minuteDetailLocal.time_start;
      body.time_end = this.minuteDetailLocal.time_end;
      body.guests = this.$refs.child.guestsLocal;
      body.labels = this.$refs.labelsChild.model;
      body.repeat_event = false;
      body.description = this.minuteDetailLocal.description;
      if (add_or_update == "update") {
        body.id = this.minuteDetailLocal.id;
        body.creator = this.minuteDetailLocal.creator;
        url = process.env.VUE_APP_ROOT_API + "minutes/?action=UpdateMinute";
      } else {
        url = process.env.VUE_APP_ROOT_API + "minutes/?action=CreateMinute";
      }

      axios
        .post(url, { data: body })
        .then(() => {
          this.showLoader = false;
          this.disableFields = false;
          this.updateSuccess = true;
          this.updateFail = false;
          //console.log("completed with response", response);
          //Emit event so parent knows it was successful
          this.$emit("MinuteUpdateSuccess");
        })
        .catch(() => {
          this.showLoader = false;
          this.disableFields = false;
          this.updateFail = true;
          this.updateSuccess = false;
          //console.log("Errored with response", err);
        });
    },
    clear: function() {
      //Clear whatever is in form
      this.update = false;
      this.disableFields = false;
      this.minuteDetailLocal = {};
    },
    setRefreshEvent: function() {
      //Emit event so parent knows it was successful
      //This will force the reload of the minuteList in parent component
      this.$emit("MinuteUpdateSuccess");
    }
  }
};
</script>
