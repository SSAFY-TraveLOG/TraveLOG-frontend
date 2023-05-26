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
                    v-model="userId"
                  ></v-text-field>
                  <div v-show="userIdErr" class="input-error">
                    아이디는 4자리 이상, 20자리 이하로 영대소문자, 숫자를 사용할
                    수 있으며 숫자로 시작할 수 없습니다.
                  </div>
                  <v-text-field
                    label="이름"
                    placeholder="이름을 입력하세요."
                    v-model="userName"
                  >
                  </v-text-field>
                  <div v-show="userNameErr" class="input-error">
                    이름은 2자리 이상, 15자리 이하로 영대소문자, 한글, 숫자를
                    사용할 수 있습니다.
                  </div>
                  <v-text-field
                    type="password"
                    label="비밀번호"
                    placeholder="비밀번호를 입력하세요."
                    v-model="password"
                  >
                  </v-text-field>
                  <div v-show="passwordErr" class="input-error">
                    비밀번호는 8자리 이상, 16자리 이하의 영문자, 숫자,
                    특수문자가 포함되어야 합니다.
                  </div>
                  <v-text-field
                    type="email"
                    label="이메일"
                    placeholder="이메일을 입력하세요."
                    v-model="email"
                  >
                  </v-text-field>
                  <div v-show="emailErr" class="input-error">
                    이메일이 형식에 맞지 않습니다.
                  </div>
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
    };
  },
  created() {},
  methods: {
    join() {
      if (this.userIdErr) {
        this.text = this.userIdText;
        this.snackbar = true;
      } else if (this.userNameErr) {
        this.text = this.userNameText;
        this.snackbar = true;
      } else if (this.passwordErr) {
        this.text = this.passwordText;
        this.snackbar = true;
      } else if (this.emailErr) {
        this.text = this.emailText;
        this.snackbar = true;
      } else {
        axios
          .post(`/auth/join`, {
            userId: this.userId,
            userName: this.userName,
            password: this.password,
            emailId: this.email.substring(0, this.email.indexOf("@")),
            emailDomain: this.email.substring(this.email.indexOf("@")),
          })
          .then((response) => {
            console.log(response.data);
            this.$router.push("/");
          });
      }
    },
    checkUserId() {
      const reg = /^[a-zA-Z][0-9a-zA-Z]{3,19}$/;
      if (!reg.test(this.userId) || !this.userId) {
        this.userIdErr = true;
        console.log("checkUserId");
      } else {
        this.userIdErr = false;
      }
    },
    checkUserName() {
      const reg = /^[ㄱ-ㅎ가-힣a-zA-Z0-9]{2,15}$/;
      if (!reg.test(this.userName) || !this.userName) {
        this.userNameErr = true;
      } else {
        this.userNameErr = false;
      }
    },
    checkPassword() {
      const reg =
        /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
      if (!reg.test(this.password) || !this.password) {
        this.passwordErr = true;
      } else {
        this.passwordErr = false;
      }
    },
    checkEmail() {
      const reg = /^[a-zA-Z0-9+-\\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
      if (!reg.test(this.email) || !this.email) {
        this.emailErr = true;
      } else {
        this.emailErr = false;
      }
    },
  },
  watch: {
    password: function () {
      this.checkPassword();
    },
    userId: function () {
      this.checkUserId();
    },
    userName: function () {
      this.checkUserName();
    },
    email: function () {
      this.checkEmail();
    },
  },
};
</script>

<style scoped>
.input-error {
  font-size: 11px;
  color: red;
}
</style>
