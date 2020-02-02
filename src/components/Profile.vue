<template>
  <v-form>
    <v-container v-if="failAlert == false">
      <h1>MY Profile</h1>
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
      {{ surname }}
      {{ email }}
    </v-container>
    <v-container v-if="failAlert == true">
      <v-alert type="error"
        >You are not authorised to perform this action</v-alert
      >
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
      surname: "",
      email: "",
      showLoader: false,
      indeterminate: true,
      rotate: 0,
      size: 32,
      value: 0,
      width: 4,
      failAlert: false
    };
  },
  methods: {
    getProfile: function() {
      this.showLoader = true;
      axios.defaults.withCredentials = true;
      this.failAlert = false;
      axios
        .get("http://localhost:8080/Development/?action=getUser", {
          withCredentials: true
        })
        .then(response => {
          let data = response.data;
          let data_json = JSON.parse(data.replace(/'/g, '"'));
          this.firstname = data_json.firstname;
          this.surname = data_json.surname;
          this.email = data_json.email;
          this.showLoader = false;
        })
        .catch(e => {
          console.log(e);
          this.failAlert = true;
          this.showLoader = false;
        });
    }
  },
  created: function() {
    //Each time this page is refreshed or component is loaded, get the user's profile using the Cookie the user may have received from server after logging in successfully
    this.getProfile();
  }
};
</script>
<style scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>
