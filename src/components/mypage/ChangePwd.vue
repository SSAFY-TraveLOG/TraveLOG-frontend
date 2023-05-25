<template>
  <v-sheet
    class="pa-4 flex align-self-stretch"
    color="white"
    elevation="5"
    height="700px"
    rounded
  >
    <v-row class="d-flex">
      <v-col class="d-flex align-center justify-center" cols="2">
        <v-img contain height="80px" id="userImage" :src="userImage" />
      </v-col>
      <v-col class="d-flex align-center" cols="6">
        <h1>{{ this.userId }}</h1>
      </v-col>
    </v-row>
    <v-row class="d-flex ml-1 mr-1">
      <v-col cols="3">
        <h5 class="mt-3">현재 비밀번호</h5>
      </v-col>
      <v-col cols="9">
        <v-text-field
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show1 ? 'text' : 'password'"
          @click:append="show1 = !show1"
          v-model="curPassword"
          counter
          outlined
          dense
        ></v-text-field>
      </v-col>
    </v-row>
    <v-divider class="mt-2 mb-2"></v-divider>
    <v-row class="d-flex ml-1 mr-1">
      <v-col cols="3">
        <h5 class="mt-3">변경 비밀번호</h5>
      </v-col>
      <v-col cols="9">
        <v-text-field
          :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show2 ? 'text' : 'password'"
          @click:append="show2 = !show2"
          :rules="passwordRule"
          v-model="newPassword"
          counter
          outlined
          dense
        ></v-text-field>
      </v-col>
    </v-row>
    <v-divider class="mt-2 mb-2"></v-divider>
    <v-row class="d-flex ml-1 mr-1">
      <v-col cols="3">
        <h5 class="mt-3">비밀번호 확인</h5>
      </v-col>
      <v-col cols="9">
        <v-text-field
          :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show3 ? 'text' : 'password'"
          :rules="passwordCheckRule"
          @click:append="show3 = !show3"
          v-model="newCheckPassword"
          counter
          outlined
          dense
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="d-flex ml-1 mr-1">
      <v-col class="d-flex align-center justify-end">
        <v-btn @click="changePassword">변경</v-btn>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script>
import axios from "@/util/axios";
import { mapGetters } from "vuex";

export default {
  name: "ChangePwd",
  components: {},
  data() {
    return {
      curPassword: "",
      newPassword: "",
      newCheckPassword: "",
      userName: "",
      userImage: "",
      userEmail: "",
      show1: false,
      show2: false,
      show3: false,
      passwordRule: [
        (v) =>
          !(v && (v.length < 8 || v.length > 16)) ||
          "비밀번호는 8자리 이상, 16자리 이하의 영문자, 숫자, 특수문자가 포함되어야 합니다.",
        (v) =>
          /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/.test(
            v
          ) ||
          "비밀번호는 8자리 이상, 16자리 이하의 영문자, 숫자, 특수문자가 포함되어야 합니다.",
      ],
      passwordCheckRule: [
        (v) =>
          !(v != this.newPassword) ||
          "새로운 비밀번호와 비밀번호 확인이 다릅니다.",
      ],
    };
  },
  created() {
    axios.get(`/user/${this.userNo}`).then((response) => {
      const data = response.data.data;
      this.userName = data.userName;
      this.userImage = data.image;
      this.userEmail = data.emailId + "@" + data.emailDomain;
    });
  },
  methods: {
    changePassword() {
      if (this.curPassword == "") {
        alert("현재 비밀번호를 입력해주세요.");
        return;
      } else if (this.newPassword == "") {
        alert("변경할 비밀번호를 입력해주세요.");
        return;
      } else if (this.newCheckPassword != this.newPassword) {
        alert("비밀번호를 확인해주세요.");
        return;
      }

      axios
        .post(`/user/check/password`, {
          userNo: this.userNo,
          password: this.curPassword,
        })
        .then((response) => {
          if (response.data.data == false) {
            alert("현재 비밀번호가 잘못되었습니다.");
          } else {
            axios
              .patch(`/user/modify`, {
                userNo: this.userNo,
                password: this.newPassword,
              })
              .then((response) => {
                console.log(response.data);
                if (response.data.data == 1) {
                  alert("비밀번호 변경이 완료되었습니다.");
                } else {
                  alert("비밀번호 변경이 실패했습니다.");
                }
              });
          }
          this.curPassword = "";
          this.newPassword = "";
          this.newCheckPassword = "";
        });
    },
  },
  computed: {
    ...mapGetters({
      userNo: "getUserNo",
      userId: "getUserId",
    }),
  },
};
</script>