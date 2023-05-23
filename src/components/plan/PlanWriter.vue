<template>
  <div>
    <plan-input />
  </div>
</template>

<script>
import PlanInput from "./PlanInput.vue";
export default {
  name: "PlanWriter",
  components: { PlanInput },
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
