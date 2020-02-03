<template>
  <v-form>
    <v-container>
      <v-card
        class="pa-2"
        height="100%"
        v-if="componentVisible == true"
        loading
      >
        <br />
        <br />MEETING DETAIL NEEDS TO GO
        <br />
        {{ minuteDetail.title }}
      </v-card>
    </v-container>
  </v-form>
</template>

<script>
//import axios from "axios";

export default {
  name: "MinuteDetail",
  data() {
    return {
      componentVisible: false
    };
  },
  props: ["minuteDetail"],
  watch: {
    minuteDetail: function() {
      this.componentVisible = true;
    }
  },
  methods: {},
  created: function() {
    console.log("here");
    //if (this.minuteDetail.title) this.componentVisible = true;
  }
};
</script>
