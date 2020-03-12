<template>
  <v-app>
    <v-content>
      <MinuteDetail
        v-bind:minuteDetail="clickedMeeting"
        v-bind:meetingID="meetingID"
        v-on:MinuteUpdateSuccess="setRefreshEvent"
      />
    </v-content>
  </v-app>
</template>

<script>
// import MinutesList from "../components/MinutesList";
import MinuteDetail from "../components/MinuteDetail";
export default {
  name: "MintuesView",
  props: ["meetingID"],
  components: { MinuteDetail },

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
