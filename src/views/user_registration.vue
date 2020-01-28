<template>
  <v-model id="user-rego">
    <input v-model="message" placeholder="edit me" />
    <p>Message is: {{ message }}</p>
    <v-btn v-on:click="submit">Clear</v-btn>
  </v-model>
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
  name: "user-rego",
  data() {
    return {
      message: ""
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
    }
  }
};
</script>
