<template>
  <v-container>
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <LoaderTable v-if="showLoader == true" />
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="dataLocal"
        :sortable="true"
        :search="search"
        item-key="dataLocal.id"
        class="elevation-1"
        v-if="showLoader == false"
      ></v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import LoaderTable from "../loaders/loader_table";
export default {
  name: "Table",
  components: { LoaderTable },
  props: ["headers", "data"],
  data() {
    return {
      search: "",
      showLoader: false,
      selected: [],
      dataLocal: []
    };
  },
  mounted: function() {
    console.log("headers", this.headers);
    console.log("data", this.data);
    this.dataLocal = this.data;
  },
  updated: function() {
    console.log("headers", this.headers);
    console.log("data", this.data);
    this.dataLocal = this.data;
  },
  methods: {}
};
</script>
