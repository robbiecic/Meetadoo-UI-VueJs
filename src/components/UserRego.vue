<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field>
      </v-row>
      <v-row>
        <v-text-field
          v-model="password"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :rules="[rules.required, rules.min]"
          :type="show1 ? 'text' : 'password'"
          name="input-10-1"
          label="Enter password ... "
          hint="At least 8 characters"
          counter
          @click:append="show1 = !show1"
        ></v-text-field>
      </v-row>
      <v-row>
        <p>Email is: {{ email }}</p>
      </v-row>
      <v-btn class="mr-4" @click="submit">submit</v-btn>
      <v-btn @click="clear">clear</v-btn>
    </v-container>
  </v-form>
</template>

<script>
import axios from "axios";

var testData = {
  data: {
    email: "robert.cicero@test.com",
    firstname: "Robert",
    surname: "Cicero",
    password: "password"
  }
};
export default {
  name: "UserRego",
  data() {
    return {
      email: "",
      valid: false,
      firstname: "",
      lastname: "",
      show1: false,
      show2: true,
      show3: false,
      show4: false,
      password: "",
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
    submit: function() {
      axios
        .post(
          "/CreateUser",
          { params: { action: "CreateUser" } },
          { data: { data: testData } },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    clear() {
      this.name = "";
      this.email = "";
    }
  }
};
</script>
