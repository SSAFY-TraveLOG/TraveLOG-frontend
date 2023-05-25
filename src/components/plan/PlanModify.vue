<template>
  <v-sheet class="d-flex flex-column">
    <plan-input id="planInput" class="align-self-center" type="modify"/>
  </v-sheet>
</template>

<script>
import PlanInput from "./PlanInput.vue";

export default {
  name: "PlanModify",
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
