<template>
  <v-model>
    <input v-model="message" placeholder="edit me" />
    <p>Message is: {{ message }}</p>
  </v-model>
</template>
<script>
export default {
  data() {
    return {
      message: ""
    };
  }
};
</script>
