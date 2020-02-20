<template>
  <v-container>
    <v-row>
      <v-col md="4">
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
      <v-col md="8"></v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "LoaderMinuteList",
  inject: ["theme"],
  data() {},
  components: {},
  computed: {},
  methods: {}
};
</script>
