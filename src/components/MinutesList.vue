<template>
  <v-form>
    <v-container w fluid ma-0 pa-0 fill-height>
      <v-row>
        <v-col justify="center" md="2">
          <MinuteSummary
            v-for="todo in minuteItems"
            v-bind:key="todo.id"
            v-bind:title="todo.title"
            v-bind:creator="todo.creator"
            v-bind:meetingDate="todo.meetingDate"
            v-on:click.native="clickedMinute(todo)"
          />
        </v-col>
        <v-col justify="center" md="8">
          <MinuteDetail v-bind:minuteDetail="minuteDetail" />
        </v-col>
        <v-col justify="right" md="1">
          <v-btn>Add</v-btn>
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
          title: "NoteIt POC Workshop",
          creator: "John Smith",
          meetingDate: "2019-12-01"
        },
        {
          id: 2,
          title: "Catch up with John",
          creator: "John Smith",
          meetingDate: "2020-01-15"
        },
        {
          id: 3,
          title: "Pick up kids",
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
      minuteDetail: {}
    };
  },
  components: {
    MinuteSummary,
    MinuteDetail
  },
  methods: {
    clickedMinute: function(todo) {
      this.minuteDetail = todo;
    }
  },
  created: function() {
    this.minuteDetail = this.minuteItems[0];
    console.log(this.minuteDetail);
  }
};
</script>
