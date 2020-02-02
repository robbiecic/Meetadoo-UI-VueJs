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
      <v-text-field
        v-model="email"
        :label="'Email'"
        :shaped="shaped"
        :outlined="outlined"
        :rounded="rounded"
        :single-line="singleLine"
        :filled="filled"
        :persistent-hint="persistentHint"
        :loading="loading"
        :flat="flat"
        :counter="counterEn ? counter : false"
        :dense="dense"
        disabled
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
        :persistent-hint="persistentHint"
        :loading="loading"
        :flat="flat"
        :dense="dense"
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
        :persistent-hint="persistentHint"
        :loading="loading"
        :flat="flat"
        :dense="dense"
      ></v-text-field>
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
      failAlert: false,
      model: "I'm a text field",
      label: "Email Address",
      placeholder: "",
      shaped: false,
      outlined: true,
      rounded: true,
      solo: false,
      singleLine: false,
      filled: false,
      clearable: true,
      loading: true,
      flat: false,
      counterEn: false,
      counter: 0,
      dense: false,
      icon: "mdi-content-save"
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
