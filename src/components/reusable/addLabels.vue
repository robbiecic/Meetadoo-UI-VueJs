<template>
  <v-container fluid>
    <v-combobox
      v-model="model"
      :filter="filter"
      :hide-no-data="!search"
      :items="items"
      :search-input.sync="search"
      :rounded="true"
      :outlined="true"
      hide-selected
      label="Tag something to link meetings together..."
      multiple
      small-chips
      solo
    >
      <template v-slot:no-data>
        <v-list-item>
          <span class="subheading">Create</span>
          <v-chip :color="`${colors[nonce - 1]} lighten-3`" label small>
            {{
            search
            }}
          </v-chip>
        </v-list-item>
      </template>
      <template v-slot:selection="{ attrs, item, parent, selected }">
        <v-chip
          v-if="item === Object(item)"
          v-bind="attrs"
          :color="`${item.color} lighten-3`"
          :input-value="selected"
          label
          small
          @click:close="parent.selectItem(item)"
          close
        >
          <span class="pr-2">{{ item.text }}</span>
        </v-chip>
      </template>
      <template v-slot:item="{ index, item }">
        <v-text-field
          v-if="editing === item"
          v-model="editing.text"
          autofocus
          flat
          background-color="transparent"
          hide-details
          solo
          @keyup.enter="edit(index, item)"
        ></v-text-field>
        <v-chip v-else :color="`${item.color} lighten-3`" dark label small>
          {{
          item.text
          }}
        </v-chip>
        <v-spacer></v-spacer>
        <v-list-item-action @click.stop>
          <v-btn icon @click.stop.prevent="edit(index, item)">
            <v-icon>{{ editing !== item ? "mdi-pencil" : "mdi-check" }}</v-icon>
          </v-btn>
        </v-list-item-action>
      </template>
    </v-combobox>
  </v-container>
</template>
<script>
export default {
  name: "AddLabels",
  props: ["modelProps", "meetingID"],
  data: () => ({
    activator: null,
    attach: null,
    colors: ["green", "purple", "indigo", "cyan", "teal", "orange"],
    editing: null,
    index: -1,
    items: [{ header: "Select an option or create one" }],
    nonce: 1,
    menu: false,
    model: [],
    x: 0,
    search: null,
    y: 0
  }),

  watch: {
    meetingID() {
      //When selected meeting ID changes, reset the history
      this.items = [{ header: "Select an option or create one" }];
      this.model = [];
    },
    modelProps(val) {
      this.model = val;
    },
    model(val, prev) {
      if (typeof prev == "undefined") {
        prev = [];
      }
      if (val.length === prev.length) return;
      //Update Model
      this.model = val.map(v => {
        if (typeof v === "string") {
          v = {
            text: v,
            color: this.colors[this.nonce - 1]
          };

          //this.items.push(v);
          //console.log(this.items);
          this.nonce++;
        }

        return v;
      });
    }
  },

  methods: {
    edit(index, item) {
      if (!this.editing) {
        this.editing = item;
        this.index = index;
      } else {
        this.editing = null;
        this.index = -1;
      }
    },
    filter(item, queryText, itemText) {
      if (item.header) return false;

      const hasValue = val => (val != null ? val : "");

      const text = hasValue(itemText);
      const query = hasValue(queryText);

      return (
        text
          .toString()
          .toLowerCase()
          .indexOf(query.toString().toLowerCase()) > -1
      );
    }
  }
};
</script>
