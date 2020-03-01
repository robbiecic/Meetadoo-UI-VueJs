<template>
  <v-form v-model="valid">
    <v-container>
      <v-alert type="success" v-if="successAlert == true"
        >You are now registered {{ this.firstname }}</v-alert
      >
      <v-alert type="fail" v-if="failAlert == true"
        >A user with this email address already exists</v-alert
      >
      <v-row>
        <v-text-field
          v-model="email"
          :rules="emailRules"
          :rounded="true"
          :outlined="true"
          :shaped="false"
          label="E-mail"
          required
          data-test="text_email"
        ></v-text-field>
      </v-row>
      <v-row>
        <v-text-field
          v-model="firstname"
          :rules="nameRules"
          :rounded="true"
          :outlined="true"
          :shaped="false"
          label="First Name"
          required
          data-test="text_firstname"
        ></v-text-field>
      </v-row>
      <v-row>
        <v-text-field
          v-model="surname"
          :rules="nameRules"
          :rounded="true"
          :outlined="true"
          :shaped="false"
          label="Surname"
          required
          data-test="text_surname"
        ></v-text-field>
      </v-row>
      <v-row>
        <v-text-field
          v-model="password"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.min]"
          :type="show1 ? 'text' : 'password'"
          :rounded="true"
          :outlined="true"
          :shaped="false"
          name="input-10-1"
          label="Enter password ... "
          hint="At least 8 characters"
          counter
          @click:append="show1 = !show1"
          data-test="text_password"
        ></v-text-field>
      </v-row>
      <v-btn class="mr-4" @click="submit" data-test="button_submit"
        >submit</v-btn
      >
      <v-btn @click="clear" data-test="button_clear">clear</v-btn>
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
    </v-container>
  </v-form>
</template>

<script>
import axios from "axios";

export default {
  name: "UserRego",
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
      firstname: "",
      surname: "",
      show1: false,
      password: "",
      isLoggedOn: false,
      successAlert: false,
      failAlert: false,
      nameRules: [
        v => !!v || "Name is required",
        v => v.length <= 10 || "Name must be less than 10 characters"
      ],
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 8 || "Min 8 characters",
        emailMatch: () => "The email and password you entered don't match"
      }
    };
  },
  methods: {
    submit: function(event) {
      event.preventDefault();
      this.successAlert = false;
      this.failAlert = false;

      let postBody = {
        email: this.email,
        password: this.password,
        firstname: this.firstname,
        surname: this.surname
      };
      this.showLoader = true;
      axios
        .post(process.env.VUE_APP_ROOT_API + "/?action=CreateUser", {
          data: postBody
        })
        .then(response => {
          this.successAlert = true;
          this.isLoggedOn = true;
          localStorage.jwt = response.data.jwt;
          console.log(response);
          this.clear();
          this.showLoader = false;
          this.$store.commit("setUser");
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
      this.firstname = "";
      this.surname = "";
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
