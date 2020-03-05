<template>
  <v-app>
    <v-content>
      <ActionsTable />
    </v-content>
  </v-app>
</template>

<script>
import ActionsTable from "../components/actionsTable";
export default {
  name: "ActionsView",
  components: { ActionsTable },
  created: function() {
    // this.userProps = this.user;
  },
  data() {
    return {};
  }
};
</script>
