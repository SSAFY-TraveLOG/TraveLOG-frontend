<template>
  <v-sheet
    class="ma-5 pa-4 d-flex flex-column"
    color="white"
    elevation="5"
    width="80%"
    min-height="800px"
    rounded
  >
    <v-sheet class="d-flex align-center justify-center">
      <v-img
        src="https://seoul16travelog.s3.ap-northeast-2.amazonaws.com/Plan.png"
        height="400px"
        contain
      >
        <div id="planMainText">여행, 어디로 떠나시나요?</div>
        <v-btn
          class="create-plan-button"
          color="transparent"
          @click="moveWrite"
        >
          <div>나만의 여행 계획 만들기</div>
        </v-btn>
      </v-img>
    </v-sheet>
    <div id="previousPlan">지난 여행</div>
    <v-sheet class="travel">
      <horizontal-scroll class="horizontal-scroll">
        <div class="outer" v-if="previousPlans.length">
          <div
            class="inner-content"
            v-for="previousPlan in previousPlans"
            :key="previousPlan.planNo"
          >
            <PlanCard :plan="previousPlan" :type="!future"/>
          </div>
        </div>
        <div v-else>
          <div>여행 계획이 없습니다</div>
        </div>
      </horizontal-scroll>
    </v-sheet>

    <div id="futurePlan">앞으로의 여행</div>
    <v-sheet class="travel">
      <horizontal-scroll class="horizontal-scroll">
        <div class="outer" v-if="futurePlans.length">
          <div
            class="inner-content"
            v-for="futurePlan in futurePlans"
            :key="futurePlan.planNo"
          >
            <PlanCard :plan="futurePlan" :type="future"/>
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
      future: true,
    };
  },
  created() {
    this.previousPlans.splice(0);
    this.futurePlans.splice(0);
    axios.get(`/plan/list/${this.userNo}`).then(({ data }) => {
      const currentDate = new Date();
      let curDate = currentDate.getFullYear() + "-";
      if (currentDate.getMonth() + 1 < 10) {
        curDate += "0";
      }
      curDate += currentDate.getMonth() + 1 + "-" + currentDate.getDate();
      console.log(data.data);
      data.data.forEach((plan) => {
        plan.thumbnail =
          "https://seoul16travelog.s3.ap-northeast-2.amazonaws.com/";
        if (plan.sidoName.startsWith("서울")) {
          plan.thumbnail += "RegionThumbnailSeoul.png";
        } else if (plan.sidoName.startsWith("인천")) {
          plan.thumbnail += "RegionThumbnailIncheon.png";
        } else if (plan.sidoName.startsWith("대전")) {
          plan.thumbnail += "RegionThumbnailDaejeon.png";
        } else if (plan.sidoName.startsWith("대구")) {
          plan.thumbnail += "RegionThumbnailDaegu.png";
        } else if (plan.sidoName.startsWith("광주")) {
          plan.thumbnail += "RegionThumbnailGwangju.png";
        } else if (plan.sidoName.startsWith("부산")) {
          plan.thumbnail += "RegionThumbnailBusan.png";
        } else if (plan.sidoName.startsWith("울산")) {
          plan.thumbnail += "RegionThumbnailUlsan.png";
        } else if (plan.sidoName.startsWith("세종특별자치시")) {
          plan.thumbnail += "RegionThumbnailSejong.png";
        } else if (plan.sidoName.startsWith("경기도")) {
          plan.thumbnail += "RegionThumbnailKyeonggi.png";
        } else if (plan.sidoName.startsWith("충청")) {
          plan.thumbnail += "RegionThumbnailChungCheong.png";
        } else if (plan.sidoName.startsWith("경상")) {
          plan.thumbnail += "RegionThumbnailKyeongsang.png";
        } else if (plan.sidoName.startsWith("전라")) {
          plan.thumbnail += "RegionThumbnailJeollado.png";
        } else if (plan.sidoName.startsWith("제주도")) {
          plan.thumbnail += "RegionThumbnailJeju.png";
        } else if (plan.sidoName.startsWith("강원도")) {
          plan.thumbnail += "RegionThumbnailKangwon.png";
        }

        if (plan.endDate < curDate) {
          this.previousPlans.push(plan);
        } else {
          this.futurePlans.push(plan);
        }
      });
      this.previousPlans.sort(function (a, b) {
        return b.endDate.localeCompare(a.endDate);
      });
      this.futurePlans.sort(function (a, b) {
        return a.startDate.localeCompare(b.startDate);
      });
    });
  },
  computed: {
    ...mapGetters({ userNo: "getUserNo" }),
  },
  methods: {
    moveWrite() {
      this.$router.push({ name: "planWriter" });
    },
  },
};
</script>

<style>
.travel {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
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
  width: 400px;
  height: 100%;
}

.inner-content:not(:first-of-type) {
  margin-left: 30px;
}

.create-plan-button {
  position: absolute;
  transform: translate(-50%, -50%);
  font-weight: 700;
  top: 50%;
  left: 26%;
}

#planMainText {
  position: absolute;
  transform: translate(-50%, -50%);
  font-size: 30px;
  font-weight: 900;
  top: 35%;
  left: 30%;
}

#previousPlan {
  margin-left: 20px;
  font-size: 30px;
  font-weight: 900;
  margin-top: 60px;
  color: #2c3e50;
}

#futurePlan {
  margin-left: 20px;
  font-size: 30px;
  font-weight: 900;
  margin-top: 60px;
  color: #0091ea;
}
</style>
