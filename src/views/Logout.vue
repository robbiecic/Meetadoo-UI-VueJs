<template>
  <v-app>
    <v-content>Content here</v-content>
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
        { data: {} },
        {
          headers: {
            "content-type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        }
      )
      .then(response => {
        console.log(response);
      })
      .catch(e => {
        console.log(e);
      });
  }
};
</script>
