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
        <v-col
          ><v-date-picker
            v-model="minuteDetail.creation_date"
            :landscape="landscape"
            :reactive="reactive"
            :full-width="false"
            :show-current="showCurrent"
            :type="month ? 'month' : 'date'"
            :multiple="multiple"
            :readonly="readonly"
            :disabled="disabled"
            :events="enableEvents ? functionEvents : null"
          ></v-date-picker>
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
          :rules="rules"
          :value="value"
        ></v-textarea>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
//import axios from "axios";

export default {
  name: "MinuteDetail",
  data() {
    return {
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
