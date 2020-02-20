<template>
  <v-container>
    <v-sheet :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`" class="px-3 pt-3 pb-3">
      <v-row>
        <v-col>
          <v-skeleton-loader
            class="mx-auto"
            max-width="100%"
            max-height="100%"
            type="list-item-avatar-three-line"
          ></v-skeleton-loader>
          <br />
          <v-skeleton-loader
            class="mx-auto"
            max-width="100%"
            max-height="100%"
            type="list-item-avatar-three-line"
          ></v-skeleton-loader>
          <br />
          <v-skeleton-loader
            class="mx-auto"
            max-width="100%"
            max-height="100%"
            type="list-item-avatar-three-line"
          ></v-skeleton-loader>
          <br />
          <v-skeleton-loader
            class="mx-auto"
            max-width="100%"
            max-height="100%"
            type="list-item-avatar-three-line"
          ></v-skeleton-loader>
          <br />
          <v-skeleton-loader
            class="mx-auto"
            max-width="100%"
            max-height="100%"
            type="list-item-avatar-three-line"
          ></v-skeleton-loader>
        </v-col>
      </v-row>
    </v-sheet>
  </v-container>
</template>
<script>
export default {
  name: "LoaderMinuteList",
  inject: ["theme"],
  data() {
    return {};
  },
  components: {},
  computed: {},
  methods: {}
};
</script>
