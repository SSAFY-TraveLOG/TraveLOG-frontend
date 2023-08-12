<template>
  <v-app id="inspire">
    <v-main class="blue-white lighten-4">
      <v-container style="max-width: 450px" fill-height>
        <v-layout align-center row wrap>
          <v-flex xs12>
            <v-card>
              <div class="pa-10">
                <h1 style="text-align: center" class="mb-10">회원가입</h1>
                <form>
                  <v-text-field
                    label="아이디"
                    placeholder="아이디를 입력하세요."
                    :rules="userIdRule"
                    v-model="userId"
                  ></v-text-field>
                  <v-text-field
                    label="이름"
                    placeholder="이름을 입력하세요."
                    :rules="userNameRule"
                    v-model="userName"
                  >
                  </v-text-field>
                  <v-text-field
                    type="password"
                    label="비밀번호"
                    :rules="passwordRule"
                    placeholder="비밀번호를 입력하세요."
                    v-model="password"
                  >
                  </v-text-field>
                  <v-text-field
                    type="email"
                    label="이메일"
                    :rules="emailRule"
                    placeholder="이메일을 입력하세요."
                    v-model="email"
                  >
                  </v-text-field>
                  <v-btn
                    color="blue lighten-1 text-capitalize"
                    depressed
                    large
                    block
                    dark
                    class="mb-3"
                    @click="join"
                  >
                    회원가입
                  </v-btn>
                </form>
                <v-snackbar v-model="snackbar" :timeout="timeout">
                  {{ text }}

                  <template v-slot:action="{ attrs }">
                    <v-btn
                      color="blue"
                      text
                      v-bind="attrs"
                      @click="snackbar = false"
                    >
                      Close
                    </v-btn>
                  </template>
                </v-snackbar>
              </div>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from "@/util/axios";
export default {
  name: "JoinPage",
  components: {},
  data() {
    return {
      userId: "",
      password: "",
      userName: "",
      email: "",
      userIdErr: false,
      passwordErr: false,
      userNameErr: false,
      emailErr: false,
      userIdText: "ID를 체크해주세요",
      userNameText: "이름을 체크해주세요",
      passwordText: "비밀번호를 체크해주세요",
      emailText: "이메일을 체크해주세요",
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
      userIdRule: [
        (v) => !!v.trim() || "아이디는 필수 입력사항입니다.",
        (v) =>
          /^[a-zA-Z][0-9a-zA-Z]{3,19}$/.test(v) ||
          "아이디는 4자리 이상, 20자리 이하로 영대소문자, 숫자를 사용할 수 있으며 숫자로 시작할 수 없습니다.",
      ],
      passwordRule: [
        (v) => !!v.trim() || "비밀반호는 필수 입력사항입니다.",
        (v) =>
          /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/.test(
            v
          ) ||
          "비밀번호는 8자리 이상, 16자리 이하의 영문자, 숫자, 특수문자가 포함되어야 합니다.",
      ],
      emailRule: [
        (v) => !!v.trim() || "이메일은 필수 입력사항입니다.",
        (v) =>
          /^[a-zA-Z0-9+-\\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(v) ||
          "이메일이 형식에 맞지 않습니다.",
      ],
    };
  },
  created() {},
  methods: {
    join() {
      if (
        this.userId.trim() == "" ||
        (this.userId && this.userId.length < 4) ||
        (this.userId && this.userId.length > 20) ||
        !/^[a-zA-Z][0-9a-zA-Z]{3,19}$/.test(this.userId)
      ) {
        this.text = this.userIdText;
        this.snackbar = true;
      } else if (
        this.userName.trim() == "" ||
        (this.userName && this.userName.length >= 30) ||
        /[~!@#$%^&*()_+|<>?:{}]/.test(this.userName)
      ) {
        this.text = this.userNameText;
        this.snackbar = true;
      } else if (
        this.password.trim() == "" ||
        (this.password && this.password.length > 16) ||
        (this.password && this.password.length < 8) ||
        !/^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/.test(
          this.password
        )
      ) {
        this.text = this.passwordText;
        this.snackbar = true;
      } else if (
        this.email.trim() == "" ||
        !/^[a-zA-Z0-9+-\\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(this.email)
      ) {
        this.text = this.emailText;
        this.snackbar = true;
      } else {
        axios
          .post(`/auth/join`, {
            userId: this.userId,
            userName: this.userName,
            password: this.password,
            emailId: this.email.substring(0, this.email.indexOf("@")),
            emailDomain: this.email.substring(this.email.indexOf("@") + 1),
          })
          .then((response) => {
            console.log(response.data);
            this.$router.push("/");
          })
          .catch(() => {
            this.text = "회원가입 중 오류가 발생하였습니다.";
            this.snackbar = true;
          });
      }
    },
  },
};
</script>

<style scoped></style>
