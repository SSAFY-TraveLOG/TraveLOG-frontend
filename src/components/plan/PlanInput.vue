<template>
  <div>
    <div>
      <v-text-field
        label="여행 제목 *"
        variant="underlined"
        :rules="travelTitleRule"
      ></v-text-field>
      <v-radio-group v-model="authority">
        <v-radio value="1">
          <template v-slot:label>
            <div>
              <!-- <font-awesome-icon color="blue" icon="fa-solid fa-lock" /> -->
              Public
            </div>
          </template>
        </v-radio>
        <v-radio value="0">
          <template v-slot:label>
            <div>Private</div>
          </template>
        </v-radio>
      </v-radio-group>
      <template>
        <v-row>
          <v-col cols="12" sm="6">
            <v-date-picker
              v-model="dates"
              range
              no-title="true"
            ></v-date-picker>
          </v-col>
          <v-col cols="12" sm="6"> </v-col>
        </v-row>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlanInput",
  components: {},
  data() {
    return {
      dates: [],
      weekdays: [0, 1, 2, 3, 4, 5, 6],
      travelTitle: "",
      travelTitleRule: [
        (v) => !!v.trim() || "여행 제목은 필수 입력사항입니다.",
        (v) =>
          !(v && v.length >= 30) || "여행 제목은 30자 이상 입력할 수 없습니다.",
      ],
    };
  },
  created() {},
  methods: {
    checkTravelTitle() {
      if (!this.travelTitle || this.travelTitle.length > 30) {
        this.travelTitleErr = true;
      } else {
        this.travelTitleErr = false;
      }
    },
  },
  computed: {
    dateRangeText() {
      return this.dates.join(" ~ ");
    },
  },
};
</script>

<style scoped></style>
