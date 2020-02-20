<template>
  <v-app>
    <v-content>
      <v-row>
        <v-col md="3">
          <MinutesList @clicked_minute="onClickChild" />
        </v-col>
        <v-col>
          <MinuteDetail v-bind:minuteDetail="clickedMeeting" />
        </v-col>
      </v-row>
    </v-content>
  </v-app>
</template>

<script>
import MinutesList from "../components/MinutesList_new";
import MinuteDetail from "../components/MinuteDetail";
export default {
  name: "MintuesView",

  components: { MinutesList, MinuteDetail },

  data() {
    return {
      clickedMeeting: {}
    };
  },
  methods: {
    onClickChild: function(event) {
      this.clickedMeeting = event;
    }
  }
};
</script>
