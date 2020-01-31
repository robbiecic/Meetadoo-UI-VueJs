<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-text-field v-model="email" label="E-mail" required></v-text-field>
      </v-row>
      <v-row>
        <v-text-field
          v-model="password"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show1 ? 'text' : 'password'"
          name="input-10-1"
          label="Enter password ... "
          counter
          @click:append="show1 = !show1"
        ></v-text-field>
      </v-row>
      <v-btn class="mr-4" @click="submit">submit</v-btn>
      <v-btn @click="clear">clear</v-btn>
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
      <v-row>
        <v-alert type="success" v-if="successAlert == true"
          >You are now registered {{ this.firstname }}</v-alert
        >
        <v-alert type="fail" v-if="failAlert == true"
          >Email and/or password is not valid</v-alert
        >
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      showLoader: false,
      indeterminate: true,
      rotate: 0,
      size: 32,
      value: 0,
      width: 4,
      email: "",
      valid: false,
      show1: false,
      password: "",
      isLoggedOn: false,
      successAlert: false,
      failAlert: false
    };
  },
  methods: {
    submit: function(event) {
      event.preventDefault();
      this.successAlert = false;
      this.failAlert = false;

      let postBody = {
        email: this.email,
        password: this.password
      };
      this.showLoader = true;
      axios
        .post(
          "http://localhost:8080/Development/?action=Login",
          { data: postBody },
          {
            headers: {
              "content-type": "application/json",
              "Access-Control-Allow-Origin": "*"
            }
          }
        )
        .then(response => {
          this.successAlert = true;
          this.isLoggedOn = true;
          localStorage.jwt = response.data.jwt;
          console.log(response);
          this.clear();
          this.showLoader = false;
          this.$router.push("dashboard");
        })
        .catch(() => {
          this.failAlert = true;
          this.clear();
          this.showLoader = false;
        });
    },
    clear() {
      this.email = "";
      this.password = "";
    }
  }
};
</script>
<style scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>
