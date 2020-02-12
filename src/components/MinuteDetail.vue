<template>
  <v-form>
    <v-badge bordered color="error" icon="mdi-lock" overlap>
      <v-container>
        <v-row>
          <v-text-field
            v-model="minuteDetail.title"
            :label="'Meeting Title'"
            :shaped="shaped"
            :outlined="outlined"
            :rounded="rounded"
            :single-line="singleLine"
            :filled="filled"
            :flat="flat"
            :counter="counterEn ? counter : false"
            :dense="dense"
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
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="minuteDetail.creation_date"
                  label="Event Date"
                  prepend-icon="mdi-event"
                  :shaped="shaped"
                  :outlined="outlined"
                  :rounded="rounded"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="minuteDetail.creation_date" @input="menu2 = false"></v-date-picker>
            </v-menu>
          </v-col>
          <!-- Start the time_start of meeting -->
          <v-col>
            <v-menu
              ref="menu"
              v-model="menu3"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="time"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="minuteDetail.time_start"
                  label="Start Time"
                  readonly
                  v-on="on"
                  :shaped="shaped"
                  :outlined="outlined"
                  :rounded="rounded"
                ></v-text-field>
              </template>
              <v-time-picker
                v-if="menu3"
                v-model="minuteDetail.time_start"
                full-width
                @click:minute="$refs.menu.save(time)"
              ></v-time-picker>
            </v-menu>
          </v-col>
          <!-- Start the time_end of meeting -->
          <v-col>
            <v-menu
              ref="menu"
              v-model="menu4"
              :close-on-content-click="false"
              :nudge-right="40"
              :return-value.sync="time"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="minuteDetail.time_end"
                  label="Start Time"
                  readonly
                  v-on="on"
                  :shaped="shaped"
                  :outlined="outlined"
                  :rounded="rounded"
                ></v-text-field>
              </template>
              <v-time-picker
                v-if="menu4"
                v-model="minuteDetail.time_end"
                full-width
                @click:minute="$refs.menu.save(time)"
              ></v-time-picker>
            </v-menu>
          </v-col>
        </v-row>
        <v-row>
          <v-textarea
            counter
            v-model="minuteDetail.description"
            label="Description"
            :shaped="shaped"
            :outlined="outlined"
            :rounded="rounded"
          ></v-textarea>
        </v-row>
        <v-row>
          <PeoplePicker v-bind:guests="minuteDetail.guests" />
        </v-row>
      </v-container>
    </v-badge>
  </v-form>
</template>

<script>
//import axios from "axios";
import PeoplePicker from "./reusable/peoplePicker";
export default {
  name: "MinuteDetail",
  components: { PeoplePicker },
  data() {
    return {
      friends: ["Sandra Adams", "Britta Holt"],
      isUpdating: false,
      autoUpdate: true,
      menu: false,
      modal: false,
      menu2: false,
      menu3: false,
      menu4: false,
      componentVisible: false,
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
      indeterminate: true,
      rotate: 0,
      size: 32,
      value: 0,
      width: 4
    };
  },
  props: ["minuteDetail"],
  watch: {
    minuteDetail: function() {
      this.componentVisible = true;
    }
  },
  methods: {}
};
</script>
