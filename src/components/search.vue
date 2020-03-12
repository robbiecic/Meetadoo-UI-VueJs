<template>
  <v-autocomplete
    v-model="model"
    :items="items"
    :loading="isLoading"
    :search-input.sync="search"
    :rounded="true"
    chips
    clearable
    hide-details
    hide-selected
    item-text="title"
    item-value="creator"
    label="Search for a meeting or tag..."
    solo
  >
    <template v-slot:no-data>
      <v-list-item>
        <v-list-item-title>
          Search for your
          <strong>minutes</strong>
        </v-list-item-title>
      </v-list-item>
    </template>
    <template v-slot:selection="{ attr, on, item, selected }">
      <v-chip v-bind="attr" :input-value="selected" color="blue-grey" class="white--text" v-on="on">
        <v-icon left>mdi-coin</v-icon>
        <span v-text="item.title"></span>
      </v-chip>
    </template>
    <v-list>
      <v-list-item v-for="item in filteredMinutes" :key="item.id">
        <v-list-item-content>
          <v-list-item-title v-text="item.title"></v-list-item-title>
          <v-list-item-subtitle v-text="item.creator"></v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-autocomplete>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    isLoading: false,
    items: [],
    model: null,
    search: null,
    tab: null
  }),
  mounted: function() {
    this.isLoading = true;
    // Lazily load input items
    axios
      .get(process.env.VUE_APP_ROOT_API + "minutes/?action=GetMyMinutes")
      .then(res => {
        this.items = res.data.minutes_created;
        console.log(this.items);
        // let data = response.data;
        // this.minuteList = data.minutes_created;
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => (this.isLoading = false));
  },
  watch: {
    // model(val) {
    //   if (val != null) this.tab = 0;
    //   else this.tab = null;
    // }
  },
  computed: {
    filteredMinutes() {
      if (!this.search) return this.items;

      const search = this.search.toLowerCase();
      return this.items.filter(item => {
        const text = item.title.toLowerCase();
        //console.log(text);
        return text.indexOf(search) > -1;

        // // Items have already been loaded
        // if (this.items.length > 0) return;
        // console.log("val", val);
        // // this.isLoading = true;
      });
    }
  }
};
</script>
