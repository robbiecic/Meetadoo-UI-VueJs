<template>
  <v-combobox
    v-model="guests"
    :items="name_list"
    label="I use a scoped slot"
    multiple
    chips
  >
    <template v-slot:selection="data">
      <v-chip
        :key="JSON.stringify(data.item)"
        v-bind="data.attr"
        :input-value="data.selected"
        :disabled="data.disabled"
        @click:close="data.parent.selectItem(data.item)"
      >
        <v-avatar
          class="accent white--text"
          left
          v-text="data.item.slice(0, 1).toUpperCase()"
        ></v-avatar>
        {{ people.email_address }}
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
  watch: {
    isUpdating(val) {
      if (val) {
        setTimeout(() => (this.isUpdating = false), 3000);
      }
    },
    guests: function(newVal, oldVal) {
      console.log(newVal, oldVal);
      //If this changes I need to pull through the names corresponding to the email addresses...
    }
  },
  methods: {
    remove(item) {
      const index = this.guests.indexOf(item.name);
      console.log("index", index);
      if (index >= 0) this.guests.splice(index, 1);
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
        this.people = json_data.linked_list;
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
