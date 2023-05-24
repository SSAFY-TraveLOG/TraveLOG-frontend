<template>
  <v-sheet
    class="ma-5 pt-4 pa-7 d-flex flex-column justify-start"
    color="white"
    elevation="5"
    min-height="800px"
    rounded
  >
    <v-container>
      <v-divider class="mb-3"></v-divider>
      <h3>{{ article.subject }}</h3>
      <h6>작성자 : {{ article.userName }} | {{ article.registerTime }}</h6>
      <v-divider class="mt-3 mb-3"></v-divider>
      <span>
        {{ article.content }}
      </span>
      <v-divider class="mt-3 mb-3"></v-divider>
      <v-container class="d-flex flex-row justify-end">
        <v-btn class="mr-3" @click="listArticle"> 목록 </v-btn>
        <v-btn
          class="mr-3"
          @click="moveModifyArticle"
          v-if="article.userNo == this.userNo || this.userNo == 1"
        >
          수정
        </v-btn>
        <v-btn
          @click="deleteArticle"
          v-if="article.userNo == this.userNo || this.userNo == 1"
        >
          삭제
        </v-btn>
      </v-container>
      <v-divider></v-divider>
      <board-comment-writer
        :articleNo="article.articleNo" @change="change"
      ></board-comment-writer>
      <div v-if="comments.length">
        <div class="outer" v-for="comment in comments" :key="comment.replyId">
          <board-comment-item :comment="comment" />
        </div>
      </div>
    </v-container>
  </v-sheet>
</template>

<script>
import axios from "@/util/axios";
import { mapGetters } from "vuex";
import BoardCommentWriter from "./item/BoardCommentWriter.vue";
import BoardCommentItem from "./item/BoardCommentItem.vue";

export default {
  name: "BoardDetail",
  data() {
    return {
      article: {},
      comments: [
        {
          replyId: Number,
          userNo: Number,
          userName: String,
          articleNo: Number,
          content: String,
          registerTime: String,
        },
      ],
    };
  },
  components: {
    BoardCommentWriter,
    BoardCommentItem,
  },
  computed: {
    message() {
      if (this.article.content)
        return this.article.content.split("\n").join("<br>");
      return "";
    },
    ...mapGetters({ userNo: "getUserNo" }),
  },
  created() {
    axios
      .post(`/board/view/${this.$route.params.articleNo}`)
      .then(({ data }) => {
        this.article = data.data;
      });

    axios
      .get(`board/cmt-list/${this.$route.params.articleNo}`)
      .then(({ data }) => {
        this.comments = data.data;
      });
  },
  methods: {
    listArticle() {
      this.$router.push({ name: "boardList" });
    },
    moveModifyArticle() {
      this.$router.replace({
        name: "boardModify",
        params: { articleNo: this.article.articleNo },
      });
    },
    deleteArticle() {
      if (confirm("정말로 삭제하시겠습니까?")) {
        this.$router.replace({
          name: "boardDelete",
          params: { articleNo: this.article.articleNo },
        });
      }
    },
    change(value) {
      this.comments = value;
      console.log(this.comments);
    }
  },
};
</script>

<style></style>
