<template>
  <v-sheet class="d-flex align-center justify-center" width="100%">
    <plan-input id="planInput" class="align-self-center" />
  </v-sheet>
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

<style scoped>
#planInput {
  width: 50%;
}
</style>
