<template>
  <div>
    <div>{{ travelDate }}</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "RouteInput",
  components: {},
  data() {
    return {
      message: "",
    };
  },
  created() {},
  methods: {},
  computed: {
    ...mapGetters({ travelDate: "getTravelDate" }),
  },
};
</script>

<style scoped></style>
