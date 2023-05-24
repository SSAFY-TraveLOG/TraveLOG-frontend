<template>
  <v-container class="">
    <v-card class="pa-2" color="#eeeeee" elevation="2">
      <h6>{{ comment.userName }} {{ comment.registerTime }}</h6>
      <span>
        {{ comment.content }}
      </span>
    </v-card>
  </v-container>
</template>

<script>
import axios from "@/util/axios";

export default {
  name: "BoardCommentItem",
  data() {
    return {
    };
  },
  props: {
    comment: {},
  },
  created() {
    
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
        });
    },
  },
};
</script>

<style>
</style>