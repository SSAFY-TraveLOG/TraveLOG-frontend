<template>
  <v-card @click="planDetail">
    <v-card-title>
      {{ plan.title }}
    </v-card-title>
    <v-card-text>
      {{ plan.description }}
    </v-card-text>
    <v-card-text> {{ plan.startDate }} ~ {{ plan.endDate }} </v-card-text>
    <v-card-text>
      {{ plan.sidoName }}
    </v-card-text>
    <v-card-text>
      {{ plan.authority }}
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "planCard",
  props: {
    plan: Object,
  },
  data() {
    return {};
  },
  created() {
  },
  methods: {
    planDetail() {
      this.$router.push({
        name: "planDetail",
        params: { planNo: this.plan.planNo },
      });
    },
  },
};
</script>

<style scoped></style>
