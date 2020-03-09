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
        item-key="data.id"
        class="elevation-1"
        v-if="showLoader == false"
        @click:row="handleClick"
      >
        <template v-slot:item.checked="{ item }">
          <v-simple-checkbox v-model="item.checked" disabled></v-simple-checkbox>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import LoaderTable from "../loaders/loader_table";
export default {
  name: "Table",
  components: { LoaderTable },
  props: ["headers", "data", "showLoader"],
  data() {
    return {
      search: "",
      selected: []
    };
  },
  methods: {
    deleteItem(item) {
      const index = this.data.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.desserts.splice(index, 1);
    },
    handleClick(value) {
      console.log(value);
      // this.highlightClickedRow(value);
      // this.viewDetails(value);
    }
  }
};
</script>
