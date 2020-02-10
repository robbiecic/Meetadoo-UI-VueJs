<template>
  <v-form>
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
                readonly
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="minuteDetail.creation_date"
              @input="menu2 = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col>
          <v-time-picker
            v-model="minuteDetail.time_start"
            type="month"
            width="290"
            class="ml-4"
          ></v-time-picker
        ></v-col>
        <v-col>
          <v-time-picker
            v-model="minuteDetail.time_end"
            type="month"
            width="290"
            class="ml-4"
          ></v-time-picker
        ></v-col>
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
  </v-form>
</template>

<script>
//import axios from "axios";
import PeoplePicker from "./reusable/peoplePicker";
export default {
  name: "MinuteDetail",
  components: { PeoplePicker },
  data() {
    const srcs = {
      1: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
      2: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
      3: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
      4: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
      5: "https://cdn.vuetifyjs.com/images/lists/5.jpg"
    };
    return {
      friends: ["Sandra Adams", "Britta Holt"],
      isUpdating: false,
      autoUpdate: true,
      menu: false,
      modal: false,
      menu2: false,
      people: [
        { header: "Group 1" },
        { name: "test6@test.com", group: "Group 1", avatar: srcs[1] },
        { name: "Ali Connors", group: "Group 1", avatar: srcs[2] },
        { name: "Trevor Hansen", group: "Group 1", avatar: srcs[3] },
        { name: "Tucker Smith", group: "Group 1", avatar: srcs[2] }
      ],
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
