<template>
  <v-form v-model="valid">
    <v-container>
      <v-row no-gutters>
        <v-col justify="center">
          <MinuteSummary
            v-for="(todo) in minuteItems"
            v-bind:key="todo.id"
            v-bind:title="todo.title"
            v-bind:creator="todo.creator"
            v-bind:meetingDate="todo.meetingDate"
          />
        </v-col>
        <v-col justify="center">
          <MinuteDetail />
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
//import axios from "axios";
import MinuteSummary from "./MinuteSummary";
import MinuteDetail from "./MinuteDetail";

export default {
  name: "MinutesList",
  data() {
    return {
      minuteItems: [
        {
          id: 1,
          title: "Meeting 1",
          creator: "John Smith",
          meetingDate: "2019-12-01"
        },
        {
          id: 2,
          title: "Meeting 2",
          creator: "John Smith",
          meetingDate: "2020-01-15"
        },
        {
          id: 3,
          title: "Meeting 3",
          creator: "Jane Doe",
          meetingDate: "2020-01-01"
        },
        {
          id: 4,
          title: "Meeting 4",
          creator: "John Smith",
          meetingDate: "2020-06-15"
        }
      ],
      minuteDetailID: ""
    };
  },
  components: {
    MinuteSummary,
    MinuteDetail
  },
  methods: {
    clickedMinute: function(id) {
      this.minuteDetailID = id;
    }
  },
  created: function() {}
};
</script>