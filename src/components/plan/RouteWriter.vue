<template>
  <v-sheet class="d-flex align-center justify-center" width="100%">
    <route-input />
  </v-sheet>
</template>

<script>
import RouteInput from "./RouteInput.vue";
export default {
  name: "RouteWriter",
  components: { RouteInput },
  data() {
    return {
      message: "",
    };
  },
  created() {},
  methods: {},
};
</script>

<style scoped></style>
