<template>
  <v-sheet
    class="ma-5 pt-4 pa-7 d-flex flex-column justify-start"
    color="white"
    elevation="5"
    min-height="800px"
    rounded
  >
    <h1 class="align-self-center mb-3">Q&A 작성</h1>
    <v-container>
      <form @submit="onSubmit" @reset="onReset">
        <v-text-field
          v-model="article.subject"
          class="mb-5"
          full-width
          hide-details
          color="blacks"
          label="제목"
          outlined
        ></v-text-field>
        <v-textarea
          v-model="article.content"
          label="내용"
          color="blacks"
          no-resize
          hide-details
          full-width
          height="500px"
          outlined
        ></v-textarea>
        <v-container class="d-flex flex-row justify-space-between align-center">
          <v-btn type="reset" class="mr-6"> 목록 </v-btn>
          <v-container class="d-flex flex-row justify-end align-center">
            <v-checkbox
              v-model="secret"
              :value="article.secret"
              class="mr-6"
              hide-details="true"
              label="비밀글"
              dense
            ></v-checkbox>
            <v-btn type="submit" v-if="this.type == 'write'"> 등록 </v-btn>
            <v-btn type="submit" v-else> 수정 </v-btn>
          </v-container>
        </v-container>
      </form>
    </v-container>
  </v-sheet>
</template>

<script>
import axios from "@/util/axios";
import { mapGetters } from "vuex";

export default {
  name: "QnaBoardInputItem",
  data() {
    return {
      subject: [],
      content: [],
      article: {
        articleNo: 0,
        subject: "",
        content: "",
        secret: false
      },
      secret: false,
    };
  },
  props: {
    type: { type: String },
  },
  created() {
    if (this.type === "modify") {
      console.log(this.$route.params.articleNo);
      axios
        .post(`/qna/view/${this.$route.params.articleNo}`, {
          userNo: this.userNo,
        })
        .then(({ data }) => {
          console.log(data);
          this.article.articleNo = data.data.articleNo;
          this.article.subject = data.data.subject;
          this.article.content = data.data.content;
          this.article.secret = data.data.secret == 1 ? true : false;
        });
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();

      let err = true;
      let msg = "";

      !this.article.subject && ((msg = "제목 입력해주세요"), (err = false));
      err &&
        !this.article.content &&
        ((msg = "내용 입력해주세요"), (err = false));

      if (!err) alert(msg);
      else this.type === "write" ? this.writeArticle() : this.modifyArticle();
    },
    onReset(event) {
      event.preventDefault();
      this.article.articleNo = 0;
      this.article.subject = "";
      this.article.content = "";
      this.$router.push({ name: "qnaBoardList" });
    },
    writeArticle() {
      axios
        .post(`/qna/write`, {
          userNo: this.userNo,
          subject: this.article.subject,
          content: this.article.content,
          secret: this.secret === true ? 1 : null
        })
        .then(({ data }) => {
          console.log(data);
          let msg = "등록 처리시 문제가 발생했습니다.";
          if (data.status == "OK") {
            msg = "등록이 완료되었습니다.";
          }
          alert(msg);
          this.moveList();
        });
    },
    modifyArticle() {
      axios
        .patch(`/qna/modify/${this.article.articleNo}`, {
          articleNo: this.article.articleNo,
          subject: this.article.subject,
          content: this.article.content,
          userNo: this.userNo,
          secret: this.secret === true ? 1 : null
        })
        .then(({ data }) => {
          console.log(data);
          let msg = "수정 처리시 문제가 발생했습니다.";
          if (data.status == "OK") {
            msg = "수정이 완료되었습니다.";
          }
          alert(msg);
          // 현재 route를 /list로 변경.
          this.$router.push({ name: "qnaBoardList" });
        });
    },
    moveList() {
      this.$router.push({ name: "qnaBoardList" });
    },
  },
  computed: {
    ...mapGetters({ userNo: "getUserNo" }),
  },
};
</script>

<style>
</style>