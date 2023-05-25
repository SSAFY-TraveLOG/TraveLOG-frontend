<template>
  <v-container class="">
    <v-card
      class="pa-3"
      color="#eeeeee"
      elevation="2"
      v-if="this.mode == 'read'"
    >
      <v-row class="align-center">
        <v-col cols="9">
          <!-- 한 열에 2개의 글씨를 배치하기 위해 cols="6"을 설정합니다. -->
          <h6 class="mb-2">
            {{ comment.userName }} | {{ comment.registerTime }}
          </h6>
          <span>
            {{ comment.content }}
          </span>
          <!-- 한 열에 1개의 글씨를 배치하기 위해 cols="12"를 설정합니다. -->
        </v-col>
        <v-col class="d-flex justify-end" cols="3">
          <v-btn
            class="mr-3"
            v-if="comment.userNo == this.userNo"
            @click="changeEditMode"
            >수정</v-btn
          >
          <v-btn v-if="comment.userNo == this.userNo" @click="deleteComment"
            >삭제</v-btn
          >
        </v-col>
      </v-row>
    </v-card>
    <v-card
      class="pa-3"
      color="#eeeeee"
      elevation="2"
      v-if="this.mode == 'edit'"
    >
      <v-row class="align-center">
        <v-col cols="9">
          <!-- 한 열에 2개의 글씨를 배치하기 위해 cols="6"을 설정합니다. -->
          <h6 class="mb-2">
            {{ comment.userName }}
          </h6>
          <v-textarea
            v-model="newComment"
            solo
            dense
            no-resize
            hide-details="true"
            label="댓글을 입력하세요."
            rows="2"
            row-height="20"
          ></v-textarea>
          <!-- 한 열에 1개의 글씨를 배치하기 위해 cols="12"를 설정합니다. -->
        </v-col>
        <v-col class="d-flex justify-end" cols="3">
          <v-btn
            class="mr-3"
            v-if="comment.userNo == this.userNo"
            @click="updateComment"
            >등록</v-btn
          >
          <v-btn v-if="comment.userNo == this.userNo" @click="changeReadMode"
            >취소</v-btn
          >
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import axios from "@/util/axios";
import { mapGetters } from "vuex";
export default {
  name: "QnaBoardCommentItem",
  data() {
    return {
      mode: "read",
      newComment: "",
      sendComment: [],
    };
  },
  props: {
    comment: Object,
  },
  created() {},
  computed: {
    ...mapGetters({ userNo: "getUserNo" }),
  },
  methods: {
    changeEditMode() {
      this.mode = "edit";
    },
    changeReadMode() {
      this.mode = "read";
    },
    updateComment() {
      axios
        .patch(`/qna/cmt-update`, {
          replyId: this.comment.replyId,
          content: this.newComment,
        })
        .then(({ data }) => {
          let msg = "등록 처리시 문제가 발생했습니다.";
          if (data.status === "OK") {
            msg = "등록이 완료되었습니다.";
          }
          alert(msg);

          if (data.status != "OK") {
            return;
          }

          axios
            .get(`/qna/cmt-list/${this.$route.params.articleNo}`)
            .then(({ data }) => {
              this.sendComment = data.data;
              this.$emit("change-comment", this.sendComment);
              this.mode = "read";
            });
        });
    },
    deleteComment() {
      axios
        .delete(`/qna/cmt-delete/${this.comment.replyId}`)
        .then(({ data }) => {
          let msg = "삭제 처리시 문제가 발생했습니다.";
          if (data.status === "OK") {
            msg = "삭제가 완료되었습니다.";
          }
          alert(msg);

          axios
            .get(`/qna/cmt-list/${this.$route.params.articleNo}`)
            .then(({ data }) => {
              this.sendComment = data.data;
              this.$emit("change-comment", this.sendComment);
              this.mode = "read";
            });
        });
    },
  },
};
</script>

<style>
</style>