<template>
  <v-sheet class="d-flex align-center justify-center">
    <v-sheet
      class="ma-5 pa-4 d-flex flex-column"
      color="white"
      elevation="5"
      min-height="800px"
      width="80%"
      rounded
    >
      <div class="d-flex justify-center">
        <h1 class="d-flex mb-5">마이페이지</h1>
      </div>
      <v-row>
        <v-col cols="3">
          <v-sheet
            class="pa-4 d-flex flex-column align-self-stretch"
            color="white"
            elevation="5"
            height="700px"
            rounded
          >
            <v-btn-toggle
              v-model="mode"
              class="d-flex flex-column align-stretch"
              group
            >
              <div
                class="d-flex flex-column align-stretch vertical-btn-container"
              >
                <v-btn class="ma-1" height="40px" value="profile" text
                  >프로필</v-btn
                >
                <v-btn class="ma-1" height="40px" value="changePwd" text
                  >비밀번호 변경</v-btn
                >
              </div>
            </v-btn-toggle>
          </v-sheet>
        </v-col>
        <v-col class="d-flex" cols="9" v-if="this.mode == 'profile'">
          <my-profile></my-profile>
        </v-col>
        <v-col class="d-flex" cols="9" v-else-if="this.mode == 'changePwd'">
          <change-pwd></change-pwd>
        </v-col>
      </v-row>
    </v-sheet>
  </v-sheet>
</template>

<script>
import axios from "@/util/axios";
import { mapGetters } from "vuex";
import MyProfile from "@/components/mypage/MyProfile";
import ChangePwd from "@/components/mypage/ChangePwd";

export default {
  name: "MyPage",
  components: { MyProfile, ChangePwd },
  data() {
    return {
      mode: "profile",
      userName: "",
      newUserName: "",
      userImage: "",
      userEmail: "",
      password: "",
      newPassword: "",
      newPasswordCheck: "",
      passwordErr: false,
      text: "",
      nameWarnMsg: "",
      snackbar: false,
      timeout: 2000,
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
  computed: {
    ...mapGetters({
      userNo: "getUserNo",
      userId: "getUserId",
    }),
  },
};
</script>

<style>
.vertical-btn-container {
  display: flex;
  flex-direction: column;
}
</style>