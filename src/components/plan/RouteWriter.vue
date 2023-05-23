<template>
  <div>
    <route-input />
  </div>
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
