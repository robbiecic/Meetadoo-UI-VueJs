<template>
  <v-autocomplete
    v-model="guests"
    :disabled="isUpdating"
    :items="people"
    filled
    chips
    color="blue-grey lighten-2"
    label="Select"
    item-text="name"
    item-value="name"
    multiple
  >
    <template v-slot:selection="data">
      <v-chip
        v-bind="data.attrs"
        :input-value="data.selected"
        close
        @click="data.select"
        @click:close="remove(data.item)"
      >
        <v-avatar left color="teal" size="15">
          <span class="white--text">{{ data.item.avatar }}</span>
        </v-avatar>
        {{ data.item.name }}
      </v-chip>
    </template>
    <template v-slot:item="data">
      <template v-if="typeof data.item !== 'object'">
        <v-list-item-content v-text="data.item"></v-list-item-content>
      </template>
      <template v-else>
        <v-list-item-avatar color="indigo" size="36">
          <span class="white--text headline">{{ data.item.avatar }}</span>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title v-html="data.item.name"></v-list-item-title>
        </v-list-item-content>
      </template>
    </template> </v-autocomplete
></template>

<script>
//import axios from "axios";

export default {
  name: "PeoplePicker",
  props: ["guests"],
  data() {
    return {
      isUpdating: false,
      people: [
        { name: "test6@test.com", group: "Group 1", avatar: "TS" },
        { name: "Ali Connors", group: "Group 1", avatar: "AC" },
        { name: "Trevor Hansen", group: "Group 1", avatar: "TH" },
        { name: "Tucker Smith", group: "Group 1", avatar: "TS" }
      ],
      componentVisible: false,
      shaped: false,
      outlined: true,
      rounded: true,
      solo: false,
      singleLine: false,
      filled: false
    };
  },
  watch: {
    isUpdating(val) {
      if (val) {
        setTimeout(() => (this.isUpdating = false), 3000);
      }
    }
  },
  methods: {
    remove(item) {
      const index = this.guests.indexOf(item.name);
      console.log("index", index);
      if (index >= 0) this.guests.splice(index, 1);
    }
  }
};
</script>
<style scoped></style>
