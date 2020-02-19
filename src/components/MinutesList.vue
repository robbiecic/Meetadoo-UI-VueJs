<template>
  <v-form>
    <v-sheet
      :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`"
      class="px-3 pt-3 pb-3"
      v-if="loading == true"
    >
      <v-skeleton-loader
        class="mx-auto"
        max-width="500"
        max-height="800"
        type="card"
      ></v-skeleton-loader>
    </v-sheet>
    <v-container v-if="failAlert == true && loading == false">
      <v-alert type="error"
        >You are not authorised to perform this action</v-alert
      >
    </v-container>
    <v-container
      w
      fluid
      ma-0
      pa-0
      fill-height
      v-if="failAlert == false && loading == false"
    >
      <v-row>
        <v-col>
          <v-card max-width="600" class="mx-auto">
            <v-toolbar flat color="transparent">
              <v-app-bar-nav-icon></v-app-bar-nav-icon>

              <v-toolbar-title>My Meetings</v-toolbar-title>

              <v-spacer></v-spacer>

              <v-btn icon @click="$refs.search.focus()">
                <v-icon>mdi-magnify</v-icon>
              </v-btn>
            </v-toolbar>
            <v-text-field
              ref="search"
              v-model="search"
              full-width
              hide-details
              label="Search"
              single-line
            ></v-text-field>
            <v-list>
              <v-list-item
                v-for="item in filteredMinutes"
                :key="item.id"
                @click="clickedMinute(item)"
              >
                <v-list-item-avatar>
                  <v-icon :class="[item.iconClass]" v-text="item.icon"></v-icon>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title v-text="item.title"></v-list-item-title>
                  <v-list-item-subtitle
                    v-text="item.creation_date"
                  ></v-list-item-subtitle>
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
          <MinuteDetail
            ref="search"
            v-bind:minuteDetail="minuteDetail"
            v-on:MinuteUpdateSuccess="reloadPage"
          />
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
      loading: true,
      search: ""
    };
  },
  components: {
    MinuteDetail
  },
  computed: {
    filteredMinutes() {
      const search = this.search.toLowerCase();

      if (!search) return this.minuteList;

      return this.minuteList.filter(item => {
        const text = item.title.toLowerCase();

        return text.indexOf(search) > -1;
      });
    }
  },
  methods: {
    clickedMinute: function(todo) {
      this.minuteDetail = todo;
    },
    reloadPage: function() {
      this.getMinutes();
    },
    getMinutes: function() {
      axios
        .get(
          "https://localhost:8080/Development/minutes/?action=GetMyMinutes",
          {
            withCredentials: true
          }
        )
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
  },
  created: function() {
    //On create want to load my minutes
    this.getMinutes();
  }
};
</script>
