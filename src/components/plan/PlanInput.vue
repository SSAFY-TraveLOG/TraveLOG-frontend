<template>
  <div>
    <h4>여행 제목</h4>
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
    <v-divider></v-divider>
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
    <v-sheet class="d-flex flex-column ma-10">
      <v-container class="fill-height">
        <v-row>
          <v-col>
            <v-card>
              <v-row align="center" justify="center">
                <v-col cols="12" sm="6" md="9">
                  <h4>날짜 선택하기</h4>
                  <v-date-picker
                    class="align-self-center"
                    v-model="dates"
                    no-title
                    range
                  ></v-date-picker>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <v-col>
            <v-card>
              <v-card-title>
                <v-text-field
                  v-model="search"
                  label="유저 검색하기"
                  single-line
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
        </v-row>
      </v-container>
    </v-sheet>
    <button @click="moveRoute">다음단계</button>
  </div>
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
    ]),
    moveRoute() {
      this.setTravelTitle(this.title);
      this.setTravelDescription(this.description);
      this.setTravelAuthority(this.authority);
      this.setTravelDate(this.dates.sort());
      this.setTravelParticipants(this.selectedUsers);
      this.$router.push({ name: "routeWriter" });
    },
  },
};
</script>

<style scoped></style>
