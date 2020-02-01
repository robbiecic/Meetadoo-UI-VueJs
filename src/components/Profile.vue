<template>
  <v-form v-model="valid">
    <v-container>
      {{ firstname }}
    </v-container>
  </v-form>
</template>

<script>
//import axios from "axios";

export default {
  name: "Profile",
  data() {
    return {
      firstname: ""
    };
  },
  methods: {
    getProfile: function() {
      console.log("here");
      // event.preventDefault();
      // this.successAlert = false;
      // this.failAlert = false;
      //
      // let postBody = {
      //   email: this.email,
      //   password: this.password,
      //   firstname: this.firstname,
      //   surname: this.surname
      // };
      // this.showLoader = true;
      // axios
      //   .post(
      //     "http://localhost:8080/Development/?action=CreateUser",
      //     { data: postBody },
      //     {
      //       headers: {
      //         "content-type": "application/json",
      //         "Access-Control-Allow-Origin": "*"
      //       }
      //     }
      //   )
      //   .then(response => {
      //     this.successAlert = true;
      //     this.isLoggedOn = true;
      //     localStorage.jwt = response.data.jwt;
      //     console.log(response);
      //     this.clear();
      //     this.showLoader = false;
      //     this.$router.push("dashboard");
      //   })
      //   .catch(() => {
      //     this.failAlert = true;
      //     this.clear();
      //     this.showLoader = false;
      //   });
    }
  },
  created: function() {
    this.getProfile();
  }
};
</script>
<style scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>
