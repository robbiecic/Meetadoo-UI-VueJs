<template>
  <v-form v-model="valid">
    <v-container>
      <v-alert type="error" v-if="failAlert == true"
        >Email and/or password is not valid</v-alert
      >
      <v-row>
        <v-text-field
          v-model="email"
          label="E-mail"
          required
          data-test="text_email"
          :rounded="true"
          :outlined="true"
          :shaped="false"
        ></v-text-field>
      </v-row>
      <v-row>
        <v-text-field
          v-model="password"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show1 ? 'text' : 'password'"
          :rounded="true"
          :outlined="true"
          :shaped="false"
          name="input-10-1"
          label="Enter password ... "
          counter
          @click:append="show1 = !show1"
          v-on:keyup.enter="submit"
          data-test="text_password"
        ></v-text-field>
      </v-row>
      <div class="text-center">
        <v-btn class="mr-4" @click="submit" data-test="button_submit_login"
          >submit</v-btn
        >
        <v-btn @click="clear" data-test="button_clear_login">clear</v-btn>
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
      </div>
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
      failAlert: false
    };
  },
  methods: {
    submit: function(event) {
      event.preventDefault();
      this.failAlert = false;
      let postBody = {
        email: this.email,
        password: this.password
      };
      this.showLoader = true;
      axios
        .post(process.env.VUE_APP_ROOT_API + "?action=Login", {
          data: postBody
        })
        .then(response => {
          this.isLoggedOn = true;
          var responseData = response.data.replace(/'/g, '"');
          this.clear();
          this.showLoader = false;
          this.$store.commit("setUser");
          this.$router.push({
            name: "Dashboard",
            params: { user: responseData }
          });
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
.container {
  max-width: 700px;
}
</style>
