<template>
  <v-sheet
    class="ma-5 pa-4 d-flex flex-column"
    color="white"
    elevation="5"
    min-height="800px"
    rounded
  >
    <h1 class="align-self-center mb-5">여행계획</h1>
    <v-btn @click="moveWrite">만들기</v-btn>

    <h1>지난 여행</h1>
    <v-sheet class="travel">
      <horizontal-scroll class="horizontal-scroll">
        <div v-if="previousPlans.length">
          <div class="outer" v-for="previousPlan in previousPlans" :key="previousPlan.planNo">
            <PlanCard :plan="previousPlan"/>
          </div>
        </div>
        <div v-else>
          <div>여행 계획이 없습니다</div>
        </div>
      </horizontal-scroll>
    </v-sheet>

    <h1 class="align-self-center mb-5">앞으로의 여행</h1>
    <v-sheet class="travel">
      <horizontal-scroll class="horizontal-scroll">
        <div v-if="futurePlans.length">
          <div class="outer" v-for="futurePlan in futurePlans" :key="futurePlan.planNo">
            <PlanCard :plan="futurePlan"/>
          </div>
        </div>
        <div v-else>
          <div>여행 계획이 없습니다</div>
        </div>
      </horizontal-scroll>
    </v-sheet>
  </v-sheet>
</template>

<script>
import axios from "@/util/axios";
import { mapGetters } from "vuex";
import HorizontalScroll from "vue-horizontal-scroll";
import "vue-horizontal-scroll/dist/vue-horizontal-scroll.css";
import PlanCard from "@/components/plan/PlanCard";

export default {
  name: "planList",
  components: {
    HorizontalScroll,
    PlanCard,
  },
  data() {
    return {
      previousPlans: [],
      futurePlans: [],
    }
  },
  created() {
    this.previousPlans.splice(0);
    this.futurePlans.splice(0);
    console.log(this.userNo);
    axios.get(`/plan/list/${this.userNo}`)
    .then(({data}) => {
      const currentDate = new Date();
      data.data.forEach(plan => {
        if (new Date(plan.endDate) < currentDate) {
          this.previousPlans.push(plan);
        } else {
          this.futurePlans.push(plan);
        }
      });
    });
  },
  computed: {
    ...mapGetters({ userNo: "getUserNo" }),
  },
  methods: {
    moveWrite() {
      this.$router.push({ name: "planWriter" });
    }
  }
};
</script>

<style>
.travel {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.horizontal-scroll {
  display: flex;
  width: 100%;
  height: 300px;
}

.outer {
  display: flex;
  flex: 1;
  width: auto;
  height: 100%;
  padding: 0 20px;
  flex-flow: row nowrap;
  align-items: center;
}

.inner-content {
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: calc(100% - 40px);
  border: solid 1px #2c3e50;
  border-radius: 5px;
}

.inner-content:not(:first-of-type) {
  margin-left: 30px;
}
</style>
