<template>
  <!-- <v-card @click="planDetail">
    <v-card-title>
      {{ plan.title }}
    </v-card-title>
    <v-card-text>
      {{ plan.description }}
    </v-card-text>
    <v-card-text>
      {{ plan.sidoName }}
    </v-card-text>
    <v-card-text>

    </v-card-text>
  </v-card> -->
  <v-card class="mx-auto" max-width="400">
    <v-img
      class="white--text align-end"
      height="150px"
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
    >
      <v-card-title>{{ plan.title }}</v-card-title>
    </v-img>

    <v-card-subtitle class="pb-0">
      {{ plan.startDate.substring(0, 10) }} ~
      {{ plan.endDate.substring(0, 10) }}
    </v-card-subtitle>

    <v-card-text class="text--primary">
      <div>{{ plan.description }}</div>
    </v-card-text>

    <v-card-actions>
      <v-btn color="blue" text> 살펴보기 </v-btn>
      <v-btn color="green" text> 수정하기 </v-btn>
      <v-btn color="red" text @click="deletePlan"> 삭제하기 </v-btn>
    </v-card-actions>
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
  created() {},
  methods: {
    planDetail() {
      this.$router.push({
        name: "planDetail",
        params: { planNo: this.plan.planNo },
      });
    },
    deletePlan() {
      this.$router.push({
        name: "planDelete",
        params: { planNo: this.plan.planNo },
      });
    },
  },
};
</script>

<style scoped></style>
