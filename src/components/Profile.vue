<template>
  <v-form>
    <v-container class="text-center" v-if="showLoader == true">
      <LoaderProfile />
    </v-container>
    <!-- Error & Warning message container, show if not loading-->
    <v-container v-if="showLoader == false">
      <v-alert type="error" v-if="failAlert == true"
        >You are not authorised to perform this action</v-alert
      >
      <v-alert type="error" v-if="updateFail == true" dismissible>
        Oops... Something went wrong updating your data. Please try again later.
      </v-alert>
      <v-alert type="success" v-if="updateSuccess == true" dismissible
        >Yay! You have successfully updated your profile!</v-alert
      >
    </v-container>
    <!-- Show main content if authorised and if not loading -->
    <v-container v-if="failAlert == false && showLoader == false">
      <br />
      <h1>My Profile</h1>
      <br />
      <v-text-field
        v-model="email"
        :label="'Email'"
        :shaped="shaped"
        :outlined="outlined"
        :rounded="rounded"
        :single-line="singleLine"
        :filled="filled"
        :flat="flat"
        :counter="counterEn ? counter : false"
        :dense="dense"
        disabled
        data-test="text_email"
      ></v-text-field>
      <v-text-field
        v-model="firstname"
        :append-icon="icon"
        :label="'Fist Name'"
        :shaped="shaped"
        :outlined="outlined"
        :rounded="rounded"
        :solo="solo"
        :single-line="singleLine"
        :filled="filled"
        :loading="loadingFirstname"
        :flat="flat"
        :dense="dense"
        :disabled="disableFields == 1"
        @click:append="toggleSave('firstname')"
        v-on:keyup.enter="toggleSave('firstname')"
        data-test="text_firstname"
      ></v-text-field>
      <v-text-field
        v-model="surname"
        :append-icon="icon"
        :label="'Surname'"
        :shaped="shaped"
        :outlined="outlined"
        :rounded="rounded"
        :solo="solo"
        :single-line="singleLine"
        :filled="filled"
        :loading="loadingSurname"
        :flat="flat"
        :dense="dense"
        :disabled="disableFields == 1"
        @click:append="toggleSave('surname')"
        v-on:keyup.enter="toggleSave('surname')"
        data-test="text_surname"
      ></v-text-field>
    </v-container>
  </v-form>
</template>

<script>
import axios from "axios";
import LoaderProfile from "./loaders/loader_profile";

export default {
  name: "Profile",
  props: ["user"],
  components: { LoaderProfile },
  data() {
    return {
      firstname: "",
      surname: "",
      email: "",
      showLoader: false,
      failAlert: false,
      placeholder: "",
      shaped: false,
      outlined: true,
      rounded: true,
      solo: false,
      singleLine: false,
      filled: false,
      clearable: true,
      loadingFirstname: false,
      loadingSurname: false,
      flat: false,
      counterEn: false,
      counter: 0,
      dense: false,
      icon: "mdi-content-save",
      disableFields: 0,
      updateFail: false,
      updateSuccess: false
    };
  },
  methods: {
    getProfile: function(updateCheck) {
      this.showLoader = true;
      this.failAlert = false;
      axios
        .get(process.env.VUE_APP_ROOT_API + "?action=getUser")
        .then(response => {
          let data = response.data;
          let data_json = JSON.parse(data.replace(/'/g, '"'));
          this.firstname = data_json.firstname;
          this.surname = data_json.surname;
          this.email = data_json.email;
          this.showLoader = false;
          this.clear();
          if (updateCheck == "update_succes") this.updateSuccess = true;
        })
        .catch(() => {
          //console.log(e);
          this.failAlert = true;
          this.showLoader = false;
        });
    },
    toggleSave: function(loadingBar) {
      this.loadingFirstname = false;
      this.loadingSurname = false;
      // Toggle logging symbol for item which is updated
      if (loadingBar == "firstname") this.loadingFirstname = true;
      if (loadingBar == "surname") this.loadingSurname = true;
      // Move all fields to disabled
      this.disableFields = 1;
      this.updateFail = false;
      this.updateSuccess = false;
      // Form body to send in API request
      let body = {
        email: this.email,
        firstname: this.firstname,
        surname: this.surname
      };
      axios
        .post(process.env.VUE_APP_ROOT_API + "?action=UpdateUser", {
          data: body
        })
        .then(() => {
          //If update user is successful, get latest data
          this.updateSuccess = true;
          this.clear();
        })
        .catch(() => {
          this.updateFail = true;
          this.clear();
        });
    },
    clear: function() {
      this.loadingFirstname = false;
      this.loadingSurname = false;
      this.disableFields = 0;
    }
  },
  created: function() {
    //console.log("this.user", this.user);

    //Each time this page is refreshed or component is loaded, get the user's profile using the Cookie the user may have received from server after logging in successfully
    if (this.user) {
      //If pass in by props then load straight in
      let data_json = JSON.parse(this.user);
      this.firstname = data_json.firstname;
      this.surname = data_json.surname;
      this.email = data_json.email;
    } else {
      this.getProfile();
    }
  }
};
</script>
<style scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>
