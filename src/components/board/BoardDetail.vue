<template>
  <div>
      <button @click="moveModifyArticle">수정</button>
      <button @click="deleteArticle">삭제</button>
      <div>{{article.subject}}</div>
      <div>{{article.userName}}</div>
      <div>{{article.registerTime}}</div>
      <div>{{article.content}}</div>
      <div>{{article.readCount}}</div>
      <button @click="moveList">목록</button>
  </div>
</template>

<script>
import axios from "@/util/axios";

export default {
  name: "BoardDetail",
  data() {
    return {
      article: {},
    };
  },
  computed: {
    message() {
      if (this.article.content)
        return this.article.content.split("\n").join("<br>");
      return "";
    },
  },
  created() {
    axios.post(`/board/view/${this.$route.params.articleNo}`).then(({ data }) => {
      this.article = data.data;
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
      if (confirm("정말로 삭제?")) {
        this.$router.replace({
          name: "boardDelete",
          params: { articleNo: this.article.articleNo },
        });
      }
    },
    moveList() {
      this.$router.push({ name: "boardList" });
    },
  },
};
</script>

<style></style>
