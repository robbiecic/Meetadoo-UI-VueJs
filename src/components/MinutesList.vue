<template>
  <v-form>
    <v-sheet
      :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`"
      class="px-3 pt-3 pb-3"
      v-if="loading == true"
    >
      <v-skeleton-loader class="mx-auto" max-width="500" max-height="800" type="card"></v-skeleton-loader>
    </v-sheet>
    <v-container v-if="failAlert == true && loading == false">
      <v-alert type="error">You are not authorised to perform this action</v-alert>
    </v-container>
    <v-container w fluid ma-0 pa-0 fill-height v-if="failAlert == false && loading == false">
      <v-row>
        <v-col justify="center" md="2">
          <v-container id="scroll-target" style="max-height: 70%" class="overflow-y-auto">
            <v-row align="center" justify="center" style="height: 1000px">
              <MinuteSummary
                v-for="todo in minuteList"
                v-bind:key="todo.id"
                v-bind:title="todo.title"
                v-bind:creator="todo.creator"
                v-bind:meetingDate="todo.creation_date"
                v-on:click.native="clickedMinute(todo)"
              />
            </v-row>
          </v-container>
        </v-col>
        <v-col justify="center" md="8">
          <MinuteDetail v-bind:minuteDetail="minuteDetail" />
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import axios from "axios";
import MinuteSummary from "./MinuteSummary";
import MinuteDetail from "./MinuteDetail";

export default {
  name: "MinutesList",
  inject: ["theme"],
  data() {
    return {
      minuteList: [],
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
      minuteDetail: {},
      failAlert: false,
      loading: true
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
    // this.minuteDetail = this.minuteItems[0];
    // console.log(this.minuteDetail);
    //On create want to load my minutes
    axios
      .get("https://localhost:8080/Development/minutes/?action=GetMyMinutes", {
        withCredentials: true
      })
      .then(response => {
        let data = response.data;
        this.minuteList = data.minutes_created;
        //console.log(this.minuteList);
        this.loading = false;
        this.failAlert = false;
      })
      .catch(e => {
        console.log(e);
        this.failAlert = true;
        this.loading = false;
      });
  }
};
</script>
