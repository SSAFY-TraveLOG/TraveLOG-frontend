<template>
  <v-sheet class="d-flex flex-column mt-4" width="80%">
    <h1 class="align-self-center mb-5">여행 계획 작성</h1>
    <v-text-field
      label="여행 제목 *"
      variant="underlined"
      v-model="title"
      :rules="titleRule"
    ></v-text-field>
    <v-textarea
      label="메모"
      variant="outlined"
      v-model="description"
      height="100px"
    ></v-textarea>
    <v-divider class="mb-3"></v-divider>
    <h4>보기 권한</h4>
    <v-radio-group v-model="authority" mandatory>
      <v-radio value="1">
        <template v-slot:label>
          <div>
            <font-awesome-icon :icon="['fas', 'user']" />
            Public
          </div>
        </template>
      </v-radio>
      <v-radio value="0">
        <template v-slot:label>
          <div><font-awesome-icon :icon="['fas', 'lock']" /> Private</div>
        </template>
      </v-radio>
    </v-radio-group>
    <v-divider></v-divider>
    <v-sheet class="d-flex flex-column mt-3 justify-center">
      <v-container class="fill-height">
        <v-row>
          <v-col>
            <v-card>
                <v-col class="d-flex flex-column align-center">
                  <h4>날짜 선택하기</h4>
                  <v-date-picker
                    class="align-self-center"
                    v-model="dates"
                    no-title
                    range
                  ></v-date-picker>
                </v-col>
            </v-card>
          </v-col>
          <v-col>
              <v-card>
                <v-card-title class="d-flex" width="100%">
                  <v-text-field
                    v-model="search"
                    label="유저 검색하기"
                    single-line
                    hide-details
                    dense
                  ></v-text-field>
                </v-card-title>
                <v-data-table
                  v-show="search != ''"
                  v-model="selectedUsers"
                  :headers="headers"
                  :items="users"
                  :single-select="false"
                  item-key="userId"
                  :search="search"
                  show-select
                  hide-default-footer
                ></v-data-table>
              </v-card>
          </v-col>
          <v-col>
            <v-sheet>
              <v-select
                v-model="sidoCode"
                hide-details="true"
                label="시도"
                :items="sidos"
                item-text="sido"
                item-value="code"
                solo
                @change="getGuguns()"
              >
              </v-select>
            </v-sheet>
            <v-sheet>
              <v-select
                v-model="gugunCode"
                hide-details="true"
                label="구군"
                :items="guguns"
                item-text="gugunName"
                item-value="gugunCode"
                solo
              >
              </v-select>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>
    <v-btn color="rgb(107, 196, 255)" @click="moveRoute">다음단계</v-btn>
  </v-sheet>
</template>

<script>
import { mapActions } from "vuex";
import axios from "@/util/axios";
export default {
  name: "PlanInput",
  components: {},
  data() {
    return {
      dates: [],
      users: [],
      selectedUsers: [],
      authority: 1,
      weekdays: [0, 1, 2, 3, 4, 5, 6],
      title: "",
      description: "",
      search: "",
      noTitle: true,
      headers: [
        {
          value: "userId",
          text: "아이디",
        },
        { value: "userName", text: "이름" },
      ],
      titleRule: [
        (v) => !!v.trim() || "여행 제목은 필수 입력사항입니다.",
        (v) =>
          !(v && v.length >= 30) || "여행 제목은 30자 이상 입력할 수 없습니다.",
      ],
      sidos: [
        {
          sido: "서울",
          code: 1,
        },
        {
          sido: "인천",
          code: 2,
        },
        {
          sido: "대전",
          code: 3,
        },
        {
          sido: "대구",
          code: 4,
        },
        {
          sido: "광주",
          code: 5,
        },
        {
          sido: "부산",
          code: 6,
        },
        {
          sido: "울산",
          code: 7,
        },
        {
          sido: "세종특별자치시",
          code: 8,
        },
        {
          sido: "경기도",
          code: 31,
        },
        {
          sido: "강원도",
          code: 32,
        },
        {
          sido: "충청북도",
          code: 33,
        },
        {
          sido: "충청남도",
          code: 34,
        },
        {
          sido: "경상북도",
          code: 35,
        },
        {
          sido: "경상남도",
          code: 36,
        },
        {
          sido: "전라북도",
          code: 37,
        },
        {
          sido: "전라남도",
          code: 38,
        },
        {
          sido: "제주도",
          code: 39,
        },
      ],
      guguns: [],
      sidoCode: null,
      gugunCode: null,
    };
  },
  created() {
    axios.get(`/user`).then((response) => {
      this.users = response.data.data.map((item) => ({
        userNo: item.userNo,
        userName: item.userName,
        userId: item.userId,
      }));
    });
  },
  methods: {
    ...mapActions([
      "setTravelTitle",
      "setTravelDescription",
      "setTravelAuthority",
      "setTravelDate",
      "setTravelParticipants",
      "setTravelSidoCode",
      "setTravelGugunCode",
    ]),
    moveRoute() {
      if (!this?.dates?.length) {
        alert("날짜를 선택해주세요");
        return;
      }
      this.setTravelTitle(this.title);
      this.setTravelDescription(this.description);
      this.setTravelAuthority(this.authority);
      this.setTravelDate(this.dates.sort());
      this.setTravelParticipants(
        this.selectedUsers.filter((user) => user.userNo != this.userNo)
      );
      this.setTravelSidoCode(this.sidoCode);
      this.setTravelGugunCode(this.gugunCode);
      this.$router.push({ name: "routeWriter" });
    },
    getGuguns() {
      axios.get(`/attraction/sido/${this.sidoCode}`).then(({ data }) => {
        this.guguns = data.data;
      });
    },
  },
};
</script>

<style scoped></style>
