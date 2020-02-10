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
        <v-avatar left>
          <v-img :src="data.item.avatar"></v-img>
        </v-avatar>
        {{ data.item.name }}
      </v-chip>
    </template>
    <template v-slot:item="data">
      <template v-if="typeof data.item !== 'object'">
        <v-list-item-content v-text="data.item"></v-list-item-content>
      </template>
      <template v-else>
        <v-list-item-avatar>
          <img :src="data.item.avatar" />
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
    const srcs = {
      1: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
      2: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
      3: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
      4: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
      5: "https://cdn.vuetifyjs.com/images/lists/5.jpg"
    };
    return {
      friends: ["Sandra Adams", "Britta Holt"],
      isUpdating: false,
      people: [
        { header: "Group 1" },
        { name: "test6@test.com", group: "Group 1", avatar: srcs[1] },
        { name: "Ali Connors", group: "Group 1", avatar: srcs[2] },
        { name: "Trevor Hansen", group: "Group 1", avatar: srcs[3] },
        { name: "Tucker Smith", group: "Group 1", avatar: srcs[2] }
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
      const index = this.friends.indexOf(item.name);
      if (index >= 0) this.friends.splice(index, 1);
    }
  }
};
</script>
<style scoped></style>
