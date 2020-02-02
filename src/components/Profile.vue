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
      this.showLoader = true;

      axios
        .get(
          "http://localhost:8080/Development/?action=getUser&email=" +
            email_address,
          {
            headers: {
              "Access-Control-Allow-Origin": "*", // <-- Add your specific origin here
              "Access-Control-Allow-Credentials": true
            }
          },
          { withCredentials: true }
        )
        .then(response => {
          console.log(response);
          this.showLoader = false;
        })
        .catch(e => {
          console.log(e);
        });
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
