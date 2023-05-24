<template>
  <v-sheet>
    <v-img id="userImage" :src="userImage" />
    <v-text-field :value="userId" readonly></v-text-field>
    <v-text-field v-model="userName" :rules="userNameRule"></v-text-field>
    <v-btn @click="changeUserName">이름 변경</v-btn>
    <v-text-field :value="userEmail" readonly></v-text-field>
    <v-text-field :value="password"></v-text-field>
    <v-text-field :value="newPassword"></v-text-field>
    <v-text-field :value="newPasswordCheck"></v-text-field>
    <v-btn>비말번호 변경</v-btn>
    <div>알림함</div>
  </v-sheet>
</template>

<script>
import axios from "@/util/axios";
import { mapGetters } from "vuex";

export default {
  name: "MyPage",
  components: {},
  data() {
    return {
      userName: "",
      userImage: "",
      userEmail: "",
      password: "",
      newPassword: "",
      newPasswordCheck: "",
      passwordErr: false,
      text: "",
      snackbar: false,
      timeout: 2000,
      userNameRule: [
        (v) => !!v.trim() || "이름은 필수 입력사항입니다.",
        (v) => !(v && v.length >= 30) || "이름은 30자 이상 입력할 수 없습니다.",
        (v) =>
          !/[~!@#$%^&*()_+|<>?:{}]/.test(v) ||
          "이름에는 특수문자를 사용할 수 없습니다.",
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
    changeUserName() {
      //유저 이름 비워놓지 않도록 검사하고
      //이전 이름이랑 같으면 수정하지 않기
      console.log("userName ; " + this.userName);
      axios
        .patch(`/user/modify`, {
          userNo: this.userNo,
          userName: this.userName,
        })
        .then((response) => {
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    changePassword() {
      // 비밀번호 맞는지 규칙 확인
      // 두개 일치하는지 확인
      // 현재 비밀번호 일치하는지 확인
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

<style scoped>
#userImage {
  width: 64px;
  height: auto;
  image-rendering: smooth;
}
</style>
