<template>
  <v-app>
    <v-content>
      <div class="text-center" v-if="showLoader == true">
        <v-progress-circular
          :indeterminate="indeterminate"
          :rotate="rotate"
          :size="size"
          :value="value"
          :width="width"
          color="light-blue"
        ></v-progress-circular>
      </div>
      <v-alert
        v-if="unsuccessful == true"
        type="error"
      >Oops... Something went wrong, please try again later.</v-alert>
      <v-container v-if="successful == true">
        <v-alert type="success" dismissible>You have successfully logged out</v-alert>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  name: "Logout",
  data() {
    return {
      successful: false,
      showLoader: false,
      unsuccessful: false,
      indeterminate: true,
      rotate: 0,
      size: 32,
      value: 0,
      width: 4
    };
  },
  created: function() {
    //Need to update cookie so it's expired
    this.showLoader = true;
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
      .then(() => {
        this.$store.commit("unSetUser");
        this.successful = true;
        this.unsuccessful = false;
        this.showLoader = false;
      })
      .catch(() => {
        this.successful = true;
        this.unsuccessful = true;
        this.showLoader = false;
      });
  }
};
</script>
