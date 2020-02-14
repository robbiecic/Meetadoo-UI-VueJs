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
        <v-col>
          <v-card max-width="600" class="mx-auto">
            <v-toolbar color="light-blue" dark>
              <v-app-bar-nav-icon></v-app-bar-nav-icon>

              <v-toolbar-title>My Meetings</v-toolbar-title>

              <v-spacer></v-spacer>

              <v-btn icon>
                <v-icon>mdi-magnify</v-icon>
              </v-btn>
            </v-toolbar>

            <v-list>
              <v-list-item
                v-for="item in minuteList"
                :key="item.title"
                @click="clickedMinute(item)"
              >
                <v-list-item-avatar>
                  <v-icon :class="[item.iconClass]" v-text="item.icon"></v-icon>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title v-text="item.title"></v-list-item-title>
                  <v-list-item-subtitle v-text="item.creation_date"></v-list-item-subtitle>
                </v-list-item-content>

                <v-list-item-action>
                  <v-btn icon>
                    <v-icon color="grey lighten-1">mdi-information</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>

              <v-divider inset></v-divider>
            </v-list>
          </v-card>
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
// import MinuteSummary from "./MinuteSummary";
import MinuteDetail from "./MinuteDetail";

export default {
  name: "MinutesList",
  inject: ["theme"],
  data() {
    return {
      minuteList: [],
      minuteDetail: {},
      failAlert: false,
      loading: true
    };
  },
  components: {
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
