<template>
  <v-card class="mx-auto" max-width="400">
    <v-img class="white--text align-end" height="150px" :src="plan.thumbnail">
      <v-card-title>{{ plan.title }}</v-card-title>
      <v-card-subtitle>{{ plan.sidoName }}</v-card-subtitle>
    </v-img>

    <v-card-subtitle class="pb-0">
      {{ plan.startDate.substring(0, 10) }} ~
      {{ plan.endDate.substring(0, 10) }}
    </v-card-subtitle>

    <v-card-text class="text--primary">
      <div>{{ plan.description }}</div>
    </v-card-text>

    <v-card-actions>
      <v-btn v-if="!type" color="blue" text @click="planDetail">
        살펴보기
      </v-btn>
      <v-btn v-if="type" color="green" text @click="modifyPlan">
        수정하기
      </v-btn>
      <v-btn color="red" text @click="deletePlan"> 삭제하기 </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "planCard",
  props: {
    plan: Object,
    type: Boolean,
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    ...mapActions(["setPlanNo", "setPlanHandle"]),
    planDetail() {
      this.setPlanNo(this.plan.planNo);
      this.setPlanHandle("detail");

      this.$router.push({
        name: "planModify",
        params: { planNo: this.plan.planNo },
      });
    },
    deletePlan() {
      this.setPlanHandle("delete");
      this.$router.push({
        name: "planDelete",
        params: { planNo: this.plan.planNo },
      });
    },
    modifyPlan() {
      this.setPlanNo(this.plan.planNo);
      this.setPlanHandle("modify");

      this.$router.push({
        name: "planModify",
        params: { planNo: this.plan.planNo },
      });
    },
  },
};
</script>

<style scoped></style>
