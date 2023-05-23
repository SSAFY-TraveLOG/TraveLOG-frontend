<template>
  <div>
    <plan-input />
    <button @click="moveRoute">경로 입력하기</button>
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
  methods: {
    moveRoute() {
      this.$router.push({ name: "routeWriter" });
    },
  },
};
</script>

<style scoped></style>
