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
        :items="data"
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
      selected: []
    };
  },
  methods: {}
};
</script>
