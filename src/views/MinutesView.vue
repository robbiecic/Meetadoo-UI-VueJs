<template>
  <v-app>
    <v-content>
      <v-row>
        <v-col md="3">
          <MinutesList @clicked_minute="onClickChild" v-bind:forceRefresh="setRefresh" />
        </v-col>
        <v-col>
          <MinuteDetail
            v-bind:minuteDetail="clickedMeeting"
            v-on:MinuteUpdateSuccess="setRefreshEvent"
          />
        </v-col>
      </v-row>
    </v-content>
  </v-app>
</template>

<script>
import MinutesList from "../components/MinutesList";
import MinuteDetail from "../components/MinuteDetail";
export default {
  name: "MintuesView",

  components: { MinutesList, MinuteDetail },

  data() {
    return {
      clickedMeeting: {},
      setRefresh: false
    };
  },
  methods: {
    onClickChild: function(event) {
      this.clickedMeeting = event;
    },
    setRefreshEvent: function() {
      this.setRefresh = true;
    }
  }
};
</script>
