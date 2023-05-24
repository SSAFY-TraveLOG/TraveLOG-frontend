<template>
  <form @submit="onSubmit">
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
      <v-btn type="submit" class="mr-3 ml-4" height="auto">등록</v-btn>
    </v-container>
  </form>
</template>

<script>
import axios from "@/util/axios";
import { mapGetters } from "vuex";

export default {
  name: "QnaBoardCommentWriter",
  data() {
    return {
      comment: "",
      newComments: [],
    };
  },
  props: {
    articleNo: Number,
    comments: Array,
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();

      let err = true;
      let msg = "";

      !this.comment && ((msg = "내용을 입력해주세요"), (err = false));

      if (!err) alert(msg);
      else this.writeComment();
    },
    writeComment() {
      axios
        .post(`/qna/cmt-write`, {
          userNo: this.userNo,
          articleNo: this.articleNo,
          content: this.comment,
        })
        .then(({ data }) => {
          let msg = "등록 처리시 문제가 발생했습니다.";
          if (data.status === "OK") {
            msg = "등록이 완료되었습니다.";
          }
          alert(msg);

          axios
            .get(`/qna/cmt-list/${this.$route.params.articleNo}`)
            .then(({ data }) => {
              this.newComments = data.data;
              this.$emit("change", this.newComments);
            });
        });
      this.comment = "";
    },
  },
  computed: {
    ...mapGetters({ userNo: "getUserNo" }),
  },
};
</script>

<style>
</style>