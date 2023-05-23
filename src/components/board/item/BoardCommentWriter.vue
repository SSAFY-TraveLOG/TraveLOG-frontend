<template>
  <v-container class="d-flex">
    <v-icon class="mr-4" large>mdi-comment</v-icon>
    <v-textarea
      v-model="comment"
      solo
      dense
      no-resize
      hide-details="true"
      label="댓글을 입력하세요."
      rows="2"
      row-height="20"
    ></v-textarea>
    <v-btn class="mr-3 ml-4" height="auto">등록</v-btn>
  </v-container>
</template>

<script>
import axios from "@/util/axios";

export default {
  name: "BoardCommentWriter",
  data() {
    return {
      comment: "",
    };
  },
  props: {
    type: { type: String },
  },
  created() {
    axios
      .post(`/board/view/${this.$route.params.articleNo}`)
      .then(({ data }) => {
        this.article = data.data;
      });
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();

      let err = true;
      let msg = "";

      !this.comment &&
        ((msg = "내용을 입력해주세요"),
        (err = false),
        this.$refs.subject.focus());

      if (!err) alert(msg);
      else this.writeComment();
    },
    writeComment() {
      axios
        .post(`/board/write`, {
          userNo: this.article.userNo,
          subject: this.article.subject,
          content: this.article.content,
        })
        .then(({ data }) => {
          let msg = "등록 처리시 문제가 발생했습니다.";
          if (data.status === "OK") {
            msg = "등록이 완료되었습니다.";
          }
          alert(msg);
          this.moveList();
        });
    },
  },
};
</script>

<style>
</style>