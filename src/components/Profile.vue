<template>
  <v-form v-model="valid">
    <v-container>
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
      <br />
      {{ firstname }}
    </v-container>
  </v-form>
</template>

<script>
import axios from "axios";

export default {
  name: "Profile",
  data() {
    return {
      firstname: "",
      showLoader: false,
      indeterminate: true,
      rotate: 0,
      size: 32,
      value: 0,
      width: 4
    };
  },
  methods: {
    getProfile: function(email_address) {
      event.preventDefault();
      // this.successAlert = false;
      // this.failAlert = false;
      axios.defaults.withCredentials = true;
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      this.showLoader = true;

      console.log(email_address);
      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };

      fetch(
        "https://i6vtmh1eq3.execute-api.ap-southeast-2.amazonaws.com/Development?action=getUser&email=test5@test.com",
        requestOptions
      )
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log("error", error));
    }
  },
  created: function() {
    this.getProfile("test5@test.com");
  }
};
</script>
<style scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>
