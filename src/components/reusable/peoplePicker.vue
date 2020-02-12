<template>
  <v-combobox v-model="guests" :items="email_list" label="Add someone" multiple chips>
    <template v-slot:selection="data">
      <v-chip
        :key="JSON.stringify(data.item)"
        v-bind="data.attr"
        :input-value="data.selected"
        :disabled="data.disabled"
        @click:close="data.parent.selectItem(data.item)"
      >
        <v-avatar class="accent white--text" left v-text="getAvatar(data)"></v-avatar>
        {{ item }}
      </v-chip>
    </template>
  </v-combobox>
</template>

<script>
import axios from "axios";

export default {
  name: "PeoplePicker",
  props: ["guests"],
  data() {
    return {
      isUpdating: false,
      people: [],
      email_list: [],
      name_list: [],
      filled: false,
      disabled: false
    };
  },
  computed: {
    // people: function() {
    //   axios
    //     .get("http://localhost:8080/Development/?action=getUserList")
    //     .then(response => {
    //       //Avatar will show the name , hidden field for email address as the key
    //       //Onclick of the user name we can derive the email address
    //       const json_data = JSON.parse(response.data.replace(/'/g, '"'));
    //       this.email_list = json_data.email_only;
    //       this.name_list = json_data.name_only;
    //       this.people = json_data.linked_list;
    //       this.isUpdating = false;
    //     })
    //     .catch(error => {
    //       console.log(error);
    //       this.isUpdating = false;
    //     });
    // }
  },
  watch: {
    isUpdating(val) {
      if (val) {
        setTimeout(() => (this.isUpdating = false), 3000);
      }
    },
    guests: function() {
      //console.log(newVal, oldVal);
    }
  },
  methods: {
    remove(item) {
      const index = this.guests.indexOf(item.name);
      console.log("index", index);
      if (index >= 0) this.guests.splice(index, 1);
    },
    getAvatar(data) {
      //Here we need to turn the email address in data.item to a name
      console.log("data.item", data.item);
      //console.log("this.people", this.people);
      //Need to loop through people to find the name for the email address
      var i = 0;
      var index = this.people.findIndex(p => p.email == data.item);
      console.log("index", index);
      for (i = 0; i < this.people.length; i++) {
        //console.log(this.people[i]);
        //Need to look at email key and return the name.
      }
      return data.item.slice(0, 1).toUpperCase();
    }
  },
  created: function() {
    this.isUpdating = true;
    axios
      .get("http://localhost:8080/Development/?action=getUserList")
      .then(response => {
        //Avatar will show the name , hidden field for email address as the key
        //Onclick of the user name we can derive the email address
        const json_data = JSON.parse(response.data.replace(/'/g, '"'));
        this.email_list = json_data.email_only;
        this.name_list = json_data.name_only;
        this.people = json_data.link_list;
        this.isUpdating = false;
      })
      .catch(error => {
        console.log(error);
        this.isUpdating = false;
      });
  }
};
</script>
<style scoped></style>
