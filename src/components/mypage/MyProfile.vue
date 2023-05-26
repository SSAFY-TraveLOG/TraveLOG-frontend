<template>
  <v-sheet class="pa-4 flex align-self-stretch" color="white" elevation="5" height="700px" rounded>
    <v-row class="d-flex">
      <v-col class="d-flex align-center justify-center" cols="2">
        <v-img contain height="80px" id="userImage" :src="userImage" />
      </v-col>
      <v-col class="d-flex align-center" cols="6">
        <h1>{{ this.userName }}</h1>
      </v-col>
      <v-col class="d-flex align-center justify-end" cols="4" v-if="this.mode == 'edit'">
        <v-btn @click="changeReadMode">취소</v-btn>
        <v-btn class="ml-3" @click="changeUserName">저장</v-btn>
      </v-col>
      <v-col class="d-flex align-center justify-end" cols="4" v-else>
        <v-btn @click="changeEditMode">수정</v-btn>
      </v-col>
    </v-row>
    <v-row class="d-flex align-center ml-1 mr-1">
      <v-col cols="3">
        <h5>이메일</h5>
      </v-col>
      <v-col cols="9">
        <v-text-field :value="userEmail" outlined dense readonly hide-details></v-text-field>
      </v-col>
    </v-row>
    <v-divider class="mt-2 mb-2"></v-divider>
    <v-row class="d-flex ml-1 mr-1">
      <v-col cols="3">
        <h5 class="mt-3">이름</h5>
      </v-col>
      <v-col cols="9">
        <v-text-field
          :value="userName"
          outlined
          dense
          readonly
          v-if="this.mode == 'read'"
        ></v-text-field>
        <v-text-field
          :rules="userNameRule"
          v-model="newUserName"
          outlined
          dense
          v-else
        ></v-text-field>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script>
import axios from "@/util/axios";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "MyProfile",
  components: {},
  data() {
    return {
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
      mode: "read",
      userNameRule: [
        (v) => !!v.trim() || "이름은 필수 입력사항입니다.",
        (v) => !(v && v.length >= 30) || "이름은 30자 이상 입력할 수 없습니다.",
        (v) => !/[~!@#$%^&*()_+|<>?:{}]/.test(v) || "이름에는 특수문자를 사용할 수 없습니다.",
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
    ...mapActions(["setUserName"]),
    changeEditMode() {
      this.mode = "edit";
    },
    changeReadMode() {
      this.mode = "read";
    },
    changeUserName() {
      //유저 이름 비워놓지 않도록 검사하고
      //이전 이름이랑 같으면 수정하지 않기
      if (
        this.newUserName.trim() == "" ||
        (this.newUserName && this.newUserName.length >= 30) ||
        /[~!@#$%^&*()_+|<>?:{}]/.test(this.newUserName)
      ) {
        alert("사용할 수 없는 유저명입니다.");
        this.newUserName = "";
        return;
      }
      axios
        .patch(`/user/modify`, {
          userNo: this.userNo,
          userName: this.newUserName,
        })
        .then((response) => {
          if (response.data.data === 1) {
            this.userName = this.newUserName;
            this.setUserName(this.newUserName);
            this.newUserName = "";
            this.mode = "read";
            alert("유저명을 변경하였습니다.");
          }
        })
        .catch((err) => {
          console.log(err);
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
