<template>
  <v-combobox
    v-model="guestsLocal"
    :items="email_list"
    label="Add someone"
    multiple
    chips
    :disabled="disabledFields==true"
  >
    <template v-slot:selection="data">
      <v-chip
        :key="JSON.stringify(data.email)"
        v-bind="data.attr"
        :input-value="data.selected"
        :disabled="data.disabled"
        @click:close="data.parent.selectItem(data.item)"
        close
      >
        <v-avatar left>
          <v-icon>mdi-account-circle</v-icon>
        </v-avatar>
        {{getAvatar(data)}}
      </v-chip>
    </template>
  </v-combobox>
</template>

<script>
import axios from "axios";

export default {
  name: "PeoplePicker",
  props: ["guests", "disabledFields"],
  data() {
    return {
      isUpdating: false,
      people: [],
      email_list: [],
      name_list: [],
      filled: false,
      disabled: false,
      guestsLocal: []
    };
  },
  watch: {
    isUpdating(val) {
      if (val) {
        setTimeout(() => (this.isUpdating = false), 3000);
      }
    },
    guests: function(newVal) {
      this.guestsLocal = newVal;
    }
  },
  methods: {
    remove(item) {
      const index = this.guests.indexOf(item.name);
      console.log("index", index);
      if (index >= 0) this.guests.splice(index, 1);
    },
    getAvatar(data) {
      //Here we need to turn the email address in data.item to a name. If look up fails, simply return the email address
      let index = this.people.findIndex(p => p.email == data.item);
      if (index > -1) {
        return this.people[index].name;
      } else {
        return data.item;
      }
    }
  },
  created: function() {
    this.guestsLocal = this.guests;
    this.isUpdating = true;
    axios
      .get("https://localhost:8080/Development/?action=getUserList")
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
