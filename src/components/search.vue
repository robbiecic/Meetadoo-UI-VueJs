<template>
  <v-autocomplete
    v-model="selected"
    :items="items"
    :loading="isLoading"
    :search-input.sync="search"
    :rounded="true"
    :filter="filterObject"
    clearable
    hide-details
    hide-selected
    item-text="title"
    item-value="id"
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
  </v-autocomplete>
</template>

<script>
import axios from "axios";

export default {
  name: "Search",
  data: () => ({
    isLoading: false,
    items: [],
    selected: null,
    search: null,
    tab: null
  }),
  watch: {
    selected(meeting_id) {
      //navigate to minutes page and pass meeting_id
      this.$router.push({
        name: "MinutesView",
        params: { meetingID: meeting_id }
      });
    }
  },
  mounted: function() {
    this.isLoading = true;
    axios
      .get(process.env.VUE_APP_ROOT_API + "minutes/?action=GetMyMinutes")
      .then(res => {
        this.items = res.data.minutes_created;
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => (this.isLoading = false));
  },
  methods: {
    filterObject(item, queryText) {
      return item.title.toLowerCase().indexOf(queryText.toLowerCase()) > -1;
    }
  }
};
</script>
