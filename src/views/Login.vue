<template>
  <v-app id="inspire">
    <v-main class="blue-white lighten-4">
      <v-container style="max-width: 450px" fill-height>
        <v-layout align-center row wrap>
          <v-flex xs12>
            <v-card>
              <div class="pa-10">
                <h1 style="text-align: center" class="mb-10">로그인</h1>
                <form>
                  <v-text-field
                    label="아이디"
                    placeholder="아이디를 입력하세요."
                    v-model="userId"
                  ></v-text-field>
                  <v-text-field
                    type="password"
                    label="비밀번호"
                    placeholder="비밀번호를 입력하세요."
                    v-model="password"
                  >
                  </v-text-field>
                  <v-btn
                    color="blue lighten-1 text-capitalize"
                    depressed
                    large
                    block
                    dark
                    class="mb-3"
                    @click="login"
                  >
                    로그인
                  </v-btn>
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
import { mapActions } from "vuex";
export default {
  name: "LoginView",
  components: {},
  data() {
    return {
      userId: "",
      password: "",
    };
  },
  created() {},
  methods: {
    ...mapActions(["loginApi", "processLogin"]),
    login() {
      axios
        .post(`/auth/check`, {
          userId: this.userId,
          password: this.password,
        })
        .then((response) => {
          this.processLogin(response.data.data).then(() => {
            this.$router.push("/");
          });
        });
    },
    join() {
      this.$router.push("/user/join");
    },
  },
};
</script>

<style scoped></style>
