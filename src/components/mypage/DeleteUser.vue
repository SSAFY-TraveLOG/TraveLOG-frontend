<template>
  <v-sheet class="pa-4 flex align-self-stretch" color="white" elevation="5" height="700px" rounded>
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
        <h5 class="mt-3">비밀번호</h5>
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
        <h5 class="mt-3">비밀번호 확인</h5>
      </v-col>
      <v-col cols="9">
        <v-text-field
          :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show2 ? 'text' : 'password'"
          @click:append="show2 = !show2"
          :rules="passwordCheckRule"
          v-model="passwordCheck"
          counter
          outlined
          dense
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="d-flex ml-1 mr-1">
      <v-col class="d-flex align-center justify-end">
        <v-btn @click="delUser">삭제</v-btn>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script>
import axios from "@/util/axios";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "DeleteUser",
  components: {},
  data() {
    return {
      curPassword: "",
      passwordCheck: "",
      userName: "",
      userImage: "",
      userEmail: "",
      show1: false,
      show2: false,
      show3: false,
      passwordCheckRule: [
        (v) => !(v != this.curPassword) || "비밀번호와 비밀번호 확인이 다릅니다.",
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
    ...mapActions(["logoutApi"]),
    delUser() {
      if (this.curPassword == "") {
        alert("비밀번호를 입력해주세요.");
        return;
      } else if (this.curPassword != this.passwordCheck) {
        alert("비밀번호와 비밀번호 확인 값이 다릅니다.");
        return;
      }

      axios
        .patch(`/user/delete`, {
          userNo: this.userNo,
          password: this.curPassword,
        })
        .then((response) => {
          if (response.data == "") {
            alert("잘못된 비밀번호입니다.");
          } else {
            alert("회원 탈퇴 되었습니다.");
            this.logoutApi();
            this.$router.push("/");
          }
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
