<template>
  <div>
    <form @submit="onSubmit" @reset="onReset">
      <input type="text" v-model="article.subject" placeholder="제목:">

      <label for="content">내용:</label><br>
      <textarea name="content" id="content" cols="30" rows="10" v-model="article.content"></textarea>

      <button type="submit" v-if="this.type === 'write'">등록</button>
      <button type="submit" v-else>수정</button>
      <button type="reset">초기화</button>
    </form>
  </div>
</template>

<script>
import axios from "@/util/axios";

export default {
  name: "BoardInputItem",
  data() {
    return {
      article: {
        articleNo: 0,
        subject: "",
        content: "",
      },
      isUserName: false,
    };
  },
  props: {
    type: { type: String },
  },
  created() {
    // if (this.type === "modify") {
    //   axios.get(`/board/${this.$route.params.articleno}`).then(({ data }) => {
    //     // this.article.articleno = data.article.articleno;
    //     // this.article.userid = data.article.userid;
    //     // this.article.subject = data.article.subject;
    //     // this.article.content = data.article.content;
    //     this.article = data;
    //   });
    //   this.isUserid = true;
    // }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();

      let err = true;
      let msg = "";

      !this.article.subject &&
        ((msg = "제목 입력해주세요"),
        (err = false),
        this.$refs.subject.focus());
      err &&
        !this.article.content &&
        ((msg = "내용 입력해주세요"),
        (err = false),
        this.$refs.content.focus());

      if (!err) alert(msg);
      else
        this.type === "write" ? this.writeArticle() : this.modifyArticle();
    },
    onReset(event) {
      event.preventDefault();
      this.article.articleNo = 0;
      this.article.subject = "";
      this.article.content = "";
      this.$router.push({ name: "boardList" });
    },
    writeArticle() {
      axios
        .post(`/board/write`, {
          subject: this.article.subject,
          content: this.article.content,
        })
        .then(({ data }) => {
          let msg = "등록 처리시 문제가 발생했습니다.";
          if (data === "OK") {
            msg = "등록이 완료되었습니다.";
          }
          alert(msg);
          this.moveList();
        });
    },
    modifyArticle() {
      axios
        .patch(`/board/modify/${this.article.articleNo}`, {
          articleNo: this.article.articleNo,
          subject: this.article.subject,
          content: this.article.content,
        })
        .then(({ data }) => {
          let msg = "수정 처리시 문제가 발생했습니다.";
          if (data === "OK") {
            msg = "수정이 완료되었습니다.";
          }
          alert(msg);
          // 현재 route를 /list로 변경.
          this.$router.push({ name: "boardList" });
        });
    },
    moveList() {
      this.$router.push({ name: "boardList" });
    },
  },
};
</script>

<style>

</style>