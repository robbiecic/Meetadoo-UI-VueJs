<template>
  <v-app>
    <v-content>
      <v-progress-circular
        :indeterminate="indeterminate"
        :rotate="rotate"
        :size="size"
        :value="value"
        :width="width"
        color="light-blue"
      ></v-progress-circular>
    </v-content>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  name: "Logout",
  data() {
    return { successful: false };
  },
  created: function() {
    //Need to update cookie so it's expired
    // this.showLoader = true;
    axios
      .post(
        "https://localhost:8080/Development/?action=Logout",
        {
          data: { email: "Not Required" }
        },
        {
          headers: {
            "content-type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        }
      )
      .then(response => {
        this.successful = true;
      })
      .catch(e => {
        console.log(e);
      });
  }
};
</script>
